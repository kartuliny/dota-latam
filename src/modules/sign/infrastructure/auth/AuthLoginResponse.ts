export class AuthLoginResponse {
    constructor(
        public readonly token: string,
        public readonly refreshToken: string,
        public readonly expiresIn: number,
        public readonly tokenType: string,
        public readonly scope: string,
        public readonly createdAt: Date,
    ) {}
}