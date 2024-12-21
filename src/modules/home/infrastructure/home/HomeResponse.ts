import { HomeData } from "../../domain/models/HomeData";

export class HomeResponse implements HomeData {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public readonly displayName: string,
        public readonly avatar: string,
        public readonly color: string,
        public readonly xp: string,
    ) {}
}