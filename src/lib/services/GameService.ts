import Game from '../models/Game';
import { getGameByDomain } from '../utils/nexus';

export default class GameService {
    static async add(domain: string) {
        const { name, domain_name, id } = await getGameByDomain(domain, process.env.NEXUS_API_KEY || '');

        const game = await Game.insert(name, domain_name, id);

        return game;
    }
}