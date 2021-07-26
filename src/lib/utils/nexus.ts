import request from 'superagent';

const URL = 'api.nexusmods.com';
const token = process.env.NEXUS_API_KEY;

export const getAllGames = () => {
	return request
		.get(`${URL}/v1/games.json`)
		.set({ apiKey: token })
		.then(response => response.body);
};