import { Field, ObjectType } from "@nestjs/graphql";
import { UserModel } from "../../account/models/user.model";

@ObjectType()
export class ResponseUserModel {

    @Field(() => UserModel, { nullable: true })
    user: UserModel

    @Field(() => String, { nullable: true })
    message: string
}