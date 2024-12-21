import { StringValueObject } from "@/modules/shared/value-object/StringValueObject";
import * as yup from 'yup';

export class AuthLoginPassword extends StringValueObject {

    static ensureIsValid(): yup.Schema {
        return yup.string().required();
    }
}