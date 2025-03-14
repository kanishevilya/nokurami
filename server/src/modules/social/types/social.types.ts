import { Field, ID, ObjectType, InputType, registerEnumType } from '@nestjs/graphql';
import { UserModel } from '../../auth/account/models/user.model';

@ObjectType()
export class PostModel {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field(() => UserModel)
    author: UserModel;

    @Field()
    authorId: string;

    @Field(() => [LikeModel], { nullable: true })
    likes?: LikeModel[];

    @Field(() => [CommentModel], { nullable: true })
    comments?: CommentModel[];

    @Field()
    isPublic: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => Number, { nullable: true })
    likeCount?: number;

    @Field(() => Number, { nullable: true })
    commentCount?: number;
}

@ObjectType()
export class CommentModel {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field(() => PostModel)
    post: PostModel;

    @Field()
    postId: string;

    @Field(() => UserModel)
    author: UserModel;

    @Field()
    authorId: string;

    @Field(() => [LikeModel], { nullable: true })
    likes?: LikeModel[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => Number, { nullable: true })
    likeCount?: number;
}

@ObjectType()
export class LikeModel {
    @Field(() => ID)
    id: string;

    @Field(() => UserModel)
    user: UserModel;

    @Field()
    userId: string;

    @Field(() => PostModel, { nullable: true })
    post?: PostModel;

    @Field({ nullable: true })
    postId?: string;

    @Field(() => CommentModel, { nullable: true })
    comment?: CommentModel;

    @Field({ nullable: true })
    commentId?: string;

    @Field()
    createdAt: Date;
}

export enum ChatStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

registerEnumType(ChatStatus, {
    name: 'ChatStatus',
    description: 'Status of a private chat',
});

@ObjectType()
export class PrivateChatModel {
    @Field(() => ID)
    id: string;

    @Field(() => UserModel)
    creator: UserModel;

    @Field()
    creatorId: string;

    @Field(() => UserModel)
    recipient: UserModel;

    @Field()
    recipientId: string;

    @Field(() => [PrivateMessageModel], { nullable: true })
    messages?: PrivateMessageModel[];

    @Field(() => ChatStatus)
    status: ChatStatus;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => Number, { nullable: true })
    unreadCount?: number;
}

@ObjectType()
export class PrivateMessageModel {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field(() => PrivateChatModel)
    chat: PrivateChatModel;

    @Field()
    chatId: string;

    @Field(() => UserModel)
    sender: UserModel;

    @Field()
    senderId: string;

    @Field()
    isRead: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

// Input Types для создания и обновления
@InputType()
export class CreatePostInput {
    @Field()
    content: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field({ defaultValue: true })
    isPublic?: boolean;
}

@InputType()
export class UpdatePostInput {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    imageUrl?: string;

    @Field({ nullable: true })
    isPublic?: boolean;
}

@InputType()
export class CreateCommentInput {
    @Field(() => ID)
    postId: string;

    @Field()
    content: string;
}

@InputType()
export class UpdateCommentInput {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;
}

@InputType()
export class ToggleLikeInput {
    @Field(() => ID, { nullable: true })
    postId?: string;

    @Field(() => ID, { nullable: true })
    commentId?: string;
}

@InputType()
export class RequestChatInput {
    @Field(() => ID)
    recipientId: string;
}

@InputType()
export class UpdateChatStatusInput {
    @Field(() => ID)
    chatId: string;

    @Field(() => ChatStatus)
    status: ChatStatus;
}

@InputType()
export class SendPrivateMessageInput {
    @Field(() => ID)
    chatId: string;

    @Field()
    content: string;
}

@InputType()
export class MarkMessagesAsReadInput {
    @Field(() => ID)
    chatId: string;
}

@ObjectType()
export class MarkMessagesAsReadResponse {
    @Field(() => Boolean)
    success: boolean;

    @Field(() => Number)
    count: number;
}

@InputType()
export class PostFiltersInput {
    @Field(() => Boolean, { nullable: true })
    followingOnly?: boolean;

    @Field(() => String, { nullable: true })
    userId?: string;

    @Field(() => String, { nullable: true })
    searchTerm?: string;
}

@InputType()
export class PostSortInput {
    @Field(() => Boolean, { nullable: true })
    latestFirst?: boolean;

    @Field(() => Boolean, { nullable: true })
    mostLiked?: boolean;

    @Field(() => Boolean, { nullable: true })
    mostCommented?: boolean;
} 