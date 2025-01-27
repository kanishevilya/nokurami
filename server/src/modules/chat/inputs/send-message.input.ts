import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class SendMessageInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    public text: string

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    public streamId: string
}
