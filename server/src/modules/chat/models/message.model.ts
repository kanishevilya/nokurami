import { Field, ID, ObjectType } from '@nestjs/graphql'

import { UserModel } from '../../auth/account/models/user.model'
import { StreamModel } from '../../stream/models/stream.model'
import { Message } from '@/prisma/generated'

@ObjectType()
export class MessageModel implements Message {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public text: string

	@Field(() => UserModel)
	public user: UserModel

	@Field(() => String)
	public userId: string

	@Field(() => StreamModel)
	public stream: StreamModel

	@Field(() => String)
	public streamId: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
