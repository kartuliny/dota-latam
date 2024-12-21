import { UserData } from '../../domain/models/UserData';

export class UserResponse {
    constructor(
        public readonly userData: UserData,
    ) {}
}