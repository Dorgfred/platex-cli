# Troubleshooting Guide

Having issues with PLATEX? Check this guide for solutions.

## Installation Issues

### "Module not found: playwright"

**Problem:** Playwright module is not installed

**Solution:**
```bash
npm install
npx playwright install
```

### "Module not found: commander" or other modules

**Problem:** Dependencies weren't installed properly

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Credential Issues

### "invalid credentials detected"

**Problem:** Credentials are expired or corrupted

**Solution:**
1. Check if `credenciais.txt` exists:
   ```bash
   cat credenciais.txt
   ```

2. Regenerate credentials:
   ```bash
   node pegar_token.js
   ```

3. Try the query again:
   ```bash
   node platex.js -m 12-AB-34
   ```

### "max retry reached"

**Problem:** PLATEX tried to refresh credentials multiple times but failed

**Causes:**
- No internet connection
- Website is down or blocked
- Playwright cannot launch browser

**Solution:**
1. Check internet connection
2. Try accessing `https://verificarmatricula.pt` in your browser
3. Ensure Chromium is installed: `npx playwright install`

### "token refresh failed"

**Problem:** Automatic token refresh encountered an error

**Possible causes:**
- Playwright browser crashed
- Network timeout
- Website structure changed

**Solution:**
```bash
# Try manual regeneration with visible browser
# Edit pegar_token.js: change headless: true to headless: false
# Then run:
node pegar_token.js
```

## Runtime Issues

### "trace failed"

**Problem:** API request failed

**Causes:**
- Invalid vehicle plate format
- API returned error
- Network issue

**Solution:**
1. Verify plate format (e.g., `12-AB-34` or `12AB34`)
2. Check internet connection
3. Regenerate credentials:
   ```bash
   node pegar_token.js
   ```

### "auth rejected (invalid token)"

**Problem:** API rejected authentication credentials

**Solution:**
```bash
# PLATEX will automatically try to refresh credentials
# If that fails, manually regenerate:
node pegar_token.js
```

### "Cannot find Chrome/Chromium"

**Problem:** Playwright cannot locate the browser

**Solution:**
```bash
# Reinstall Playwright with Chromium
npx playwright install chromium
```

## Platform-Specific Issues

### Windows

#### PowerShell Execution Policy

If you get "cannot be loaded because running scripts is disabled":

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### macOS

#### Chrome not found

On macOS, Google Chrome might be installed as "Google Chrome" not "Chromium":

```bash
# Install via Homebrew
brew install chromium
```

### Linux

#### Missing dependencies

Some Linux distributions need additional packages:

```bash
# Ubuntu/Debian
sudo apt-get install -y libgbm1 libxss1

# Fedora
sudo dnf install libgbm libxss
```

## Debugging

### Enable verbose output

Edit `platex.js` and look for `log()` calls - they show the [trace] messages.

### Check raw API response

The tool displays `[raw payload]` with the full JSON response.

### Test credentials manually

```javascript
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const cred = fs.readFileSync(path.join(__dirname, 'credenciais.txt'), 'utf8');
console.log(cred);

// Extract and test
```

### Run Node with debug output

```bash
# Show all network activity
NODE_DEBUG=http,https node platex.js -m 12-AB-34
```

## Network Issues

### "ECONNREFUSED"

**Problem:** Cannot connect to API

**Solution:**
- Check internet connection
- Try on different network
- Check if firewall is blocking
- API might be temporarily down

### "ETIMEDOUT"

**Problem:** Request timed out

**Solution:**
- Check internet speed
- Try later
- Use different network

### "ENOTFOUND api.verificarmatricula.pt"

**Problem:** DNS cannot resolve domain

**Solution:**
- Check internet connection
- Try flushing DNS cache:
  ```bash
  # Windows
  ipconfig /flushdns
  
  # macOS
  sudo dscacheutil -flushcache
  
  # Linux
  sudo systemctl restart systemd-resolved
  ```

## Still Having Issues?

1. Check [GitHub Issues](https://github.com/YOUR_USERNAME/platex/issues)
2. Read [DEVELOPMENT.md](DEVELOPMENT.md)
3. Review [README.md](README.md)
4. Create a new issue with:
   - Your OS and Node version
   - The exact command you ran
   - The full error message
   - Steps to reproduce

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module 'playwright'` | Missing dependency | `npm install` |
| `invalid credentials detected` | Expired token | `node pegar_token.js` |
| `trace failed` | API error | Check plate format |
| `ECONNREFUSED` | Cannot connect | Check internet |
| `ETIMEDOUT` | Connection slow | Try again later |
| `Cannot find Chrome` | Browser missing | `npx playwright install` |
