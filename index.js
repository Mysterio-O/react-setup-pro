#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");
const ora = require('ora').default;
const validateProjectName = require("validate-npm-package-name");

// Checking if ora and chalk are installed, if not install them
try {
  require.resolve("ora");
  require.resolve("chalk");
} catch (e) {
  console.log("Installing required dependencies...");
  execSync("npm install ora chalk", { stdio: "inherit" });
}

// Getting project name from command line arguments
const projectName = process.argv[2];

// exit if no project name is provided
if (!projectName) {
  console.error(chalk.red("❌ Please provide a project name."));
  console.log(chalk.blue(`Usage: npx react-setup-pro ${chalk.yellow("<project-name>")}`));
  process.exit(1);
};

// Validate project name
const nameValidation = validateProjectName(projectName);
if (!nameValidation.validForNewPackages) {
  console.error(chalk.red("❌ Invalid project name:"));
  nameValidation.errors?.forEach(error => {
    console.error(chalk.red(`- ${error}`));
  });
  nameValidation.warnings?.forEach(warning => {
    console.error(chalk.yellow(`- ${warning}`));
  });
  process.exit(1);
}




const sourceDir = path.join(__dirname, "template");
const targetDir = path.join(process.cwd(), projectName);

// Checking if directory already exists
if (fs.existsSync(targetDir)) {
  console.error(chalk.red(`❌ Directory "${projectName}" already exists. Please choose a different name or remove the existing directory.`));
  process.exit(1);
}

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


async function setUpProject() {
  const spinner = ora();

  try {

    // Creating the project in the target directory
    spinner.start(chalk.blue(`🚀 Creating new project: ${chalk.yellow(projectName)}`));
    await new Promise(resolve => setTimeout(resolve, 500)); // brief pause
    fs.mkdirSync(targetDir);
    spinner.succeed(chalk.green("✅ Project folder created."));




    // Copying files from the template directory to the target directory
    spinner.start(chalk.blue("📂 Copying template files..."));
    await new Promise(resolve => setTimeout(resolve, 500)); // brief pause
    copyRecursiveSync(sourceDir, targetDir);
    spinner.succeed(chalk.green("✅ Template files copied."));




    // Updating the package.json file
    spinner.start(chalk.blue(`📄 Updating package.json...`));
    await new Promise(resolve => setTimeout(resolve, 500)); // brief pause
    const packageJsonPath = path.join(targetDir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageJson.name = projectName;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");
    }
    spinner.succeed(chalk.green("✅ package.json updated."));

    // Switching to the project directory
    process.chdir(targetDir);

    // Installing dependencies with progress
    console.log(chalk.blue("\n🧩 Installing dependencies..."));
    console.log(chalk.gray("This may take a few minutes depending on your internet connection."));

    const installSpinner = ora({
      text: chalk.blue("Installing packages..."),
      spinner: "dots"
    }).start();

    try {
      execSync("npm install", { stdio: "inherit" });
      installSpinner.succeed(chalk.green("✅ Dependencies installed successfully!"));
    } catch (error) {
      installSpinner.fail(chalk.red("❌ Failed to install dependencies"));
      console.error(chalk.red(error.stdout?.toString() || error.message));
      throw error;
    }

    // Setup complete
    console.log(chalk.green.bold("\n🎉 Project setup successfully completed!\n"));
    console.log(chalk.blue("👉 Navigate to the project:"));
    console.log(chalk.cyan(`   cd ${projectName}`));
    console.log(chalk.blue("\n👉 Run the development server:"));
    console.log(chalk.cyan("   npm run dev"));
    console.log(chalk.blue("\n👉 To build for production:"));
    console.log(chalk.cyan("   npm run build"));
    console.log(chalk.gray("\nHappy coding! 🚀"));

  }
  catch (err) {
    spinner.fail(chalk.red("❌ Error occurred during setup"));
    console.error(chalk.red("\nError details:", err.message));

    // Clean up if something went wrong
    if (fs.existsSync(targetDir)) {
      console.log(chalk.yellow("\nCleaning up... Removing created files."));
      fs.rmSync(targetDir, { recursive: true, force: true });
    }

    process.exit(1);
  }

}

// Added a welcome message
console.log(chalk.blue.bold("\n⚡ React Project Setup Wizard ⚡"));
console.log(chalk.gray("This will create a new React project with Tailwind setup, Motion, React Router, Axios Instance, React icons, TansTack Query, Sweet Alert and Firebase.\n"));

// Start the setup
setUpProject();