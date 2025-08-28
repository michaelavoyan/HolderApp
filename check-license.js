#!/usr/bin/env node

const stdin = process.openStdin();

let data = '';

stdin.on('data', chunk => {
    data += chunk;
});

stdin.on('end', () => {
    const licenses = JSON.parse(data);
    processBadLicenses(licenses.data.head, getBadLicenses(licenses));
});

const getBadLicenses = licenses => {
    const nameIndex = licenses.data.head.findIndex(x => x === 'Name');
    const licenseIndex = licenses.data.head.findIndex(x => x === 'License');
    return licenses.data.body.filter(
        row =>
            !row[nameIndex].startsWith('@velocitycareerlabs') &&
            row[nameIndex] !== 'realm' && // TODO remove realm hack
            !/MIT|MIT OR X11|BSD|ISC|Apache-2.0|Unlicense|Public Domain|CC-BY-3.0|CC0-1.0|MPL-2.0/.test(
                row[licenseIndex]
            )
    );
};

const processBadLicenses = (head, badLicenses) => {
    if (badLicenses.length === 0) {
        console.info('Licenses OK');
        return;
    }

    console.error('Error: Bad licenses detected');
    console.dir(head);
    console.dir(badLicenses);
    process.exit(1);
};
