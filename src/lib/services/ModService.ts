import { ErrorMessage, ModRequest, ModSummary, UserModSummary } from '../../types';
import Mod from '../models/Mod';
import UserMod from '../models/UserMod';
import GameService from '../services/GameService';
import { getModById } from '../utils/nexus';

// TODO Consider bypassing service layer for the pieces that just pass along the results from the model
export default class ModService {
    static async add({ gameDomain, modId }: ModRequest, userId: string): Promise<ModSummary| ErrorMessage | void>  {

        if (process.env.NEXUS_API_KEY) {
            const nexusMod = await getModById(gameDomain, modId, process.env.NEXUS_API_KEY);
            
            await GameService.add(nexusMod.domain_name);

            const mod = await Mod.insert(nexusMod, userId);
            return mod;
        }
        else return ({ message: 'No API key provided' });
    }

    static async getAll(userId: string): Promise<ModSummary[] | void> {
        try {
            const mods = await UserMod.getUserMods(userId);

            return mods;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getById(userId: string, modId: string): Promise<ModSummary | void> {
        try {
            const mod = await UserMod.getUserModById(userId, modId);
            return mod;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async update(userId: string, modId: string, currentVersion: string): Promise<UserModSummary | void> {
        try {
            const mod = await UserMod.updateUserMod(userId, modId, currentVersion);
            return mod;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async remove(userId: string, modId: string): Promise<ErrorMessage> {
        const mod = await UserMod.deleteUserMod(userId, modId);
        return {
            message: `Mod ${mod.modId} has been deleted from user ${mod.userId}'s profile.`
        };
    }
}
