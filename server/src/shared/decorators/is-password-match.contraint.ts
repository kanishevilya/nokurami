/* eslint-disable @typescript-eslint/no-unused-vars */
import { NewPasswordInput } from "@/src/modules/auth/password-reset/inputs/new-password.input";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments) {
        const relatedValue = (args.object as NewPasswordInput)
        return confirmPassword === relatedValue.newPassword;
    }

    defaultMessage(args: ValidationArguments) {
        return `Пароли не совпадают`;
    }
}