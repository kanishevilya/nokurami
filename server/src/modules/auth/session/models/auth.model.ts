import { Field, ObjectType } from '@nestjs/graphql'
import { UserModel } from '../../account/models/user.model'


@ObjectType()
export class AuthModel {
	@Field(() => UserModel, { nullable: true })
	public user: UserModel

	@Field(() => String, { nullable: true })
	public message: string
}
