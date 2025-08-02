#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const sourceDir = path.join(__dirname, "template");
const targetDir = process.cwd();

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;

  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(child => {
      const childSrc = path.join(src, child);
      const childDest = path.join(dest, child);
      copyRecursiveSync(childSrc, childDest);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("🚀 Setting up your React starter project...");

// Copy template files to the current directory
copyRecursiveSync(sourceDir, targetDir);

console.log("📦 Installing dependencies (this may take a few seconds)...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Setup complete! Run 'npm run dev' to start development.");
} catch (err) {
  console.error("❌ Failed to install dependencies. Please run 'npm install' manually.");
}