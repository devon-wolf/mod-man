import request from 'superagent';
import { NexusGame, NexusMod } from '../../types';

const URL = 'api.nexusmods.com';
const appVersion = '0.0.1';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFromNexus = async (urlString: string, token: string): Promise<any> => {
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

export const getGameByDomain = (domain: string, token: string): Promise<NexusGame> => {
    return getFromNexus(`${URL}/v1/games/${domain}.json`, token);
};

export const getModById = (domain: string, id: string, token: string): Promise<NexusMod> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}.json`, token);
};

// gives old files as well as current; category for current is category_name: "MAIN"
export const getModFileList = (domain: string, id: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}/files.json`, token);
};

export const getModFileDetails = (domain: string, id: string, fileId: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}/files/${fileId}.json`, token);
};

// does not get a download link for non-premium members
export const getModDownloadLink = (domain: string, id: string, fileId: string, token: string): Promise<unknown> => {
    return getFromNexus(`${URL}/v1/games/${domain}/mods/${id}/files/${fileId}/download_link.json`, token);
};
