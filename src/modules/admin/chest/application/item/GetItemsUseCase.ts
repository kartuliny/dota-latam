import { ClassifiedItems } from "../../domain/models/Item";
import { ApiItemRepository } from "../../infrastructure/repositories/ApiItemRepository";

export class GetItemsUseCase {
    constructor() { }

    static async invoke(): Promise<ClassifiedItems> {
        const chests = new ApiItemRepository();
        return chests.getItems();
    }
}