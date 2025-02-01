import { ApiItemRepository } from "../../infrastructure/repositories/ApiItemRepository";

export class RefreshItemsUseCase {
    constructor() { }

    static async invoke(): Promise<void> {
        const chests = new ApiItemRepository();
        return chests.refreshItems();
    }
}