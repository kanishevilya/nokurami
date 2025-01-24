import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { SocialLink } from '@/prisma/generated'

@ObjectType()
export class SocialLinkModel implements SocialLink {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public title: string

	@Field(() => String)
	public url: string

	@Field(() => Number)
	public position: number

	@Field(() => String)
	public userId: string

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
