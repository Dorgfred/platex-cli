# PLATEX

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18-0f0f0f?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/version-2.0.0-111111?style=for-the-badge">
  <img src="https://img.shields.io/badge/license-MIT-0a0a0a?style=for-the-badge">
</p>

<p align="center">
  vehicle intelligence from the shadows
</p>

---

## Overview

PLATEX is a terminal-based vehicle lookup CLI focused on Portuguese license plates.

Built with a minimal underground aesthetic, automatic token recovery, and a clean terminal interface designed for fast OSINT-style workflows.

The tool automatically refreshes expired tokens and renders vehicle data directly in the terminal using structured tables and visual blocks.

---

## Features

* Portuguese vehicle lookup
* Automatic token refresh
* Asset blocking for faster token capture
* Anti-detection browser fingerprinting
* Terminal-based interface
* Structured response rendering with 24 vehicle fields
* Raw payload inspection mode
* Retry system for expired tokens
* Rate limit and 404 handling
* Lightweight and fast workflow
* Minimal underground visual style

---

## Preview

```bash
$ platex -m 65-BT-19

██████╗ ██╗      █████╗ ████████╗███████╗██╗  ██╗
██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝
██████╔╝██║     ███████║   ██║   █████╗   ╚███╔╝
██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝   ██╔██╗
██║     ███████╗██║  ██║   ██║   ███████╗██╔╝ ██╗
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

╔════════════════════════════════════════════╗
║      PLATEX :: Portuguese Plate Lookup     ║
╚════════════════════════════════════════════╝

▸ loading authorization token...
✓ authorization token loaded
⠋ querying european vehicle registries...
✓ vehicle trace complete
▸ decoding response payload...

[raw payload]

{ ... }

╭─ VEHICLE PROFILE ────────────────╮
│                                  │
│  BMW                             │
│  Série 3                         │
│                                  │
╰──────────────────────────────────╯

┌─────────────────────────────────────┬──────────────────────────────────────────────────────────────────────┐
│ FIELD                               │ VALUE                                                                │
├─────────────────────────────────────┼──────────────────────────────────────────────────────────────────────┤
│ Plate                               │ 65-BT-19                                                             │
│ Brand                               │ BMW                                                                  │
│ Model                               │ Série 3                                                              │
│ Registration Date                   │ 2019-06-12                                                           │
│ Fuel Type                           │ Diesel                                                               │
│ Color                               │ Black                                                                │
│ Power CV                            │ 150                                                                  │
│ Engine CC                           │ 1995                                                                 │
│ CO2                                 │ 122                                                                  │
└─────────────────────────────────────┴──────────────────────────────────────────────────────────────────────┘

✓ render complete
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Dorgfred/platex.git

cd platex
```

Install dependencies:

```bash
npm install
```

Install Playwright browser binaries:

```bash
npx playwright install chromium
```

---

## Usage

Run directly with Node.js:

```bash
node platex.js -m 12-AB-34
```

Or install globally:

```bash
npm link
```

Then use:

```bash
platex -m 12-AB-34
```

---

## Command Reference

| Command             | Description          |
| ------------------- | -------------------- |
| `platex -m <plate>` | Lookup vehicle plate |

Example:

```bash
platex -m 65-BT-19
```

---

## How It Works

PLATEX performs three main operations:

1. Captures a valid Bearer token automatically via a headless Chromium browser
2. Sends authenticated requests to the vehicle endpoint at `api.infomatricula.pt`
3. Renders formatted output directly in the terminal

During token capture, the browser blocks images, fonts, and media to speed up the process, and suppresses the `webdriver` property to avoid bot detection. The token is intercepted from the outgoing `Authorization` header and saved to `token.txt`.

If a request returns `401` or `403`, the tool automatically refreshes the token and retries up to 2 times. If a `429` is returned, the tool exits and suggests switching IP or proxy.

---

## Output Fields

When a vehicle is found, PLATEX renders up to 24 fields:

| Field | Description |
| --- | --- |
| Plate | License plate number |
| VIN | Vehicle identification number |
| Brand | Manufacturer |
| Model | Model name |
| Version | Trim / version |
| Registration Date | First registration date |
| Fuel Type | Petrol, diesel, electric, etc. |
| Color | Exterior color |
| Drive Type | FWD, RWD, AWD |
| Body Type | Sedan, SUV, etc. |
| Mixture | Fuel mixture type |
| Valves | Number of valves |
| Imported | Whether the vehicle was imported |
| Category | Vehicle category |
| Owner Type | Individual or company |
| Owner Category | Owner classification |
| IUC Category | Tax category |
| IUC | Annual road tax value |
| CO2 | CO2 emissions (g/km) |
| Engine CC | Engine displacement |
| Power CV | Power in horsepower |
| Power KW | Power in kilowatts |
| Model From | Start of production year |
| Model To | End of production year |

Only non-empty fields are displayed.

---

## Error Handling

| Status | Behaviour |
| --- | --- |
| `401` / `403` | Token refreshed automatically, request retried (max 2x) |
| `429` | Exits with suggestion to switch VPN / proxy / IP |
| `404` | Exits with plate not found message |
| Timeout | Exits with timeout error |
| Other | Exits with status code and error message |

---

## Dependencies

| Package | Purpose |
| --- | --- |
| `axios` | HTTP requests |
| `chalk` | Terminal colors |
| `boxen` | Bordered boxes in terminal |
| `ora` | Spinner / loading indicator |
| `cli-table3` | Structured table rendering |
| `commander` | CLI argument parsing |
| `playwright` | Headless browser for token capture |

---

## Project Structure

```bash
.
├── platex.js          # Main CLI application
├── gerar_token.js     # Token generator (headless browser)
├── token.txt          # Captured Bearer token — auto-generated, not committed
├── package.json
└── README.md
```

> `token.txt` is generated automatically on the first run and is listed in `.gitignore`. It will not be present in a freshly cloned repository.

---

## Requirements

* Node.js >= 18
* Chromium (via Playwright)
* Internet connection

---

## Notes

The first execution may take slightly longer while Playwright initializes browser resources and captures a fresh token.

The token is stored in `token.txt` and reused across requests until it expires. Renewal is fully automatic.

---

## Disclaimer

This project is intended for educational, research, and OSINT-related purposes only.

The author is not responsible for misuse, abuse, or violations of third-party terms of service.

---

## License

MIT
