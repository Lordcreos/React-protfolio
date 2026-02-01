const { execSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const mode = process.env.SENSITIVE_CHECK_MODE || 'staged';

const runGit = (cmd) => execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();

const getFiles = () => {
  try {
    if (mode === 'last-commit') {
      return runGit('git diff --name-only --diff-filter=ACMR HEAD~1..HEAD')
        .split('\n')
        .filter(Boolean);
    }
    return runGit('git diff --cached --name-only --diff-filter=ACMR')
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
};

const forbiddenPaths = [
  /^\.env(\..+)?$/i,
  /^.*\/\.env(\..+)?$/i,
  /^\.clerk\//i,
  /^.*\/\.clerk\//i,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i,
];

const forbiddenContent = [
  /CLERK_SECRET_KEY\s*=/i,
  /NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\s*=/i,
  /DATABASE_URL\s*=/i,
  /mongodb\+srv:\/\//i,
  /sk_(test|live)_[a-z0-9]+/i,
  /pk_(test|live)_[a-z0-9]+/i,
  /BEGIN\s+PRIVATE\s+KEY/i,
  /-----BEGIN\s+PRIVATE\s+KEY-----/i,
];

const files = getFiles();
if (files.length === 0) {
  process.exit(0);
}

const errors = [];

for (const file of files) {
  const normalized = file.replace(/\\/g, '/');

  if (forbiddenPaths.some((rx) => rx.test(normalized))) {
    errors.push(`Archivo sensible detectado: ${file}`);
    continue;
  }

  let content = '';
  try {
    const data = readFileSync(resolve(process.cwd(), file));
    if (data.includes(0)) {
      continue; // binary
    }
    content = data.toString('utf8');
  } catch {
    continue;
  }

  const hit = forbiddenContent.find((rx) => rx.test(content));
  if (hit) {
    errors.push(`Secreto encontrado en ${file} (patrón: ${hit})`);
  }
}

if (errors.length) {
  console.error('\n✖ Bloqueado: se detectaron secretos o archivos sensibles.');
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  console.error('\nSolución: elimina el archivo del commit o mueve el secreto a variables de entorno.');
  process.exit(1);
}
