export const isShouldUpdateVersion = (
    minVersionConfig: string,
    appVersion: string
) => {
    const configVersions = minVersionConfig.split('.');
    const appVersions = appVersion.split('.');

    for (let i = 0; i < configVersions.length; i += 1) {
        if (Number(configVersions[i]) > Number(appVersions[i])) {
            return true;
        }
        if (Number(configVersions[i]) < Number(appVersions[i])) {
            return false;
        }
    }

    return false;
};
