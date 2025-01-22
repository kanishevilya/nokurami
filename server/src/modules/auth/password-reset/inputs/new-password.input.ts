import { IsPasswordMatchConstraint } from '@/src/shared/decorators/is-password-match.contraint';
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID, MinLength, Validate } from 'class-validator'

@InputType()
export class NewPasswordInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
    public newPassword: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
    @Validate(IsPasswordMatchConstraint)
    public confirmPassword: string;

    @Field(() => String)
    @IsString()
    @IsUUID('4')
    @IsNotEmpty()
    public token: string;
}
