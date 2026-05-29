# Development Guide

This guide will help you set up your development environment for PLATEX.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Google Chrome or Chromium browser

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/platex.git
   cd platex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browser binaries:**
   ```bash
   npx playwright install chromium
   ```

## Running Locally

### Generate Credentials

Before querying vehicles, you need to generate credentials:

```bash
node pegar_token.js
```

This will open a browser, access the Portuguese vehicle database, and save the credentials to `credenciais.txt`.

### Query a Vehicle

```bash
node platex.js -m 12-AB-34
```

Or after `npm link`, globally:

```bash
platex -m 12-AB-34
```

## Project Structure

```
.
├── platex.js              # Main CLI application
├── pegar_token.js         # Credential generator
├── credenciais.txt        # Generated credentials (gitignored)
├── package.json           # Dependencies and metadata
├── README.md              # User documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── CHANGELOG.md           # Version history
├── LICENSE                # MIT License
├── .editorconfig          # Editor settings
├── .gitignore             # Git ignore rules
├── .gitattributes         # Git attributes
├── .github/
│   ├── workflows/         # CI/CD workflows
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/    # Issue templates
└── docs/                  # Additional documentation
```

## Understanding the Code

### platex.js

The main entry point. Handles:
- CLI argument parsing (`commander`)
- Credential loading and refresh
- API requests to vehicle database
- Terminal UI rendering with tables and formatting

Key functions:
- `carregarCredenciais()` - Loads credentials with auto-refresh on failure
- `atualizarCredenciais()` - Runs `pegar_token.js` to generate new credentials
- `consultar()` - Makes API request and renders results
- `render()` - Formats vehicle data for terminal display

### pegar_token.js

Automated credential generator. Handles:
- Browser automation with Playwright
- Network request interception
- Credential extraction from API headers
- File writing for persistence

## Debugging

### Enable Verbose Output

Check the raw API response by examining the `render()` function output.

### Browser Debugging

To see the browser window during credential generation:
```javascript
// In pegar_token.js, change:
headless: true
// To:
headless: false
```

### Check Credentials

```bash
cat credenciais.txt
```

### Test API Directly

```javascript
const axios = require('axios');

const creds = {
    apiKey: 'YOUR_KEY',
    appCheck: 'YOUR_CHECK'
};

const res = await axios.get(
    'https://api.verificarmatricula.pt/vehicles/12-AB-34',
    {
        headers: {
            'x-api-key': creds.apiKey,
            'x-firebase-appcheck': creds.appCheck
        }
    }
);

console.log(res.data);
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

## Common Issues

### "invalid credentials detected"

Run credential regeneration:
```bash
node pegar_token.js
```

### Playwright browser not found

Reinstall Playwright:
```bash
npx playwright install
```

### Module not found

Ensure all dependencies are installed:
```bash
npm install
```

## Testing Your Changes

1. Generate fresh credentials
2. Test with different vehicle plates
3. Check output formatting
4. Verify error handling

## Releasing

1. Update `CHANGELOG.md`
2. Update version in `package.json`
3. Commit changes
4. Create a git tag: `git tag v2.0.0`
5. Push to GitHub

## Need Help?

- Check existing GitHub issues
- Read the main [README.md](README.md)
- Review code comments
