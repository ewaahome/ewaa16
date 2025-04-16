#!/usr/bin/env node

/**
 * Script to help set up ESLint v9.24 properly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Run a shell command and log the output
 */
function runCommand(command, errorMessage) {
  try {
    console.log(`${colors.cyan}Running: ${command}${colors.reset}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`${colors.red}${errorMessage || 'Command failed'}${colors.reset}`);
    console.error(`${colors.red}${error.message}${colors.reset}`);
    return null;
  }
}

console.log(`${colors.green}=== Setting up ESLint v9.24 ===${colors.reset}`);

// 1. Check current ESLint version
console.log(`${colors.blue}Checking ESLint version...${colors.reset}`);
const eslintVersion = runCommand('npx eslint --version', 'Could not determine ESLint version');

// 2. Install ESLint and plugins
console.log(`${colors.blue}Installing ESLint v9.24 and plugins...${colors.reset}`);
runCommand('npm install --save-dev eslint@^9.24.0 eslint-config-next@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint-plugin-react@latest', 
  'Failed to install ESLint and plugins');

// 3. Verify ESLint config files exist
console.log(`${colors.blue}Verifying ESLint configuration files...${colors.reset}`);

const eslintConfigPath = path.join(process.cwd(), '.eslintrc.json');
const tsEslintConfigPath = path.join(process.cwd(), '.eslintrc.typescript.json');

if (!fs.existsSync(eslintConfigPath)) {
  console.log(`${colors.yellow}ESLint config file not found, creating it...${colors.reset}`);
  const baseConfig = {
    "extends": ["next/core-web-vitals"],
    "rules": {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "no-unused-vars": "warn",
      "no-console": ["warn", { "allow": ["warn", "error", "info"] }]
    },
    "ignorePatterns": ["node_modules/", ".next/", "out/", "public/"],
    "parserOptions": {
      "ecmaVersion": 2022,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  };
  
  fs.writeFileSync(eslintConfigPath, JSON.stringify(baseConfig, null, 2));
  console.log(`${colors.green}Created ${eslintConfigPath}${colors.reset}`);
}

if (!fs.existsSync(tsEslintConfigPath)) {
  console.log(`${colors.yellow}TypeScript ESLint config file not found, creating it...${colors.reset}`);
  const tsConfig = {
    "extends": [
      "./.eslintrc.json",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "rules": {
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn"
    }
  };
  
  fs.writeFileSync(tsEslintConfigPath, JSON.stringify(tsConfig, null, 2));
  console.log(`${colors.green}Created ${tsEslintConfigPath}${colors.reset}`);
}

// 4. Test if ESLint is working
console.log(`${colors.blue}Testing ESLint...${colors.reset}`);
runCommand('npx eslint --version', 'ESLint test failed');

console.log(`${colors.green}ESLint v9.24 setup complete!${colors.reset}`);
console.log(`${colors.cyan}You can now run 'npm run lint' to lint your code.${colors.reset}`); 