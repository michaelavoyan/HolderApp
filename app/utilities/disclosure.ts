import md5 from 'blueimp-md5';

export const getPublicShareLink = ({
    iss = '',
    exchangeId = '',
    presentationId = '',
    template
}: {
    iss?: string;
    exchangeId?: string;
    presentationId?: string;
    template: string;
}) => {
    const hash = md5(`${iss}?e=${exchangeId}&p=${presentationId}`);

    return {link: template.replace('{linkCode}', hash), linkCode: hash};
};
