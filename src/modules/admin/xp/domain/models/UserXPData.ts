export interface UserXPDataDetail {
    id: string;
    username: string;
    displayName: string;
    nickname?: string;
    color: string;
}

export interface UserXPData {
    oldXP: number;
    xp: number;
    newXP: number;
    receiver: string;
    sender: string;
    _id: string;
    createdAt: number;
    updatedAt: number;
    senderData: UserXPDataDetail,
    receiverData: UserXPDataDetail,
}