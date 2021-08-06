import { ModRequest, ModSummary } from '../../types';
import Mod from '../models/Mod';
import { getModById } from '../utils/nexus';

export default class ModService {
    static async add({ gameDomain, modId }: ModRequest): Promise<ModSummary> {
        const nexusMod = await getModById(gameDomain, modId, process.env.NEXUS_API_KEY || '');

        const {
            id,
            name,
            summary,
            version,
            author
        } = await Mod.insert(nexusMod);

        return {
            id,
            name,
            summary,
            version,
            author
        };
    }
}
