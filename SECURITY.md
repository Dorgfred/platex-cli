# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in PLATEX, please email the maintainers privately instead of using the public issue tracker.

**Do not create public GitHub issues for security vulnerabilities.**

Please include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

## Security Considerations

### Credentials Management

PLATEX stores credentials in `credenciais.txt`:
- This file is **never** committed to Git (see `.gitignore`)
- Contains sensitive API keys and tokens
- Should be treated as confidential
- **Never share this file publicly**

### Third-party Dependencies

PLATEX uses several npm packages:
- `playwright` - Browser automation
- `axios` - HTTP client
- `commander` - CLI parsing
- `chalk`, `figlet`, `gradient-string`, `boxen`, `ora` - Terminal UI

All dependencies are regularly reviewed and kept up-to-date.

### Best Practices

1. **Run on trusted networks only** - Credential generation requires internet access
2. **Don't commit credentials** - Ensure `credenciais.txt` stays in `.gitignore`
3. **Keep Node.js updated** - Use Node.js 18 or higher
4. **Update dependencies regularly** - Run `npm update` periodically

### API Endpoint Security

PLATEX communicates with `https://api.verificarmatricula.pt` over HTTPS.

- All requests are encrypted in transit
- API keys are sent in custom headers
- Never modify the API endpoint to use HTTP

## Known Limitations

- Credentials may expire and require regeneration
- Playwright requires Chromium browser
- Depends on external API availability

## Support

For general security questions or best practices, please open a discussion in GitHub Issues.
