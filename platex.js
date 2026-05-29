#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;
const boxen = require('boxen').default;
const ora = require('ora').default;
const Table = require('cli-table3');
const { Command } = require('commander');
const { execSync } = require('child_process');

// =========================
// THEME
// =========================

const theme = {
    primary: '#66D492',
    secondary: '#3B82F6',
    success: '#66D492',
    warning: '#F59E0B',
    danger: '#F43F5E',
    muted: '#64748B',
    text: '#E2E8F0'
};

// =========================
// CLI
// =========================

const program = new Command();

program
    .name('platex')
    .description('vehicle intelligence from the shadows')
    .requiredOption('-m, --matricula <matricula>', 'vehicle plate');

program.parse();

const options = program.opts();

// =========================
// PATHS
// =========================

const TOKEN_FILE = path.join(__dirname, 'token.txt');
const TOKEN_SCRIPT = path.join(__dirname, 'gerar_token.js');

// =========================
// HEADER
// =========================

console.clear();

console.log(
    chalk.hex(theme.primary)(
`██████╗ ██╗      █████╗ ████████╗███████╗██╗  ██╗
██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝
██████╔╝██║     ███████║   ██║   █████╗   ╚███╔╝
██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝   ██╔██╗
██║     ███████╗██║  ██║   ██║   ███████╗██╔╝ ██╗
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`
    )
);

console.log();

console.log(
    chalk.hex(theme.primary)(
`╔════════════════════════════════════════════╗
║      PLATEX :: Portuguese Plate Lookup     ║
╚════════════════════════════════════════════╝`
    )
);

console.log();

// =========================
// LOG HELPERS
// =========================

function log(msg) {

    console.log(
        chalk.hex(theme.secondary)(`▸ ${msg}`)
    );

}

function ok(msg) {

    console.log(
        chalk.hex(theme.success)(`✓ ${msg}`)
    );

}

function warn(msg) {

    console.log(
        chalk.hex(theme.warning)(`⚠ ${msg}`)
    );

}

function fail(msg) {

    console.log(
        chalk.hex(theme.danger)(`✖ ${msg}`)
    );

}

// =========================
// TOKEN
// =========================

function carregarToken(attempt = 0) {

    const MAX = 2;

    try {

        log('loading authorization token...');

        const token = fs
            .readFileSync(TOKEN_FILE, 'utf8')
            .trim();

        if (!token) {
            throw new Error('empty token');
        }

        ok('authorization token loaded');

        return token;

    } catch {

        warn('invalid token detected');

        if (attempt >= MAX) {

            fail('max retry reached');
            process.exit(1);

        }

        atualizarToken();

        return carregarToken(attempt + 1);

    }

}

// =========================
// TOKEN REFRESH
// =========================

function atualizarToken() {

    log('initializing token refresh...');

    try {

        execSync(`node "${TOKEN_SCRIPT}"`, {
            stdio: 'inherit'
        });

        ok('token updated');

    } catch (e) {

        fail('token refresh failed');

        console.log(e.message);

        process.exit(1);

    }

}

// =========================
// TABLE ENGINE
// =========================

function table() {

    return new Table({

        head: [
            chalk.hex(theme.secondary)('FIELD'),
            chalk.hex(theme.primary)('VALUE')
        ],

        colWidths: [35, 70],

        style: {
            border: ['gray']
        }

    });

}

// =========================
// RENDER
// =========================

