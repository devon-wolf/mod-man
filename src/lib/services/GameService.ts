import Game from '../models/Game';
import { getGameByDomain } from '../utils/nexus';

export default class GameService {
    static async add(domain: string): Promise<Game | undefined> {
        const gameExists = await Game.checkExists(domain);
        if (gameExists) return;

        const { name, domain_name, id } = await getGameByDomain(domain, process.env.NEXUS_API_KEY || '');

        const game = await Game.insert(name, domain_name, id);

        return game;
    }

    static async getUserGames(userId: string): Promise<Game[] | void> {
        const games = await Game.getUserGames(userId);
        return games;
    }
}
