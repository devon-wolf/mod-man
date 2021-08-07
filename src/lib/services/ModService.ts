import { ModRequest, ModSummary } from '../../types';
import Mod from '../models/Mod';
import { getModById } from '../utils/nexus';

export default class ModService {
    static async add({ gameDomain, modId }: ModRequest, userId: string): Promise<ModSummary | void> {
        const nexusMod = await getModById(gameDomain, modId, process.env.NEXUS_API_KEY || '');

        try {
            const mod = await Mod.insert(nexusMod, userId);

            return {
                id: mod.id,
                name: mod.name,
                summary: mod.summary,
                version: mod.version,
                author: mod.author,
                message: `Mod added to user ${mod.userId}'s profile`
            };
        }
        catch (error){
            console.log(error);
        }
    }

    static async getAll(userId: string): Promise<ModSummary[] | void> {
        try {
            const mods = await Mod.getUserMods(userId);

            return mods.map(mod => ({
                id: mod.id,
                name: mod.name,
                summary: mod.summary,
                version: mod.version,
                author: mod.author
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
}
