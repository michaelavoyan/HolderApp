const fs = require('fs');

try {
    const relativePath = process.env.RELATIVE_PATH || './';
    const rawData = fs.readFileSync(
        '/Volumes/Keybase/team/velocitycareers/mobile/holderapp/linkedin/secrets.properties'
    );

    const data = rawData.toString();

    const values = data
        .split('\n')
        .map(item => item.replace('=', ':'))
        .join(',');

    const secretsSrc = `export default {${values}}`;

    let storedSecrets = '';

    try {
        storedSecrets = fs.readFileSync(`${relativePath}secrets.js`);
    } catch (e) {
         
        console.error(e);
    }

    if (storedSecrets.toString() === secretsSrc.toString()) {
        return;
    }

    fs.writeFileSync(`${relativePath}secrets.js`, secretsSrc);
} catch (e) {
     
    console.error(e, 'Secrets file has not generated');
}
