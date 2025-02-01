import { ClassifiedItems } from "../models/Item";

export interface ItemRepository {
    getItems: () => Promise<ClassifiedItems>;
    refreshItems: () => Promise<void>;
}