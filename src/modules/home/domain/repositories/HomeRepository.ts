import { HomeResponse } from "../../infrastructure/home/HomeResponse";

export interface HomeRepository {
    getHomeInfo: () => Promise<HomeResponse>;
}