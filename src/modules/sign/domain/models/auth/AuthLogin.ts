import { Primitives } from "@/modules/shared/primitives";
import * as vo from './index';
import * as yup from 'yup';
import { AuthLoginParams } from "@/modules/sign/application/auth/AuthLoginParams";

export class AuthLogin {
    private constructor(
        readonly email?: vo.AuthLoginEmail,
        readonly password?: vo.AuthLoginPassword,
    ) {}

    public static create({ email, password }: Primitives<AuthLogin>): AuthLogin {
        const validEmail = new vo.AuthLoginEmail(email ?? "");
        const validPassword = new vo.AuthLoginPassword(password ?? "");

        return new AuthLogin(validEmail, validPassword);
    }

    public static validationSchema = () => yup.object().shape(({
        email: vo.AuthLoginEmail.ensureIsValid(),
        password: vo.AuthLoginPassword.ensureIsValid(),
    }));


    public static initital = () => <AuthLoginParams>({
        email: undefined,
        password: undefined,
    })
}