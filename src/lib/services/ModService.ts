import { ErrorMessage, ModRequest, ModSummary } from '../../types';
import Mod from '../models/Mod';
import { getModById } from '../utils/nexus';

// TODO Consider bypassing service layer for the pieces that just pass along the results from the model
export default class ModService {
    static async add({ gameDomain, modId }: ModRequest, userId: string): Promise<ModSummary| ErrorMessage | void>  {
        if (process.env.NEXUS_API_KEY) {
            const nexusMod = await getModById(gameDomain, modId, process.env.NEXUS_API_KEY);

            try {
                const mod = await Mod.insert(nexusMod, userId);
    
                return mod;
            }
            catch (error){
                console.log(error);
            }
        }
        else return ({ message: 'No API key provided' });
    }

    static async getAll(userId: string): Promise<ModSummary[] | void> {
        try {
            const mods = await Mod.getUserMods(userId);

            return mods;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getById(userId: string, modId: string): Promise<ModSummary | void> {
        try {
            const mod = await Mod.getUserModById(userId, modId);

            return mod;
        }
        catch (error) {
            console.log(error);
        }
    } 
}
