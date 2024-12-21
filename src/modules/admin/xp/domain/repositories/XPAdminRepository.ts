import { UserXPData } from "../models/UserXPData";

export interface XPAdminRepository {
    getHistory: () => Promise<UserXPData[]>;
}