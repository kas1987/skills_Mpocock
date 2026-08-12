#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_WARN_LOC = 200;
const DEFAULT_MAX_LOC = 300;
const DEFAULT_ACCEPTANCE_DIR = "docs/skill-hitl-acceptance";
const IGNORED_DIRS = new Set([".git", "node_modules", ".out-of-scope", "_archived", "dist", "coverage"]);

function parseArgs(argv) {
  const args = {
    root: process.cwd(),
    warnLoc: DEFAULT_WARN_LOC,
    maxLoc: DEFAULT_MAX_LOC,
    acceptanceDir: DEFAULT_ACCEPTANCE_DIR,
    json: false,
  };
  for (const item of argv) {
    if (item === "--json") args.json = true;
    else if (item.startsWith("--root=")) args.root = path.resolve(item.slice("--root=".length));
    else if (item.startsWith("--warn-loc=")) args.warnLoc = Number(item.slice("--warn-loc=".length));
    else if (item.startsWith("--max-loc=")) args.maxLoc = Number(item.slice("--max-loc=".length));
    else if (item.startsWith("--acceptance-dir=")) args.acceptanceDir = item.slice("--acceptance-dir=".length);
    else throw new Error(`Unknown argument: ${item}`);
  }
  if (!Number.isInteger(args.warnLoc) || args.warnLoc < 1) throw new Error("--warn-loc must be a positive integer");
  if (!Number.isInteger(args.maxLoc) || args.maxLoc <= args.warnLoc) throw new Error("--max-loc must be an integer greater than --warn-loc");
  return args;
}

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, results);
    else if (entry.isFile() && entry.name === "SKILL.md") results.push(fullPath);
  }
  return results;
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function countLoc(text) {
  return text.split(/\r?\n/).length;
}

function extractSkillName(text, filePath) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (match) {
    const nameMatch = match[1].match(/^name:\s*["']?([^"'\n]+)["']?\s*$/m);
    if (nameMatch) return nameMatch[1].trim();
  }
  return path.basename(path.dirname(filePath));
}

function acceptancePath(root, acceptanceDir, skillName) {
  return path.join(root, acceptanceDir, `${skillName}.md`);
}

function hasValidAcceptance(root, acceptanceDir, skillName) {
  const filePath = acceptancePath(root, acceptanceDir, skillName);
  if (!fs.existsSync(filePath)) {
    return { ok: false, path: filePath, reason: "missing acceptance file" };
  }
  const text = readText(filePath);
  const required = [
    [/^skill:\s*\S+/m, "skill"],
    [/^accepted_by:\s*\S+/m, "accepted_by"],
    [/^accepted_at:\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})\s*$/m, "accepted_at ISO-8601 timestamp with timezone"],
    [/^decision:\s*accept(ed|ance)?\s*$/mi, "decision: accepted"],
    [/^reason:\s*\S+/m, "reason"],
  ];
  const missing = required.filter(([regex]) => !regex.test(text)).map(([, name]) => name);
  if (missing.length) return { ok: false, path: filePath, reason: `missing fields: ${missing.join(", ")}` };
  return { ok: true, path: filePath, reason: "accepted" };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(args.root);
  const skillFiles = walk(root).sort((a, b) => a.localeCompare(b));
  const findings = [];

  for (const filePath of skillFiles) {
    const text = readText(filePath);
    const loc = countLoc(text);
    const skillName = extractSkillName(text, filePath);
    const relativePath = path.relative(root, filePath).replaceAll(path.sep, "/");
    const finding = { skillName, path: relativePath, loc, status: "pass", details: "within LOC contract" };

    if (loc >= args.maxLoc) {
      finding.status = "fail";
      finding.details = `refactor required: ${loc} LOC is at or above max ${args.maxLoc}`;
    } else if (loc > args.warnLoc) {
      const acceptance = hasValidAcceptance(root, args.acceptanceDir, skillName);
      finding.acceptancePath = path.relative(root, acceptance.path).replaceAll(path.sep, "/");
      if (acceptance.ok) {
        finding.status = "warn";
        finding.details = `over review threshold ${args.warnLoc}; HITL acceptance found`;
      } else {
        finding.status = "fail";
        finding.details = `over review threshold ${args.warnLoc}; HITL acceptance required (${acceptance.reason})`;
      }
    }
    findings.push(finding);
  }

  const summary = {
    checked: findings.length,
    warnLoc: args.warnLoc,
    maxLoc: args.maxLoc,
    status: findings.some((item) => item.status === "fail") ? "fail" : "pass",
    findings,
  };

  if (args.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`Skill contract gate: ${summary.status.toUpperCase()} (${summary.checked} SKILL.md files checked)`);
    for (const finding of findings) {
      const prefix = finding.status === "fail" ? "FAIL" : finding.status === "warn" ? "WARN" : "PASS";
      console.log(`${prefix} ${finding.path} (${finding.loc} LOC): ${finding.details}`);
    }
  }

  process.exitCode = summary.status === "fail" ? 1 : 0;
}

try {
  main();
} catch (error) {
  console.error(`Skill contract gate failed: ${error.message}`);
  process.exitCode = 1;
}
