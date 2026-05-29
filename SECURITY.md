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

### Token Management

PLATEX stores a Bearer token in `token.txt`:
- This file is **never** committed to Git (see `.gitignore`)
- Contains a session token captured automatically via headless browser
- Should be treated as confidential
- **Never share this file publicly**

The token is short-lived and refreshed automatically when it expires.

### Third-party Dependencies

PLATEX uses several npm packages:
- `playwright` - Browser automation
- `axios` - HTTP client
- `commander` - CLI parsing
- `chalk`, `boxen`, `ora`, `cli-table3` - Terminal UI

All dependencies are regularly reviewed and kept up-to-date.

### Best Practices

1. **Run on trusted networks only** - Token generation requires internet access
2. **Don't commit the token** - Ensure `token.txt` stays in `.gitignore`
3. **Keep Node.js updated** - Use Node.js 18 or higher
4. **Update dependencies regularly** - Run `npm update` periodically

### API Endpoint Security

PLATEX communicates with `https://api.infomatricula.pt` over HTTPS.

- All requests are encrypted in transit
- Bearer tokens are sent in the `Authorization` header
- Never modify the API endpoint to use HTTP

## Known Limitations

- Tokens expire and require automatic or manual regeneration
- Playwright requires Chromium browser
- Depends on external API availability

## Support

For general security questions or best practices, please open a discussion in GitHub Issues.