function render(data) {

    log('decoding response payload...');

    console.log(
        chalk.hex(theme.muted)('\n[raw payload]\n')
    );

    console.log(
        JSON.stringify(data, null, 2)
    );

    console.log();

    // =========================
    // PROFILE BOX
    // =========================

    console.log(
        boxen(
            `${chalk.white.bold(data.make || 'Unknown')}\n${chalk.hex(theme.secondary)(data.model || '-')}`,
            {
                title: ' VEHICLE PROFILE ',
                padding: 1,
                borderColor: 'green',
                borderStyle: 'round'
            }
        )
    );

    // =========================
    // TABLE
    // =========================

    const t = table();

    const fields = [

        ['Plate', data.plate],
        ['VIN', data.vin],
        ['Brand', data.make],
        ['Model', data.model],
        ['Version', data.version],
        ['Registration Date', data.plateDate],
        ['Fuel Type', data.fuelType],
        ['Color', data.color],
        ['Drive Type', data.driveType],
        ['Body Type', data.bodyType],
        ['Mixture', data.mixture],
        ['Valves', data.valves],
        ['Imported', data.isImported],
        ['Category', data.categoryType],
        ['Owner Type', data.ownerType],
        ['Owner Category', data.ownerCategory],
        ['IUC Category', data.categoryIUC],
        ['IUC', data.IUC],
        ['CO2', data.co2],
        ['Engine CC', data.cubicCap],
        ['Power CV', data.powercv],
        ['Power KW', data.powerkw],
        ['Model From', data.markFrom],
        ['Model To', data.markTo]

    ];

    fields.forEach(([k, v]) => {

        if (
            v !== undefined &&
            v !== null &&
            String(v).trim() !== ''
        ) {

            t.push([
                chalk.white(k),
                chalk.hex(theme.text)(String(v))
            ]);

        }

    });

    console.log(t.toString());

    ok('render complete');

}

// =========================
// API ENGINE
// =========================

async function consultar(matricula, retry = 0) {

    if (retry > 2) {

        fail('authentication permanently rejected');
        process.exit(1);

    }

    let token = carregarToken();

    const spinner = ora({

        text: chalk.hex(theme.secondary)(
            'querying european vehicle registries...'
        ),

        color: 'cyan'

    }).start();

    try {

        const res = await axios.get(
            'https://api.infomatricula.pt/informacao/fetch',
            {

                params: {
                    plate: matricula
                },

                headers: {

                    Authorization: token,

                    Accept: 'application/json',

                    Referer: 'https://infomatricula.pt',

                    'User-Agent': 'Mozilla/5.0'

                },

                timeout: 20000,

                validateStatus: () => true

            }
        );

        // =========================
        // AUTH EXPIRED
        // =========================

        if (
            res.status === 401 ||
            res.status === 403
        ) {

            spinner.fail(
                chalk.hex(theme.warning)(
                    'authorization rejected'
                )
            );

            warn('token expired or invalid');

            atualizarToken();

            return consultar(
                matricula,
                retry + 1
            );

        }

        // =========================
        // RATE LIMIT
        // =========================

        if (res.status === 429) {

            spinner.fail(
                chalk.hex(theme.danger)(
                    'rate limit reached'
                )
            );

            fail('too many requests');

            console.log();

            console.log(
                chalk.hex(theme.warning)(
                    'switch vpn / proxy / ip'
                )
            );

            process.exit(1);

        }

        // =========================
        // NOT FOUND
        // =========================

        if (res.status === 404) {

            spinner.fail(
                chalk.hex(theme.warning)(
                    'vehicle not found'
                )
            );

            fail('plate not found in registry');

            process.exit(1);

        }

        // =========================
        // INVALID STATUS
        // =========================

        if (
            res.status !== 200 ||
            !res.data
        ) {

            spinner.fail(
                chalk.hex(theme.danger)(
                    'unexpected api response'
                )
            );

            fail(`status code: ${res.status}`);

            process.exit(1);

        }

        // =========================
        // SUCCESS
        // =========================

        spinner.succeed(
            chalk.hex(theme.success)(
                'vehicle trace complete'
            )
        );

        render(res.data);

    } catch (err) {

        spinner.fail(
            chalk.hex(theme.danger)(
                'vehicle trace failed'
            )
        );

        if (
            err.code === 'ECONNABORTED' ||
            err.message.includes('timeout')
        ) {

            fail('request timeout');

            process.exit(1);

        }

        fail(err.message);

    }

}

// =========================
// START
// =========================

consultar(
    options.matricula
        .toUpperCase()
        .trim()
);