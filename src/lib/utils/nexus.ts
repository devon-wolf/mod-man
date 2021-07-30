import request from 'superagent';

const URL = 'api.nexusmods.com';
const appVersion = '0.0.1';

const getFromNexus = async (urlString: string, token: string): Promise<unknown> => {
    try {
        const response = await request
            .get(urlString)
            .set({
                apiKey: token,
                'Application-Version': appVersion,
                'Application-Name': 'mod-man'
            });

        return response.body;
    }
    catch(error) {
        return ({ message: error.message });
    }
};

export const getAllGames = (token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games.json`, token);
};

export const getGameByDomain = (domain: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}.json`, token);
};

export const getModById = (domain: string, id: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}.json`, token);
};

export const getModFileList = (domain: string, id: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}/files.json`, token);
};

export const getModFileDetails = (domain: string, id: string, fileId: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}/files/${fileId}.json`, token);
};

// there are additional circumstances to consider here, probably don't use yet
export const getModDownloadLink = (domain: string, id: string, fileId: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}/files/${fileId}/download_link.json`, token);
};
