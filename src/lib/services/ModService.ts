import { ModRequest, ModSummary } from '../../types';
import Mod from '../models/Mod';
import { getModById } from '../utils/nexus';

export default class ModService {
    static async add({ gameDomain, modId }: ModRequest): Promise<ModSummary | void> {
        const nexusMod = await getModById(gameDomain, modId, process.env.NEXUS_API_KEY || '');

        try {
            const mod = await Mod.insert(nexusMod);
            return {
                id: mod.id,
                name: mod.name,
                summary: mod.summary,
                version: mod.version,
                author: mod.author
            };
        }
        catch (error){
            console.log(error);
        }
    }
}
