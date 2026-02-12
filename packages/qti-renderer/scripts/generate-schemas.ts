#!/usr/bin/env node

/**
 * Generates `src/schemas.generated.ts` from the XSD files in `assets/`.
 *
 * Motivation:
 * - Consumers (e.g. Next.js) don't automatically serve/copy package assets to `public/`
 * - Embedding schemas as strings makes validation work out-of-the-box in any bundler/runtime
 *
 * The generated module is dynamically imported by `src/validation.ts`, so schemas are only
 * loaded when validation runs.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

type SchemaEntry = { key: string; filePath: string };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listXsdFiles(dir: string): Promise<string[]> {
  if (!(await fileExists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.xsd'))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));
}

function toTsStringLiteral(value: string): string {
  // JSON.stringify produces a valid JS string literal with escaped newlines, quotes, etc.
  // It’s also fast and avoids tricky escaping edge cases.
  return JSON.stringify(value);
}

async function main(): Promise<void> {
  const pkgRoot = path.resolve(__dirname, '..');
  const assetsDir = path.join(pkgRoot, 'assets');
  const schemasDir = path.join(assetsDir, 'schemas');
  const outFile = path.join(pkgRoot, 'src', 'schemas.generated.ts');

  const rootXsds = await listXsdFiles(assetsDir);
  const schemaXsds = await listXsdFiles(schemasDir);

  const schemaEntries: SchemaEntry[] = [
    ...rootXsds.map((name) => ({ key: name, filePath: path.join(assetsDir, name) })),
    ...schemaXsds.map((name) => ({
      key: `schemas/${name}`,
      filePath: path.join(schemasDir, name),
    })),
  ];

  if (schemaEntries.length === 0) {
    throw new Error(
      `No .xsd files found under ${assetsDir} (and ${schemasDir}). Cannot generate schemas module.`
    );
  }

  const pairs: Array<{ key: string; contents: string }> = [];
  for (const entry of schemaEntries) {
    const contents = await fs.readFile(entry.filePath, 'utf8');
    pairs.push({ key: entry.key, contents });
  }

  // Deterministic output for stable builds
  pairs.sort((a, b) => a.key.localeCompare(b.key));

  const nowIso = new Date().toISOString();
  const lines: string[] = [];

  lines.push('/* eslint-disable */');
  lines.push('/**');
  lines.push(' * AUTO-GENERATED FILE. DO NOT EDIT.');
  lines.push(' *');
  lines.push(` * Generated at: ${nowIso}`);
  // Important: avoid writing the substring "*/" inside a block comment.
  // Patterns like "**/*.xsd" contain "**/" which includes "*/" and would terminate the comment early.
  lines.push(' * Source: packages/qti-renderer/assets (and assets/schemas) .xsd files');
  lines.push(' */');
  lines.push('');
  lines.push('export const SCHEMAS: Record<string, string> = {');

  for (const { key, contents } of pairs) {
    lines.push(`  ${toTsStringLiteral(key)}: ${toTsStringLiteral(contents)},`);
  }

  lines.push('};');
  lines.push('');
  lines.push('export type SchemaKey = keyof typeof SCHEMAS;');
  lines.push('');

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, lines.join('\n'), 'utf8');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

