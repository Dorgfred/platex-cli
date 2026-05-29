# Changelog

All notable changes to PLATEX will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-05-29

### Fixed
- Corrected script filename references from `pegar_token.js` to `gerar_token.js` across all documentation and configuration files
- Fixed `package.json` `"files"` field to correctly include `gerar_token.js` instead of `pegar_token.js`
- Fixed CI workflow syntax check step to reference `gerar_token.js`
- Updated `SECURITY.md` API endpoint from `api.verificarmatricula.pt` to `api.infomatricula.pt`
- Updated `README.md` to reflect Bearer token architecture (replacing outdated credential-based references)
- Removed outdated `TROUBLESHOOTING.md` and `DEVELOPMENT.md` with incorrect instructions

## [2.0.0] - 2026-05-26

### Added
- Initial public release
- Automatic token refresh system
- Terminal-based vehicle lookup CLI
- Support for Portuguese license plates
- Underground aesthetic UI with gradient styling
- Structured table rendering for vehicle data
- Automatic token recovery on auth failure
- Retry mechanism for expired tokens

### Features
- Portuguese vehicle lookup via API
- Automatic token management
- Terminal-based interface with visual styling
- Fast OSINT-style workflow
- Lightweight and minimal dependencies
