import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean } from 'class-validator'

@InputType()
export class ChangeChatSettingsInput {
	@Field(() => Boolean)
	@IsBoolean()
	public isChatEnabled: boolean

	@Field(() => Boolean)
	@IsBoolean()
	public isChatFollowersOnly: boolean

	@Field(() => Boolean)
	@IsBoolean()
	public isChatSubscribersOnly: boolean
}
