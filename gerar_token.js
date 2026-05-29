const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const TOKEN_FILE = path.join(
    __dirname,
    'token.txt'
);

async function gerarToken() {

    console.log('\nGERAR NOVO TOKEN...\n');

    const browser = await chromium.launch({
        headless: true
    });

    const context = await browser.newContext({

        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36'

    });

    const page = await context.newPage();

    // =========================
    // BLOCK USELESS ASSETS
    // =========================

    await page.route(
        '**/*',
        route => {

            const type =
                route.request().resourceType();

            if (

                type === 'image' ||
                type === 'font' ||
                type === 'media'

            ) {

                return route.abort();

            }

            route.continue();

        }
    );

    // =========================
    // ANTI WEBDRIVER
    // =========================

    await page.addInitScript(() => {

        Object.defineProperty(
            navigator,
            'webdriver',
            {
                get: () => false
            }
        );

    });

    console.log('Browser aberto.');

    // =========================
    // OPEN SITE
    // =========================

    await page.goto(
        'https://infomatricula.pt',
        {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        }
    );

    console.log('Site aberto.');

    // =========================
    // COOKIES
    // =========================

    try {

        const consentButton =
            page.getByRole(
                'button',
                {
                    name: /consentir|aceitar|accept/i
                }
            );

        await consentButton
            .first()
            .click({
                timeout: 3000
            });

        console.log(
            'Cookies aceites.'
        );

    } catch {}

    // =========================
    // TOKEN REQUEST
    // =========================

    const tokenPromise =
        page.waitForRequest(

            request => {

                const headers =
                    request.headers();

                return (

                    request.url().includes(
                        '/informacao/fetch'
                    ) &&

                    headers.authorization?.startsWith(
                        'Bearer '
                    )

                );

            },

            {
                timeout: 30000
            }

        );

    // =========================
    // INPUT
    // =========================

    const input =
        page.locator(
            'input[name="matricula"]'
        );

    await input.fill(
        '65-BT-19'
    );

    console.log(
        'Matrícula preenchida.'
    );

    await page.keyboard.press(
        'Enter'
    );

    console.log(
        'Pesquisa enviada.'
    );

    // =========================
    // TOKEN
    // =========================

    const request =
        await tokenPromise;

    const token =
        request.headers().authorization;

    console.log(
        '\nTOKEN CAPTURADO!\n'
    );

    console.log(token);

    await browser.close();

    return token;

}

function guardarToken(token) {

    fs.writeFileSync(
        TOKEN_FILE,
        token.trim()
    );

    console.log(
        '\nTOKEN GUARDADO:\n'
    );

    console.log(TOKEN_FILE);

}

async function main() {

    try {

        const token =
            await gerarToken();

        guardarToken(token);

        console.log(
            '\nConcluído.\n'
        );

    } catch (erro) {

        console.log('\nERRO:\n');

        console.log(erro);

        process.exit(1);

    }

}

main();