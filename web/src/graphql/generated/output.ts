import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  previewUrl: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  streams: Array<StreamModel>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChangeChatSettingsInput = {
  isChatEnabled: Scalars['Boolean']['input'];
  isChatFollowersOnly: Scalars['Boolean']['input'];
};

export type ChangeEmailInput = {
  token: Scalars['String']['input'];
};

export type ChangeNotificationsSettingsInput = {
  siteNotificationsEnable: Scalars['Boolean']['input'];
  telegramNotificationsEnable: Scalars['Boolean']['input'];
};

export type ChangeNotificationsSettingsResponse = {
  __typename?: 'ChangeNotificationsSettingsResponse';
  notificationSettings: NotificationSettingsModel;
  telegramToken?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangeProfileInfoInput = {
  displayName: Scalars['String']['input'];
  information: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChangeStreamInfoInput = {
  categoryId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ChatSettingsModel = {
  __typename?: 'ChatSettingsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isChatEnabled: Scalars['Boolean']['output'];
  isChatFollowersOnly: Scalars['Boolean']['output'];
  isChatSubscribersOnly: Scalars['Boolean']['output'];
  streamId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Status of a private chat */
export enum ChatStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type CommentModel = {
  __typename?: 'CommentModel';
  author: UserModel;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  likeCount?: Maybe<Scalars['Float']['output']>;
  likes?: Maybe<Array<LikeModel>>;
  post: PostModel;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ConfirmChangedEmailInput = {
  newEmail: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isPublic?: Scalars['Boolean']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Enable2FaInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type FiltersInput = {
  searchKey?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type FindFollowersInput = {
  orderBy?: InputMaybe<FollowOrderByInput>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FollowModel = {
  __typename?: 'FollowModel';
  createdAt: Scalars['DateTime']['output'];
  follower: UserModel;
  followerId: Scalars['String']['output'];
  following: UserModel;
  followingId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FollowOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type FollowersResponse = {
  __typename?: 'FollowersResponse';
  followers: Array<FollowModel>;
  totalCount: Scalars['Int']['output'];
};

export type FollowingsResponse = {
  __typename?: 'FollowingsResponse';
  followings: Array<FollowModel>;
  totalCount: Scalars['Int']['output'];
};

export type GenerateStreamTokenInput = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type GenerateStreamTokenModel = {
  __typename?: 'GenerateStreamTokenModel';
  token: Scalars['String']['output'];
};

export type LikeModel = {
  __typename?: 'LikeModel';
  comment?: Maybe<CommentModel>;
  commentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post?: Maybe<PostModel>;
  postId?: Maybe<Scalars['String']['output']>;
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type MarkMessagesAsReadInput = {
  chatId: Scalars['ID']['input'];
};

export type MarkMessagesAsReadResponse = {
  __typename?: 'MarkMessagesAsReadResponse';
  count: Scalars['Float']['output'];
  success: Scalars['Boolean']['output'];
};

export type MessageModel = {
  __typename?: 'MessageModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  stream: StreamModel;
  streamId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeChatSettings: Scalars['Boolean']['output'];
  changeEmail: Scalars['Boolean']['output'];
  changeNotificationSettings: ChangeNotificationsSettingsResponse;
  changePassword: Scalars['Boolean']['output'];
  changeProfileAvatar: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  changeStreamInfo: Scalars['Boolean']['output'];
  changeStreamPreview: Scalars['Boolean']['output'];
  clearSessionFromCookie: Scalars['Boolean']['output'];
  confirmChangedEmail: Scalars['Boolean']['output'];
  createComment: CommentModel;
  createIngress: Scalars['Boolean']['output'];
  createPost: PostModel;
  createSocialLink: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  disable2FA: Scalars['Boolean']['output'];
  enable2FA: Scalars['Boolean']['output'];
  followToChannel: Scalars['Boolean']['output'];
  generateStreamToken: GenerateStreamTokenModel;
  login: AuthModel;
  logout: Scalars['Boolean']['output'];
  markMessagesAsRead: MarkMessagesAsReadResponse;
  new_password: Scalars['Boolean']['output'];
  removeProfileAvatar: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  removeStreamPreview: Scalars['Boolean']['output'];
  reorderSocialLinks: Scalars['Boolean']['output'];
  requestChat: PrivateChatModel;
  requestToEmailChange: Scalars['Boolean']['output'];
  reset_password: Scalars['Boolean']['output'];
  sendMessage: MessageModel;
  sendPrivateMessage: PrivateMessageModel;
  toggleLike: Scalars['Boolean']['output'];
  unfollowFromChannel: Scalars['Boolean']['output'];
  updateChatStatus: PrivateChatModel;
  updateComment: CommentModel;
  updatePost: PostModel;
  updateSocialLink: Scalars['Boolean']['output'];
  verifyAccount: AuthModel;
};


export type MutationChangeChatSettingsArgs = {
  data: ChangeChatSettingsInput;
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangeNotificationSettingsArgs = {
  data: ChangeNotificationsSettingsInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};


export type MutationChangeStreamInfoArgs = {
  data: ChangeStreamInfoInput;
};


export type MutationChangeStreamPreviewArgs = {
  preview: Scalars['Upload']['input'];
};


export type MutationConfirmChangedEmailArgs = {
  data: ConfirmChangedEmailInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateIngressArgs = {
  ingressType: Scalars['Float']['input'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationEnable2FaArgs = {
  data: Enable2FaInput;
};


export type MutationFollowToChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationGenerateStreamTokenArgs = {
  data: GenerateStreamTokenInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkMessagesAsReadArgs = {
  input: MarkMessagesAsReadInput;
};


export type MutationNew_PasswordArgs = {
  data: NewPasswordInput;
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSocialLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationReorderSocialLinksArgs = {
  list: Array<SocialLinkOrderInput>;
};


export type MutationRequestChatArgs = {
  input: RequestChatInput;
};


export type MutationReset_PasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendMessageArgs = {
  data: SendMessageInput;
};


export type MutationSendPrivateMessageArgs = {
  input: SendPrivateMessageInput;
};


export type MutationToggleLikeArgs = {
  input: ToggleLikeInput;
};


export type MutationUnfollowFromChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationUpdateChatStatusArgs = {
  input: UpdateChatStatusInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationVerifyAccountArgs = {
  data: VerificationInput;
};

export type NewPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type NotificationSettingsModel = {
  __typename?: 'NotificationSettingsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  siteNotificationsEnable: Scalars['Boolean']['output'];
  telegramNotificationsEnable: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export enum NotificationType {
  EnableTwoFactor = 'ENABLE_TWO_FACTOR',
  NewFollower = 'NEW_FOLLOWER',
  StreamStart = 'STREAM_START'
}

export type PostFiltersInput = {
  followingOnly?: InputMaybe<Scalars['Boolean']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type PostModel = {
  __typename?: 'PostModel';
  author: UserModel;
  authorId: Scalars['String']['output'];
  commentCount?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Array<CommentModel>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  likeCount?: Maybe<Scalars['Float']['output']>;
  likes?: Maybe<Array<LikeModel>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PostSortInput = {
  latestFirst?: InputMaybe<Scalars['Boolean']['input']>;
  mostCommented?: InputMaybe<Scalars['Boolean']['input']>;
  mostLiked?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PrivateChatModel = {
  __typename?: 'PrivateChatModel';
  createdAt: Scalars['DateTime']['output'];
  creator: UserModel;
  creatorId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<PrivateMessageModel>>;
  recipient: UserModel;
  recipientId: Scalars['String']['output'];
  status: ChatStatus;
  unreadCount?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PrivateMessageModel = {
  __typename?: 'PrivateMessageModel';
  chat: PrivateChatModel;
  chatId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  sender: UserModel;
  senderId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllCategories: Array<CategoryModel>;
  findAllLiveStreams: Array<StreamModel>;
  findAllStreams: Array<StreamModel>;
  findCategoryBySlug: CategoryModel;
  findChannelByUsername: UserModel;
  findChannelsContainingUsername: Array<UserModel>;
  findFollowersCountByChannel: Scalars['Float']['output'];
  findFollowingsCountByChannel: Scalars['Float']['output'];
  findMessagesByStream: Array<MessageModel>;
  findMyFollowers: FollowersResponse;
  findMyFollowings: FollowingsResponse;
  findNotificationsByUserId: Array<NotificationModel>;
  findPostById: PostModel;
  findPosts: Array<PostModel>;
  findRandomCategories: Array<CategoryModel>;
  findRandomStreams: Array<StreamModel>;
  findRecommendedChannels: Array<UserModel>;
  findSocialLinks: Array<SocialLinkModel>;
  findStreamById: StreamModel;
  findUnreadNotificationsCount: Scalars['Float']['output'];
  generateTotpSecret: TotpModel;
  getAllSessions: Array<SessionModel>;
  getCurrentSession: SessionModel;
  getProfile: UserModel;
  getSessionsByUser: Array<SessionModel>;
  privateChat: PrivateChatModel;
  privateChats: Array<PrivateChatModel>;
};


export type QueryFindAllLiveStreamsArgs = {
  filters: FiltersInput;
};


export type QueryFindAllStreamsArgs = {
  filters: FiltersInput;
};


export type QueryFindCategoryBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryFindChannelByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindChannelsContainingUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindFollowersCountByChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindFollowingsCountByChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryFindMessagesByStreamArgs = {
  streamId: Scalars['String']['input'];
};


export type QueryFindMyFollowersArgs = {
  data?: InputMaybe<FindFollowersInput>;
};


export type QueryFindMyFollowingsArgs = {
  data?: InputMaybe<FindFollowersInput>;
};


export type QueryFindPostByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<PostSortInput>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryFindStreamByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPrivateChatArgs = {
  id: Scalars['String']['input'];
};

export type RequestChatInput = {
  recipientId: Scalars['ID']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export type SendMessageInput = {
  streamId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type SendPrivateMessageInput = {
  chatId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: SessionMetadataModel;
  userId: Scalars['String']['output'];
};

export type SocialLinkInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SocialLinkModel = {
  __typename?: 'SocialLinkModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SocialLinkOrderInput = {
  id: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

/** Order direction (ascending or descending) */
export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StreamModel = {
  __typename?: 'StreamModel';
  category: CategoryModel;
  categoryId: Scalars['String']['output'];
  chatSettings?: Maybe<ChatSettingsModel>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  ingressId?: Maybe<Scalars['String']['output']>;
  isLive: Scalars['Boolean']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  serverUrl?: Maybe<Scalars['String']['output']>;
  streamKey?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatRequested: PrivateChatModel;
  chatStatusUpdated: PrivateChatModel;
  commentCreated: CommentModel;
  newMessageAdded: MessageModel;
  newNotificationAdded: NotificationModel;
  onChatMessage: PrivateMessageModel;
  postCreated: PostModel;
  privateMessageSent: PrivateMessageModel;
};


export type SubscriptionNewMessageAddedArgs = {
  streamId: Scalars['String']['input'];
};


export type SubscriptionNewNotificationAddedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionOnChatMessageArgs = {
  chatId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ToggleLikeInput = {
  commentId?: InputMaybe<Scalars['ID']['input']>;
  postId?: InputMaybe<Scalars['ID']['input']>;
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type UpdateChatStatusInput = {
  chatId: Scalars['ID']['input'];
  status: ChatStatus;
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followers: Array<FollowModel>;
  followings: Array<FollowModel>;
  id: Scalars['ID']['output'];
  information?: Maybe<Scalars['String']['output']>;
  notificationSettings: NotificationSettingsModel;
  notifications: Array<NotificationModel>;
  password: Scalars['String']['output'];
  role: UserRole;
  socialLinks: Array<SocialLinkModel>;
  stream: StreamModel;
  telegramChatId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userSecurity: UserSecurityModel;
  username: Scalars['String']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Regular = 'REGULAR'
}

export type UserSecurityModel = {
  __typename?: 'UserSecurityModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isTwoFAEnabled: Scalars['Boolean']['output'];
  twoFASecret: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type VerificationInput = {
  token: Scalars['String']['input'];
};

export type FindAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCategoriesQuery = { __typename?: 'Query', findAllCategories: Array<{ __typename?: 'CategoryModel', id: string, title: string, slug: string, previewUrl: string }> };

export type FindCategoryBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type FindCategoryBySlugQuery = { __typename?: 'Query', findCategoryBySlug: { __typename?: 'CategoryModel', id: string, title: string, slug: string, description: string, previewUrl: string, streams: Array<{ __typename?: 'StreamModel', title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> } };

export type FindRandomCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRandomCategoriesQuery = { __typename?: 'Query', findRandomCategories: Array<{ __typename?: 'CategoryModel', id: string, title: string, slug: string, description: string, previewUrl: string, streams: Array<{ __typename?: 'StreamModel', title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> }> };

export type FindChannelByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindChannelByUsernameQuery = { __typename?: 'Query', findChannelByUsername: { __typename?: 'UserModel', id: string, username: string, avatar?: string | null, displayName: string, information?: string | null, stream: { __typename?: 'StreamModel', id: string, title: string, previewUrl?: string | null, isLive: boolean }, socialLinks: Array<{ __typename?: 'SocialLinkModel', id: string, url: string, title: string, userId: string, position: number }> } };

export type FindChannelsContainingUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindChannelsContainingUsernameQuery = { __typename?: 'Query', findChannelsContainingUsername: Array<{ __typename?: 'UserModel', id: string, username: string, avatar?: string | null, displayName: string, information?: string | null, stream: { __typename?: 'StreamModel', id: string, title: string, previewUrl?: string | null, isLive: boolean }, socialLinks: Array<{ __typename?: 'SocialLinkModel', id: string, url: string, title: string, userId: string, position: number }> }> };

export type FindRecommendedChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRecommendedChannelsQuery = { __typename?: 'Query', findRecommendedChannels: Array<{ __typename?: 'UserModel', id: string, username: string, avatar?: string | null, stream: { __typename?: 'StreamModel', previewUrl?: string | null, title: string, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } } }> };

export type ChangeChatSettingsMutationVariables = Exact<{
  data: ChangeChatSettingsInput;
}>;


export type ChangeChatSettingsMutation = { __typename?: 'Mutation', changeChatSettings: boolean };

export type FindMessagesByStreamQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type FindMessagesByStreamQuery = { __typename?: 'Query', findMessagesByStream: Array<{ __typename?: 'MessageModel', id: string, text: string, createdAt: any, user: { __typename?: 'UserModel', id: string, username: string, displayName: string } }> };

export type NewMessageAddedSubscriptionVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type NewMessageAddedSubscription = { __typename?: 'Subscription', newMessageAdded: { __typename?: 'MessageModel', id: string, text: string, createdAt: any, user: { __typename?: 'UserModel', id: string, username: string } } };

export type SendMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MessageModel', id: string, text: string, createdAt: any, user: { __typename?: 'UserModel', id: string, username: string, displayName: string } } };

export type FindFollowersCountByChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindFollowersCountByChannelQuery = { __typename?: 'Query', findFollowersCountByChannel: number };

export type FindFollowingsCountByChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindFollowingsCountByChannelQuery = { __typename?: 'Query', findFollowingsCountByChannel: number };

export type FindMyFollowersQueryVariables = Exact<{
  data: FindFollowersInput;
}>;


export type FindMyFollowersQuery = { __typename?: 'Query', findMyFollowers: { __typename?: 'FollowersResponse', totalCount: number, followers: Array<{ __typename?: 'FollowModel', createdAt: any, follower: { __typename?: 'UserModel', username: string, avatar?: string | null } }> } };

export type FindMyFollowingsQueryVariables = Exact<{
  data: FindFollowersInput;
}>;


export type FindMyFollowingsQuery = { __typename?: 'Query', findMyFollowings: { __typename?: 'FollowingsResponse', totalCount: number, followings: Array<{ __typename?: 'FollowModel', createdAt: any, followingId: string, following: { __typename?: 'UserModel', username: string, avatar?: string | null } }> } };

export type FindMyFollowingsChannelsQueryVariables = Exact<{
  data: FindFollowersInput;
}>;


export type FindMyFollowingsChannelsQuery = { __typename?: 'Query', findMyFollowings: { __typename?: 'FollowingsResponse', totalCount: number, followings: Array<{ __typename?: 'FollowModel', following: { __typename?: 'UserModel', id: string, username: string, avatar?: string | null, stream: { __typename?: 'StreamModel', previewUrl?: string | null, title: string, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } } } }> } };

export type FollowToChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FollowToChannelMutation = { __typename?: 'Mutation', followToChannel: boolean };

export type UnfollowFromChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type UnfollowFromChannelMutation = { __typename?: 'Mutation', unfollowFromChannel: boolean };

export type ChangeNotificationSettingsMutationVariables = Exact<{
  data: ChangeNotificationsSettingsInput;
}>;


export type ChangeNotificationSettingsMutation = { __typename?: 'Mutation', changeNotificationSettings: { __typename?: 'ChangeNotificationsSettingsResponse', telegramToken?: string | null, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotificationsEnable: boolean, telegramNotificationsEnable: boolean } } };

export type FindNotificationsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindNotificationsByUserQuery = { __typename?: 'Query', findNotificationsByUserId: Array<{ __typename?: 'NotificationModel', id: string, message: string, isRead: boolean, type: NotificationType, createdAt: any }> };

export type FindUnreadNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUnreadNotificationsCountQuery = { __typename?: 'Query', findUnreadNotificationsCount: number };

export type ChangeProfileAvatarMutationVariables = Exact<{
  avatar: Scalars['Upload']['input'];
}>;


export type ChangeProfileAvatarMutation = { __typename?: 'Mutation', changeProfileAvatar: boolean };

export type ChangeProfileInformationMutationVariables = Exact<{
  input: ChangeProfileInfoInput;
}>;


export type ChangeProfileInformationMutation = { __typename?: 'Mutation', changeProfileInfo: boolean };

export type CreateSocialLinkMutationVariables = Exact<{
  input: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: boolean };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserModel', id: string, username: string, displayName: string, email: string, avatar?: string | null, information?: string | null, telegramChatId?: string | null, userSecurity: { __typename?: 'UserSecurityModel', isEmailVerified: boolean, isTwoFAEnabled: boolean }, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotificationsEnable: boolean, telegramNotificationsEnable: boolean }, stream: { __typename?: 'StreamModel', title: string, isLive: boolean, serverUrl?: string | null, streamKey?: string | null, categoryId: string, previewUrl?: string | null, category: { __typename?: 'CategoryModel', id: string, title: string, slug: string }, chatSettings?: { __typename?: 'ChatSettingsModel', isChatEnabled: boolean, isChatFollowersOnly: boolean } | null } } };

export type FindSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSocialLinksQuery = { __typename?: 'Query', findSocialLinks: Array<{ __typename?: 'SocialLinkModel', id: string, title: string, position: number, url: string }> };

export type RemoveProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfileAvatarMutation = { __typename?: 'Mutation', removeProfileAvatar: boolean };

export type RemoveSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSocialLinkMutation = { __typename?: 'Mutation', removeSocialLink: boolean };

export type ReorderSocialLinksMutationVariables = Exact<{
  input: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;


export type ReorderSocialLinksMutation = { __typename?: 'Mutation', reorderSocialLinks: boolean };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: SocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { __typename?: 'Mutation', updateSocialLink: boolean };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: boolean };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ConfirmChangedEmailMutationVariables = Exact<{
  data: ConfirmChangedEmailInput;
}>;


export type ConfirmChangedEmailMutation = { __typename?: 'Mutation', confirmChangedEmail: boolean };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type Disable2FaMutationVariables = Exact<{ [key: string]: never; }>;


export type Disable2FaMutation = { __typename?: 'Mutation', disable2FA: boolean };

export type Enable2FaMutationVariables = Exact<{
  data: Enable2FaInput;
}>;


export type Enable2FaMutation = { __typename?: 'Mutation', enable2FA: boolean };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', secret: string, qrcodeUrl: string } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', id: string, username: string, email: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', new_password: boolean };

export type RequestToEmailChangeMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestToEmailChangeMutation = { __typename?: 'Mutation', requestToEmailChange: boolean };

export type PasswordResetMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type PasswordResetMutation = { __typename?: 'Mutation', reset_password: boolean };

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', userSecurity: { __typename?: 'UserSecurityModel', isEmailVerified: boolean } } | null } };

export type ClearSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionMutation = { __typename?: 'Mutation', clearSessionFromCookie: boolean };

export type GetCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentSessionQuery = { __typename?: 'Query', getCurrentSession: { __typename?: 'SessionModel', id: string, userId: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', city: string, country: string, latitude: string, longitude: string } } } };

export type GetSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionsByUserQuery = { __typename?: 'Query', getSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, userId: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', city: string, country: string, latitude: string, longitude: string } } }> };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

export type ChatRequestedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatRequestedSubscription = { __typename?: 'Subscription', chatRequested: { __typename?: 'PrivateChatModel', id: string, status: ChatStatus, creatorId: string, recipientId: string, creator: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, recipient: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type ChatStatusUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatStatusUpdatedSubscription = { __typename?: 'Subscription', chatStatusUpdated: { __typename?: 'PrivateChatModel', id: string, status: ChatStatus, creatorId: string, recipientId: string } };

export type PrivateMessageSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PrivateMessageSentSubscription = { __typename?: 'Subscription', privateMessageSent: { __typename?: 'PrivateMessageModel', id: string, content: string, chatId: string, senderId: string, isRead: boolean, createdAt: any, sender: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type OnChatMessageSubscriptionVariables = Exact<{
  chatId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type OnChatMessageSubscription = { __typename?: 'Subscription', onChatMessage: { __typename?: 'PrivateMessageModel', id: string, content: string, chatId: string, senderId: string, isRead: boolean, createdAt: any, sender: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, postId: string, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostModel', id: string, content: string, imageUrl?: string | null, isPublic: boolean, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type FindPostByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindPostByIdQuery = { __typename?: 'Query', findPostById: { __typename?: 'PostModel', id: string, content: string, imageUrl?: string | null, isPublic: boolean, createdAt: any, updatedAt: any, likeCount?: number | null, commentCount?: number | null, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, comments?: Array<{ __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, likeCount?: number | null, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }> | null } };

export type FindPostsQueryVariables = Exact<{
  filters?: InputMaybe<PostFiltersInput>;
  sort?: InputMaybe<PostSortInput>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;


export type FindPostsQuery = { __typename?: 'Query', findPosts: Array<{ __typename?: 'PostModel', id: string, content: string, imageUrl?: string | null, isPublic: boolean, createdAt: any, updatedAt: any, likeCount?: number | null, commentCount?: number | null, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, likes?: Array<{ __typename?: 'LikeModel', id: string, userId: string, postId?: string | null, createdAt: any }> | null, comments?: Array<{ __typename?: 'CommentModel', id: string, content: string, postId: string, createdAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }> | null }> };

export type GetPrivateChatQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPrivateChatQuery = { __typename?: 'Query', privateChat: { __typename?: 'PrivateChatModel', id: string, creatorId: string, recipientId: string, status: ChatStatus, createdAt: any, updatedAt: any, unreadCount?: number | null, creator: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, recipient: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, messages?: Array<{ __typename?: 'PrivateMessageModel', id: string, content: string, senderId: string, isRead: boolean, createdAt: any, sender: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } }> | null } };

export type GetPrivateChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrivateChatsQuery = { __typename?: 'Query', privateChats: Array<{ __typename?: 'PrivateChatModel', id: string, creatorId: string, recipientId: string, status: ChatStatus, createdAt: any, updatedAt: any, unreadCount?: number | null, creator: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, recipient: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, messages?: Array<{ __typename?: 'PrivateMessageModel', id: string, content: string, senderId: string, isRead: boolean, createdAt: any }> | null }> };

export type MarkMessagesAsReadMutationVariables = Exact<{
  input: MarkMessagesAsReadInput;
}>;


export type MarkMessagesAsReadMutation = { __typename?: 'Mutation', markMessagesAsRead: { __typename?: 'MarkMessagesAsReadResponse', success: boolean, count: number } };

export type PostCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostCreatedSubscription = { __typename?: 'Subscription', postCreated: { __typename?: 'PostModel', id: string, content: string, imageUrl?: string | null, isPublic: boolean, createdAt: any, updatedAt: any, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type CommentCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CommentCreatedSubscription = { __typename?: 'Subscription', commentCreated: { __typename?: 'CommentModel', id: string, content: string, createdAt: any, updatedAt: any, postId: string, author: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, post: { __typename?: 'PostModel', id: string, content: string } } };

export type RequestChatMutationVariables = Exact<{
  input: RequestChatInput;
}>;


export type RequestChatMutation = { __typename?: 'Mutation', requestChat: { __typename?: 'PrivateChatModel', id: string, status: ChatStatus, creatorId: string, recipientId: string, creator: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null }, recipient: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type SendPrivateMessageMutationVariables = Exact<{
  input: SendPrivateMessageInput;
}>;


export type SendPrivateMessageMutation = { __typename?: 'Mutation', sendPrivateMessage: { __typename?: 'PrivateMessageModel', id: string, content: string, chatId: string, senderId: string, isRead: boolean, createdAt: any, sender: { __typename?: 'UserModel', id: string, username: string, displayName: string, avatar?: string | null } } };

export type ToggleLikeMutationVariables = Exact<{
  input: ToggleLikeInput;
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: boolean };

export type UpdateChatStatusMutationVariables = Exact<{
  input: UpdateChatStatusInput;
}>;


export type UpdateChatStatusMutation = { __typename?: 'Mutation', updateChatStatus: { __typename?: 'PrivateChatModel', id: string, status: ChatStatus, creatorId: string, recipientId: string } };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'CommentModel', id: string, content: string } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostModel', id: string, content: string } };

export type ChangeStreamInfoMutationVariables = Exact<{
  data: ChangeStreamInfoInput;
}>;


export type ChangeStreamInfoMutation = { __typename?: 'Mutation', changeStreamInfo: boolean };

export type ChangeStreamPreviewMutationVariables = Exact<{
  preview: Scalars['Upload']['input'];
}>;


export type ChangeStreamPreviewMutation = { __typename?: 'Mutation', changeStreamPreview: boolean };

export type CreateIngressMutationVariables = Exact<{
  ingressType: Scalars['Float']['input'];
}>;


export type CreateIngressMutation = { __typename?: 'Mutation', createIngress: boolean };

export type FindAllLiveStreamsQueryVariables = Exact<{
  filters: FiltersInput;
}>;


export type FindAllLiveStreamsQuery = { __typename?: 'Query', findAllLiveStreams: Array<{ __typename?: 'StreamModel', title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> };

export type FindAllStreamsQueryVariables = Exact<{
  filters: FiltersInput;
}>;


export type FindAllStreamsQuery = { __typename?: 'Query', findAllStreams: Array<{ __typename?: 'StreamModel', title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> };

export type FindRandomStreamsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRandomStreamsQuery = { __typename?: 'Query', findRandomStreams: Array<{ __typename?: 'StreamModel', id: string, title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', id: string, username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> };

export type FindStreamByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindStreamByIdQuery = { __typename?: 'Query', findStreamById: { __typename?: 'StreamModel', id: string, title: string, isLive: boolean } };

export type GenerateStreamTokenMutationVariables = Exact<{
  data: GenerateStreamTokenInput;
}>;


export type GenerateStreamTokenMutation = { __typename?: 'Mutation', generateStreamToken: { __typename?: 'GenerateStreamTokenModel', token: string } };

export type RemoveStreamPreviewMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveStreamPreviewMutation = { __typename?: 'Mutation', removeStreamPreview: boolean };

export type UpdateStreamMutationVariables = Exact<{
  data: ChangeStreamInfoInput;
}>;


export type UpdateStreamMutation = { __typename?: 'Mutation', changeStreamInfo: boolean };


export const FindAllCategoriesDocument = gql`
    query FindAllCategories {
  findAllCategories {
    id
    title
    slug
    previewUrl
  }
}
    `;

/**
 * __useFindAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFindAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
      }
export function useFindAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export function useFindAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export type FindAllCategoriesQueryHookResult = ReturnType<typeof useFindAllCategoriesQuery>;
export type FindAllCategoriesLazyQueryHookResult = ReturnType<typeof useFindAllCategoriesLazyQuery>;
export type FindAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useFindAllCategoriesSuspenseQuery>;
export type FindAllCategoriesQueryResult = Apollo.QueryResult<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>;
export const FindCategoryBySlugDocument = gql`
    query FindCategoryBySlug($slug: String!) {
  findCategoryBySlug(slug: $slug) {
    id
    title
    slug
    description
    previewUrl
    streams {
      title
      previewUrl
      isLive
      user {
        username
        avatar
      }
      category {
        title
        slug
      }
    }
  }
}
    `;

/**
 * __useFindCategoryBySlugQuery__
 *
 * To run a query within a React component, call `useFindCategoryBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFindCategoryBySlugQuery(baseOptions: Apollo.QueryHookOptions<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables> & ({ variables: FindCategoryBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>(FindCategoryBySlugDocument, options);
      }
export function useFindCategoryBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>(FindCategoryBySlugDocument, options);
        }
export function useFindCategoryBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>(FindCategoryBySlugDocument, options);
        }
export type FindCategoryBySlugQueryHookResult = ReturnType<typeof useFindCategoryBySlugQuery>;
export type FindCategoryBySlugLazyQueryHookResult = ReturnType<typeof useFindCategoryBySlugLazyQuery>;
export type FindCategoryBySlugSuspenseQueryHookResult = ReturnType<typeof useFindCategoryBySlugSuspenseQuery>;
export type FindCategoryBySlugQueryResult = Apollo.QueryResult<FindCategoryBySlugQuery, FindCategoryBySlugQueryVariables>;
export const FindRandomCategoriesDocument = gql`
    query FindRandomCategories {
  findRandomCategories {
    id
    title
    slug
    description
    previewUrl
    streams {
      title
      previewUrl
      isLive
      user {
        username
        avatar
      }
      category {
        title
        slug
      }
    }
  }
}
    `;

/**
 * __useFindRandomCategoriesQuery__
 *
 * To run a query within a React component, call `useFindRandomCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRandomCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRandomCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRandomCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>(FindRandomCategoriesDocument, options);
      }
export function useFindRandomCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>(FindRandomCategoriesDocument, options);
        }
export function useFindRandomCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>(FindRandomCategoriesDocument, options);
        }
export type FindRandomCategoriesQueryHookResult = ReturnType<typeof useFindRandomCategoriesQuery>;
export type FindRandomCategoriesLazyQueryHookResult = ReturnType<typeof useFindRandomCategoriesLazyQuery>;
export type FindRandomCategoriesSuspenseQueryHookResult = ReturnType<typeof useFindRandomCategoriesSuspenseQuery>;
export type FindRandomCategoriesQueryResult = Apollo.QueryResult<FindRandomCategoriesQuery, FindRandomCategoriesQueryVariables>;
export const FindChannelByUsernameDocument = gql`
    query FindChannelByUsername($username: String!) {
  findChannelByUsername(username: $username) {
    id
    username
    avatar
    displayName
    information
    stream {
      id
      title
      previewUrl
      isLive
    }
    socialLinks {
      id
      url
      title
      userId
      position
    }
  }
}
    `;

/**
 * __useFindChannelByUsernameQuery__
 *
 * To run a query within a React component, call `useFindChannelByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChannelByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChannelByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindChannelByUsernameQuery(baseOptions: Apollo.QueryHookOptions<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables> & ({ variables: FindChannelByUsernameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>(FindChannelByUsernameDocument, options);
      }
export function useFindChannelByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>(FindChannelByUsernameDocument, options);
        }
export function useFindChannelByUsernameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>(FindChannelByUsernameDocument, options);
        }
export type FindChannelByUsernameQueryHookResult = ReturnType<typeof useFindChannelByUsernameQuery>;
export type FindChannelByUsernameLazyQueryHookResult = ReturnType<typeof useFindChannelByUsernameLazyQuery>;
export type FindChannelByUsernameSuspenseQueryHookResult = ReturnType<typeof useFindChannelByUsernameSuspenseQuery>;
export type FindChannelByUsernameQueryResult = Apollo.QueryResult<FindChannelByUsernameQuery, FindChannelByUsernameQueryVariables>;
export const FindChannelsContainingUsernameDocument = gql`
    query FindChannelsContainingUsername($username: String!) {
  findChannelsContainingUsername(username: $username) {
    id
    username
    avatar
    displayName
    information
    stream {
      id
      title
      previewUrl
      isLive
    }
    socialLinks {
      id
      url
      title
      userId
      position
    }
  }
}
    `;

/**
 * __useFindChannelsContainingUsernameQuery__
 *
 * To run a query within a React component, call `useFindChannelsContainingUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChannelsContainingUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChannelsContainingUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindChannelsContainingUsernameQuery(baseOptions: Apollo.QueryHookOptions<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables> & ({ variables: FindChannelsContainingUsernameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables>(FindChannelsContainingUsernameDocument, options);
      }
export function useFindChannelsContainingUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables>(FindChannelsContainingUsernameDocument, options);
        }
export function useFindChannelsContainingUsernameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables>(FindChannelsContainingUsernameDocument, options);
        }
export type FindChannelsContainingUsernameQueryHookResult = ReturnType<typeof useFindChannelsContainingUsernameQuery>;
export type FindChannelsContainingUsernameLazyQueryHookResult = ReturnType<typeof useFindChannelsContainingUsernameLazyQuery>;
export type FindChannelsContainingUsernameSuspenseQueryHookResult = ReturnType<typeof useFindChannelsContainingUsernameSuspenseQuery>;
export type FindChannelsContainingUsernameQueryResult = Apollo.QueryResult<FindChannelsContainingUsernameQuery, FindChannelsContainingUsernameQueryVariables>;
export const FindRecommendedChannelsDocument = gql`
    query FindRecommendedChannels {
  findRecommendedChannels {
    id
    username
    avatar
    stream {
      previewUrl
      title
      isLive
      user {
        username
        avatar
      }
      category {
        title
        slug
      }
    }
  }
}
    `;

/**
 * __useFindRecommendedChannelsQuery__
 *
 * To run a query within a React component, call `useFindRecommendedChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRecommendedChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRecommendedChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRecommendedChannelsQuery(baseOptions?: Apollo.QueryHookOptions<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>(FindRecommendedChannelsDocument, options);
      }
export function useFindRecommendedChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>(FindRecommendedChannelsDocument, options);
        }
export function useFindRecommendedChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>(FindRecommendedChannelsDocument, options);
        }
export type FindRecommendedChannelsQueryHookResult = ReturnType<typeof useFindRecommendedChannelsQuery>;
export type FindRecommendedChannelsLazyQueryHookResult = ReturnType<typeof useFindRecommendedChannelsLazyQuery>;
export type FindRecommendedChannelsSuspenseQueryHookResult = ReturnType<typeof useFindRecommendedChannelsSuspenseQuery>;
export type FindRecommendedChannelsQueryResult = Apollo.QueryResult<FindRecommendedChannelsQuery, FindRecommendedChannelsQueryVariables>;
export const ChangeChatSettingsDocument = gql`
    mutation ChangeChatSettings($data: ChangeChatSettingsInput!) {
  changeChatSettings(data: $data)
}
    `;
export type ChangeChatSettingsMutationFn = Apollo.MutationFunction<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>;

/**
 * __useChangeChatSettingsMutation__
 *
 * To run a mutation, you first call `useChangeChatSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeChatSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeChatSettingsMutation, { data, loading, error }] = useChangeChatSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeChatSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>(ChangeChatSettingsDocument, options);
      }
export type ChangeChatSettingsMutationHookResult = ReturnType<typeof useChangeChatSettingsMutation>;
export type ChangeChatSettingsMutationResult = Apollo.MutationResult<ChangeChatSettingsMutation>;
export type ChangeChatSettingsMutationOptions = Apollo.BaseMutationOptions<ChangeChatSettingsMutation, ChangeChatSettingsMutationVariables>;
export const FindMessagesByStreamDocument = gql`
    query FindMessagesByStream($streamId: String!) {
  findMessagesByStream(streamId: $streamId) {
    id
    text
    createdAt
    user {
      id
      username
      displayName
    }
  }
}
    `;

/**
 * __useFindMessagesByStreamQuery__
 *
 * To run a query within a React component, call `useFindMessagesByStreamQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMessagesByStreamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMessagesByStreamQuery({
 *   variables: {
 *      streamId: // value for 'streamId'
 *   },
 * });
 */
export function useFindMessagesByStreamQuery(baseOptions: Apollo.QueryHookOptions<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables> & ({ variables: FindMessagesByStreamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables>(FindMessagesByStreamDocument, options);
      }
export function useFindMessagesByStreamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables>(FindMessagesByStreamDocument, options);
        }
export function useFindMessagesByStreamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables>(FindMessagesByStreamDocument, options);
        }
export type FindMessagesByStreamQueryHookResult = ReturnType<typeof useFindMessagesByStreamQuery>;
export type FindMessagesByStreamLazyQueryHookResult = ReturnType<typeof useFindMessagesByStreamLazyQuery>;
export type FindMessagesByStreamSuspenseQueryHookResult = ReturnType<typeof useFindMessagesByStreamSuspenseQuery>;
export type FindMessagesByStreamQueryResult = Apollo.QueryResult<FindMessagesByStreamQuery, FindMessagesByStreamQueryVariables>;
export const NewMessageAddedDocument = gql`
    subscription NewMessageAdded($streamId: String!) {
  newMessageAdded(streamId: $streamId) {
    id
    text
    createdAt
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useNewMessageAddedSubscription__
 *
 * To run a query within a React component, call `useNewMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageAddedSubscription({
 *   variables: {
 *      streamId: // value for 'streamId'
 *   },
 * });
 */
export function useNewMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageAddedSubscription, NewMessageAddedSubscriptionVariables> & ({ variables: NewMessageAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageAddedSubscription, NewMessageAddedSubscriptionVariables>(NewMessageAddedDocument, options);
      }
export type NewMessageAddedSubscriptionHookResult = ReturnType<typeof useNewMessageAddedSubscription>;
export type NewMessageAddedSubscriptionResult = Apollo.SubscriptionResult<NewMessageAddedSubscription>;
export const SendMessageDocument = gql`
    mutation SendMessage($data: SendMessageInput!) {
  sendMessage(data: $data) {
    id
    text
    createdAt
    user {
      id
      username
      displayName
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const FindFollowersCountByChannelDocument = gql`
    query FindFollowersCountByChannel($channelId: String!) {
  findFollowersCountByChannel(channelId: $channelId)
}
    `;

/**
 * __useFindFollowersCountByChannelQuery__
 *
 * To run a query within a React component, call `useFindFollowersCountByChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowersCountByChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowersCountByChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFindFollowersCountByChannelQuery(baseOptions: Apollo.QueryHookOptions<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables> & ({ variables: FindFollowersCountByChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables>(FindFollowersCountByChannelDocument, options);
      }
export function useFindFollowersCountByChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables>(FindFollowersCountByChannelDocument, options);
        }
export function useFindFollowersCountByChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables>(FindFollowersCountByChannelDocument, options);
        }
export type FindFollowersCountByChannelQueryHookResult = ReturnType<typeof useFindFollowersCountByChannelQuery>;
export type FindFollowersCountByChannelLazyQueryHookResult = ReturnType<typeof useFindFollowersCountByChannelLazyQuery>;
export type FindFollowersCountByChannelSuspenseQueryHookResult = ReturnType<typeof useFindFollowersCountByChannelSuspenseQuery>;
export type FindFollowersCountByChannelQueryResult = Apollo.QueryResult<FindFollowersCountByChannelQuery, FindFollowersCountByChannelQueryVariables>;
export const FindFollowingsCountByChannelDocument = gql`
    query FindFollowingsCountByChannel($channelId: String!) {
  findFollowingsCountByChannel(channelId: $channelId)
}
    `;

/**
 * __useFindFollowingsCountByChannelQuery__
 *
 * To run a query within a React component, call `useFindFollowingsCountByChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFollowingsCountByChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFollowingsCountByChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFindFollowingsCountByChannelQuery(baseOptions: Apollo.QueryHookOptions<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables> & ({ variables: FindFollowingsCountByChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables>(FindFollowingsCountByChannelDocument, options);
      }
export function useFindFollowingsCountByChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables>(FindFollowingsCountByChannelDocument, options);
        }
export function useFindFollowingsCountByChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables>(FindFollowingsCountByChannelDocument, options);
        }
export type FindFollowingsCountByChannelQueryHookResult = ReturnType<typeof useFindFollowingsCountByChannelQuery>;
export type FindFollowingsCountByChannelLazyQueryHookResult = ReturnType<typeof useFindFollowingsCountByChannelLazyQuery>;
export type FindFollowingsCountByChannelSuspenseQueryHookResult = ReturnType<typeof useFindFollowingsCountByChannelSuspenseQuery>;
export type FindFollowingsCountByChannelQueryResult = Apollo.QueryResult<FindFollowingsCountByChannelQuery, FindFollowingsCountByChannelQueryVariables>;
export const FindMyFollowersDocument = gql`
    query FindMyFollowers($data: FindFollowersInput!) {
  findMyFollowers(data: $data) {
    followers {
      createdAt
      follower {
        username
        avatar
      }
    }
    totalCount
  }
}
    `;

/**
 * __useFindMyFollowersQuery__
 *
 * To run a query within a React component, call `useFindMyFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindMyFollowersQuery(baseOptions: Apollo.QueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables> & ({ variables: FindMyFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
      }
export function useFindMyFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
        }
export function useFindMyFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
        }
export type FindMyFollowersQueryHookResult = ReturnType<typeof useFindMyFollowersQuery>;
export type FindMyFollowersLazyQueryHookResult = ReturnType<typeof useFindMyFollowersLazyQuery>;
export type FindMyFollowersSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowersSuspenseQuery>;
export type FindMyFollowersQueryResult = Apollo.QueryResult<FindMyFollowersQuery, FindMyFollowersQueryVariables>;
export const FindMyFollowingsDocument = gql`
    query FindMyFollowings($data: FindFollowersInput!) {
  findMyFollowings(data: $data) {
    followings {
      createdAt
      followingId
      following {
        username
        avatar
      }
    }
    totalCount
  }
}
    `;

/**
 * __useFindMyFollowingsQuery__
 *
 * To run a query within a React component, call `useFindMyFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowingsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindMyFollowingsQuery(baseOptions: Apollo.QueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables> & ({ variables: FindMyFollowingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
      }
export function useFindMyFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
        }
export function useFindMyFollowingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
        }
export type FindMyFollowingsQueryHookResult = ReturnType<typeof useFindMyFollowingsQuery>;
export type FindMyFollowingsLazyQueryHookResult = ReturnType<typeof useFindMyFollowingsLazyQuery>;
export type FindMyFollowingsSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowingsSuspenseQuery>;
export type FindMyFollowingsQueryResult = Apollo.QueryResult<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>;
export const FindMyFollowingsChannelsDocument = gql`
    query FindMyFollowingsChannels($data: FindFollowersInput!) {
  findMyFollowings(data: $data) {
    followings {
      following {
        id
        username
        avatar
        stream {
          previewUrl
          title
          isLive
          user {
            username
            avatar
          }
          category {
            title
            slug
          }
        }
      }
    }
    totalCount
  }
}
    `;

/**
 * __useFindMyFollowingsChannelsQuery__
 *
 * To run a query within a React component, call `useFindMyFollowingsChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowingsChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowingsChannelsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindMyFollowingsChannelsQuery(baseOptions: Apollo.QueryHookOptions<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables> & ({ variables: FindMyFollowingsChannelsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables>(FindMyFollowingsChannelsDocument, options);
      }
export function useFindMyFollowingsChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables>(FindMyFollowingsChannelsDocument, options);
        }
export function useFindMyFollowingsChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables>(FindMyFollowingsChannelsDocument, options);
        }
export type FindMyFollowingsChannelsQueryHookResult = ReturnType<typeof useFindMyFollowingsChannelsQuery>;
export type FindMyFollowingsChannelsLazyQueryHookResult = ReturnType<typeof useFindMyFollowingsChannelsLazyQuery>;
export type FindMyFollowingsChannelsSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowingsChannelsSuspenseQuery>;
export type FindMyFollowingsChannelsQueryResult = Apollo.QueryResult<FindMyFollowingsChannelsQuery, FindMyFollowingsChannelsQueryVariables>;
export const FollowToChannelDocument = gql`
    mutation FollowToChannel($channelId: String!) {
  followToChannel(channelId: $channelId)
}
    `;
export type FollowToChannelMutationFn = Apollo.MutationFunction<FollowToChannelMutation, FollowToChannelMutationVariables>;

/**
 * __useFollowToChannelMutation__
 *
 * To run a mutation, you first call `useFollowToChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowToChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followToChannelMutation, { data, loading, error }] = useFollowToChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFollowToChannelMutation(baseOptions?: Apollo.MutationHookOptions<FollowToChannelMutation, FollowToChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowToChannelMutation, FollowToChannelMutationVariables>(FollowToChannelDocument, options);
      }
export type FollowToChannelMutationHookResult = ReturnType<typeof useFollowToChannelMutation>;
export type FollowToChannelMutationResult = Apollo.MutationResult<FollowToChannelMutation>;
export type FollowToChannelMutationOptions = Apollo.BaseMutationOptions<FollowToChannelMutation, FollowToChannelMutationVariables>;
export const UnfollowFromChannelDocument = gql`
    mutation UnfollowFromChannel($channelId: String!) {
  unfollowFromChannel(channelId: $channelId)
}
    `;
export type UnfollowFromChannelMutationFn = Apollo.MutationFunction<UnfollowFromChannelMutation, UnfollowFromChannelMutationVariables>;

/**
 * __useUnfollowFromChannelMutation__
 *
 * To run a mutation, you first call `useUnfollowFromChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowFromChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowFromChannelMutation, { data, loading, error }] = useUnfollowFromChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useUnfollowFromChannelMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowFromChannelMutation, UnfollowFromChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowFromChannelMutation, UnfollowFromChannelMutationVariables>(UnfollowFromChannelDocument, options);
      }
export type UnfollowFromChannelMutationHookResult = ReturnType<typeof useUnfollowFromChannelMutation>;
export type UnfollowFromChannelMutationResult = Apollo.MutationResult<UnfollowFromChannelMutation>;
export type UnfollowFromChannelMutationOptions = Apollo.BaseMutationOptions<UnfollowFromChannelMutation, UnfollowFromChannelMutationVariables>;
export const ChangeNotificationSettingsDocument = gql`
    mutation ChangeNotificationSettings($data: ChangeNotificationsSettingsInput!) {
  changeNotificationSettings(data: $data) {
    notificationSettings {
      siteNotificationsEnable
      telegramNotificationsEnable
    }
    telegramToken
  }
}
    `;
export type ChangeNotificationSettingsMutationFn = Apollo.MutationFunction<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>;

/**
 * __useChangeNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useChangeNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeNotificationSettingsMutation, { data, loading, error }] = useChangeNotificationSettingsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeNotificationSettingsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>(ChangeNotificationSettingsDocument, options);
      }
export type ChangeNotificationSettingsMutationHookResult = ReturnType<typeof useChangeNotificationSettingsMutation>;
export type ChangeNotificationSettingsMutationResult = Apollo.MutationResult<ChangeNotificationSettingsMutation>;
export type ChangeNotificationSettingsMutationOptions = Apollo.BaseMutationOptions<ChangeNotificationSettingsMutation, ChangeNotificationSettingsMutationVariables>;
export const FindNotificationsByUserDocument = gql`
    query FindNotificationsByUser {
  findNotificationsByUserId {
    id
    message
    isRead
    type
    createdAt
  }
}
    `;

/**
 * __useFindNotificationsByUserQuery__
 *
 * To run a query within a React component, call `useFindNotificationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotificationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotificationsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindNotificationsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
      }
export function useFindNotificationsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
export type FindNotificationsByUserQueryHookResult = ReturnType<typeof useFindNotificationsByUserQuery>;
export type FindNotificationsByUserLazyQueryHookResult = ReturnType<typeof useFindNotificationsByUserLazyQuery>;
export type FindNotificationsByUserSuspenseQueryHookResult = ReturnType<typeof useFindNotificationsByUserSuspenseQuery>;
export type FindNotificationsByUserQueryResult = Apollo.QueryResult<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export const FindUnreadNotificationsCountDocument = gql`
    query FindUnreadNotificationsCount {
  findUnreadNotificationsCount
}
    `;

/**
 * __useFindUnreadNotificationsCountQuery__
 *
 * To run a query within a React component, call `useFindUnreadNotificationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUnreadNotificationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUnreadNotificationsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUnreadNotificationsCountQuery(baseOptions?: Apollo.QueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>(FindUnreadNotificationsCountDocument, options);
      }
export function useFindUnreadNotificationsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>(FindUnreadNotificationsCountDocument, options);
        }
export function useFindUnreadNotificationsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>(FindUnreadNotificationsCountDocument, options);
        }
export type FindUnreadNotificationsCountQueryHookResult = ReturnType<typeof useFindUnreadNotificationsCountQuery>;
export type FindUnreadNotificationsCountLazyQueryHookResult = ReturnType<typeof useFindUnreadNotificationsCountLazyQuery>;
export type FindUnreadNotificationsCountSuspenseQueryHookResult = ReturnType<typeof useFindUnreadNotificationsCountSuspenseQuery>;
export type FindUnreadNotificationsCountQueryResult = Apollo.QueryResult<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>;
export const ChangeProfileAvatarDocument = gql`
    mutation ChangeProfileAvatar($avatar: Upload!) {
  changeProfileAvatar(avatar: $avatar)
}
    `;
export type ChangeProfileAvatarMutationFn = Apollo.MutationFunction<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;

/**
 * __useChangeProfileAvatarMutation__
 *
 * To run a mutation, you first call `useChangeProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileAvatarMutation, { data, loading, error }] = useChangeProfileAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useChangeProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>(ChangeProfileAvatarDocument, options);
      }
export type ChangeProfileAvatarMutationHookResult = ReturnType<typeof useChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationResult = Apollo.MutationResult<ChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;
export const ChangeProfileInformationDocument = gql`
    mutation ChangeProfileInformation($input: ChangeProfileInfoInput!) {
  changeProfileInfo(data: $input)
}
    `;
export type ChangeProfileInformationMutationFn = Apollo.MutationFunction<ChangeProfileInformationMutation, ChangeProfileInformationMutationVariables>;

/**
 * __useChangeProfileInformationMutation__
 *
 * To run a mutation, you first call `useChangeProfileInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileInformationMutation, { data, loading, error }] = useChangeProfileInformationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeProfileInformationMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileInformationMutation, ChangeProfileInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileInformationMutation, ChangeProfileInformationMutationVariables>(ChangeProfileInformationDocument, options);
      }
export type ChangeProfileInformationMutationHookResult = ReturnType<typeof useChangeProfileInformationMutation>;
export type ChangeProfileInformationMutationResult = Apollo.MutationResult<ChangeProfileInformationMutation>;
export type ChangeProfileInformationMutationOptions = Apollo.BaseMutationOptions<ChangeProfileInformationMutation, ChangeProfileInformationMutationVariables>;
export const CreateSocialLinkDocument = gql`
    mutation CreateSocialLink($input: SocialLinkInput!) {
  createSocialLink(data: $input)
}
    `;
export type CreateSocialLinkMutationFn = Apollo.MutationFunction<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;

/**
 * __useCreateSocialLinkMutation__
 *
 * To run a mutation, you first call `useCreateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialLinkMutation, { data, loading, error }] = useCreateSocialLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>(CreateSocialLinkDocument, options);
      }
export type CreateSocialLinkMutationHookResult = ReturnType<typeof useCreateSocialLinkMutation>;
export type CreateSocialLinkMutationResult = Apollo.MutationResult<CreateSocialLinkMutation>;
export type CreateSocialLinkMutationOptions = Apollo.BaseMutationOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  getProfile {
    id
    username
    displayName
    email
    avatar
    information
    telegramChatId
    userSecurity {
      isEmailVerified
      isTwoFAEnabled
    }
    notificationSettings {
      siteNotificationsEnable
      telegramNotificationsEnable
    }
    stream {
      title
      isLive
      serverUrl
      streamKey
      categoryId
      category {
        id
        title
        slug
      }
      previewUrl
      chatSettings {
        isChatEnabled
        isChatFollowersOnly
      }
    }
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSocialLinksDocument = gql`
    query FindSocialLinks {
  findSocialLinks {
    id
    title
    position
    url
  }
}
    `;

/**
 * __useFindSocialLinksQuery__
 *
 * To run a query within a React component, call `useFindSocialLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSocialLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSocialLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSocialLinksQuery(baseOptions?: Apollo.QueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
      }
export function useFindSocialLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
        }
export function useFindSocialLinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSocialLinksQuery, FindSocialLinksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSocialLinksQuery, FindSocialLinksQueryVariables>(FindSocialLinksDocument, options);
        }
export type FindSocialLinksQueryHookResult = ReturnType<typeof useFindSocialLinksQuery>;
export type FindSocialLinksLazyQueryHookResult = ReturnType<typeof useFindSocialLinksLazyQuery>;
export type FindSocialLinksSuspenseQueryHookResult = ReturnType<typeof useFindSocialLinksSuspenseQuery>;
export type FindSocialLinksQueryResult = Apollo.QueryResult<FindSocialLinksQuery, FindSocialLinksQueryVariables>;
export const RemoveProfileAvatarDocument = gql`
    mutation RemoveProfileAvatar {
  removeProfileAvatar
}
    `;
export type RemoveProfileAvatarMutationFn = Apollo.MutationFunction<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;

/**
 * __useRemoveProfileAvatarMutation__
 *
 * To run a mutation, you first call `useRemoveProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfileAvatarMutation, { data, loading, error }] = useRemoveProfileAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>(RemoveProfileAvatarDocument, options);
      }
export type RemoveProfileAvatarMutationHookResult = ReturnType<typeof useRemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationResult = Apollo.MutationResult<RemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationOptions = Apollo.BaseMutationOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;
export const RemoveSocialLinkDocument = gql`
    mutation RemoveSocialLink($id: String!) {
  removeSocialLink(id: $id)
}
    `;
export type RemoveSocialLinkMutationFn = Apollo.MutationFunction<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;

/**
 * __useRemoveSocialLinkMutation__
 *
 * To run a mutation, you first call `useRemoveSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSocialLinkMutation, { data, loading, error }] = useRemoveSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>(RemoveSocialLinkDocument, options);
      }
export type RemoveSocialLinkMutationHookResult = ReturnType<typeof useRemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationResult = Apollo.MutationResult<RemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationOptions = Apollo.BaseMutationOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;
export const ReorderSocialLinksDocument = gql`
    mutation ReorderSocialLinks($input: [SocialLinkOrderInput!]!) {
  reorderSocialLinks(list: $input)
}
    `;
export type ReorderSocialLinksMutationFn = Apollo.MutationFunction<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;

/**
 * __useReorderSocialLinksMutation__
 *
 * To run a mutation, you first call `useReorderSocialLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderSocialLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderSocialLinksMutation, { data, loading, error }] = useReorderSocialLinksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReorderSocialLinksMutation(baseOptions?: Apollo.MutationHookOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>(ReorderSocialLinksDocument, options);
      }
export type ReorderSocialLinksMutationHookResult = ReturnType<typeof useReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationResult = Apollo.MutationResult<ReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationOptions = Apollo.BaseMutationOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;
export const UpdateSocialLinkDocument = gql`
    mutation UpdateSocialLink($id: String!, $input: SocialLinkInput!) {
  updateSocialLink(id: $id, data: $input)
}
    `;
export type UpdateSocialLinkMutationFn = Apollo.MutationFunction<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;

/**
 * __useUpdateSocialLinkMutation__
 *
 * To run a mutation, you first call `useUpdateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialLinkMutation, { data, loading, error }] = useUpdateSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>(UpdateSocialLinkDocument, options);
      }
export type UpdateSocialLinkMutationHookResult = ReturnType<typeof useUpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationResult = Apollo.MutationResult<UpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationOptions = Apollo.BaseMutationOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data)
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmChangedEmailDocument = gql`
    mutation ConfirmChangedEmail($data: ConfirmChangedEmailInput!) {
  confirmChangedEmail(data: $data)
}
    `;
export type ConfirmChangedEmailMutationFn = Apollo.MutationFunction<ConfirmChangedEmailMutation, ConfirmChangedEmailMutationVariables>;

/**
 * __useConfirmChangedEmailMutation__
 *
 * To run a mutation, you first call `useConfirmChangedEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmChangedEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmChangedEmailMutation, { data, loading, error }] = useConfirmChangedEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useConfirmChangedEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmChangedEmailMutation, ConfirmChangedEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmChangedEmailMutation, ConfirmChangedEmailMutationVariables>(ConfirmChangedEmailDocument, options);
      }
export type ConfirmChangedEmailMutationHookResult = ReturnType<typeof useConfirmChangedEmailMutation>;
export type ConfirmChangedEmailMutationResult = Apollo.MutationResult<ConfirmChangedEmailMutation>;
export type ConfirmChangedEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmChangedEmailMutation, ConfirmChangedEmailMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const Disable2FaDocument = gql`
    mutation Disable2FA {
  disable2FA
}
    `;
export type Disable2FaMutationFn = Apollo.MutationFunction<Disable2FaMutation, Disable2FaMutationVariables>;

/**
 * __useDisable2FaMutation__
 *
 * To run a mutation, you first call `useDisable2FaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisable2FaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disable2FaMutation, { data, loading, error }] = useDisable2FaMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisable2FaMutation(baseOptions?: Apollo.MutationHookOptions<Disable2FaMutation, Disable2FaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Disable2FaMutation, Disable2FaMutationVariables>(Disable2FaDocument, options);
      }
export type Disable2FaMutationHookResult = ReturnType<typeof useDisable2FaMutation>;
export type Disable2FaMutationResult = Apollo.MutationResult<Disable2FaMutation>;
export type Disable2FaMutationOptions = Apollo.BaseMutationOptions<Disable2FaMutation, Disable2FaMutationVariables>;
export const Enable2FaDocument = gql`
    mutation Enable2FA($data: Enable2FAInput!) {
  enable2FA(data: $data)
}
    `;
export type Enable2FaMutationFn = Apollo.MutationFunction<Enable2FaMutation, Enable2FaMutationVariables>;

/**
 * __useEnable2FaMutation__
 *
 * To run a mutation, you first call `useEnable2FaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnable2FaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enable2FaMutation, { data, loading, error }] = useEnable2FaMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEnable2FaMutation(baseOptions?: Apollo.MutationHookOptions<Enable2FaMutation, Enable2FaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Enable2FaMutation, Enable2FaMutationVariables>(Enable2FaDocument, options);
      }
export type Enable2FaMutationHookResult = ReturnType<typeof useEnable2FaMutation>;
export type Enable2FaMutationResult = Apollo.MutationResult<Enable2FaMutation>;
export type Enable2FaMutationOptions = Apollo.BaseMutationOptions<Enable2FaMutation, Enable2FaMutationVariables>;
export const GenerateTotpSecretDocument = gql`
    query GenerateTotpSecret {
  generateTotpSecret {
    secret
    qrcodeUrl
  }
}
    `;

/**
 * __useGenerateTotpSecretQuery__
 *
 * To run a query within a React component, call `useGenerateTotpSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTotpSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretQuery(baseOptions?: Apollo.QueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
      }
export function useGenerateTotpSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export type GenerateTotpSecretQueryHookResult = ReturnType<typeof useGenerateTotpSecretQuery>;
export type GenerateTotpSecretLazyQueryHookResult = ReturnType<typeof useGenerateTotpSecretLazyQuery>;
export type GenerateTotpSecretSuspenseQueryHookResult = ReturnType<typeof useGenerateTotpSecretSuspenseQuery>;
export type GenerateTotpSecretQueryResult = Apollo.QueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    user {
      id
      username
      email
    }
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logout
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($data: NewPasswordInput!) {
  new_password(data: $data)
}
    `;
export type NewPasswordMutationFn = Apollo.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const RequestToEmailChangeDocument = gql`
    mutation RequestToEmailChange {
  requestToEmailChange
}
    `;
export type RequestToEmailChangeMutationFn = Apollo.MutationFunction<RequestToEmailChangeMutation, RequestToEmailChangeMutationVariables>;

/**
 * __useRequestToEmailChangeMutation__
 *
 * To run a mutation, you first call `useRequestToEmailChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestToEmailChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestToEmailChangeMutation, { data, loading, error }] = useRequestToEmailChangeMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestToEmailChangeMutation(baseOptions?: Apollo.MutationHookOptions<RequestToEmailChangeMutation, RequestToEmailChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestToEmailChangeMutation, RequestToEmailChangeMutationVariables>(RequestToEmailChangeDocument, options);
      }
export type RequestToEmailChangeMutationHookResult = ReturnType<typeof useRequestToEmailChangeMutation>;
export type RequestToEmailChangeMutationResult = Apollo.MutationResult<RequestToEmailChangeMutation>;
export type RequestToEmailChangeMutationOptions = Apollo.BaseMutationOptions<RequestToEmailChangeMutation, RequestToEmailChangeMutationVariables>;
export const PasswordResetDocument = gql`
    mutation PasswordReset($data: ResetPasswordInput!) {
  reset_password(data: $data)
}
    `;
export type PasswordResetMutationFn = Apollo.MutationFunction<PasswordResetMutation, PasswordResetMutationVariables>;

/**
 * __usePasswordResetMutation__
 *
 * To run a mutation, you first call `usePasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordResetMutation, { data, loading, error }] = usePasswordResetMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<PasswordResetMutation, PasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PasswordResetMutation, PasswordResetMutationVariables>(PasswordResetDocument, options);
      }
export type PasswordResetMutationHookResult = ReturnType<typeof usePasswordResetMutation>;
export type PasswordResetMutationResult = Apollo.MutationResult<PasswordResetMutation>;
export type PasswordResetMutationOptions = Apollo.BaseMutationOptions<PasswordResetMutation, PasswordResetMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($data: VerificationInput!) {
  verifyAccount(data: $data) {
    user {
      userSecurity {
        isEmailVerified
      }
    }
    message
  }
}
    `;
export type VerifyAccountMutationFn = Apollo.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const ClearSessionDocument = gql`
    mutation ClearSession {
  clearSessionFromCookie
}
    `;
export type ClearSessionMutationFn = Apollo.MutationFunction<ClearSessionMutation, ClearSessionMutationVariables>;

/**
 * __useClearSessionMutation__
 *
 * To run a mutation, you first call `useClearSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionMutation, { data, loading, error }] = useClearSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionMutation(baseOptions?: Apollo.MutationHookOptions<ClearSessionMutation, ClearSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionMutation, ClearSessionMutationVariables>(ClearSessionDocument, options);
      }
export type ClearSessionMutationHookResult = ReturnType<typeof useClearSessionMutation>;
export type ClearSessionMutationResult = Apollo.MutationResult<ClearSessionMutation>;
export type ClearSessionMutationOptions = Apollo.BaseMutationOptions<ClearSessionMutation, ClearSessionMutationVariables>;
export const GetCurrentSessionDocument = gql`
    query GetCurrentSession {
  getCurrentSession {
    id
    userId
    createdAt
    metadata {
      device {
        browser
        os
        type
      }
      location {
        city
        country
        latitude
        longitude
      }
      ip
    }
  }
}
    `;

/**
 * __useGetCurrentSessionQuery__
 *
 * To run a query within a React component, call `useGetCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>(GetCurrentSessionDocument, options);
      }
export function useGetCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>(GetCurrentSessionDocument, options);
        }
export function useGetCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>(GetCurrentSessionDocument, options);
        }
export type GetCurrentSessionQueryHookResult = ReturnType<typeof useGetCurrentSessionQuery>;
export type GetCurrentSessionLazyQueryHookResult = ReturnType<typeof useGetCurrentSessionLazyQuery>;
export type GetCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useGetCurrentSessionSuspenseQuery>;
export type GetCurrentSessionQueryResult = Apollo.QueryResult<GetCurrentSessionQuery, GetCurrentSessionQueryVariables>;
export const GetSessionsByUserDocument = gql`
    query GetSessionsByUser {
  getSessionsByUser {
    id
    userId
    createdAt
    metadata {
      device {
        browser
        os
        type
      }
      location {
        city
        country
        latitude
        longitude
      }
      ip
    }
  }
}
    `;

/**
 * __useGetSessionsByUserQuery__
 *
 * To run a query within a React component, call `useGetSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>(GetSessionsByUserDocument, options);
      }
export function useGetSessionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>(GetSessionsByUserDocument, options);
        }
export function useGetSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>(GetSessionsByUserDocument, options);
        }
export type GetSessionsByUserQueryHookResult = ReturnType<typeof useGetSessionsByUserQuery>;
export type GetSessionsByUserLazyQueryHookResult = ReturnType<typeof useGetSessionsByUserLazyQuery>;
export type GetSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useGetSessionsByUserSuspenseQuery>;
export type GetSessionsByUserQueryResult = Apollo.QueryResult<GetSessionsByUserQuery, GetSessionsByUserQueryVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id)
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const ChatRequestedDocument = gql`
    subscription ChatRequested {
  chatRequested {
    id
    status
    creatorId
    recipientId
    creator {
      id
      username
      displayName
      avatar
    }
    recipient {
      id
      username
      displayName
      avatar
    }
  }
}
    `;

/**
 * __useChatRequestedSubscription__
 *
 * To run a query within a React component, call `useChatRequestedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatRequestedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRequestedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatRequestedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatRequestedSubscription, ChatRequestedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatRequestedSubscription, ChatRequestedSubscriptionVariables>(ChatRequestedDocument, options);
      }
export type ChatRequestedSubscriptionHookResult = ReturnType<typeof useChatRequestedSubscription>;
export type ChatRequestedSubscriptionResult = Apollo.SubscriptionResult<ChatRequestedSubscription>;
export const ChatStatusUpdatedDocument = gql`
    subscription ChatStatusUpdated {
  chatStatusUpdated {
    id
    status
    creatorId
    recipientId
  }
}
    `;

/**
 * __useChatStatusUpdatedSubscription__
 *
 * To run a query within a React component, call `useChatStatusUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatStatusUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatStatusUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatStatusUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatStatusUpdatedSubscription, ChatStatusUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatStatusUpdatedSubscription, ChatStatusUpdatedSubscriptionVariables>(ChatStatusUpdatedDocument, options);
      }
export type ChatStatusUpdatedSubscriptionHookResult = ReturnType<typeof useChatStatusUpdatedSubscription>;
export type ChatStatusUpdatedSubscriptionResult = Apollo.SubscriptionResult<ChatStatusUpdatedSubscription>;
export const PrivateMessageSentDocument = gql`
    subscription PrivateMessageSent {
  privateMessageSent {
    id
    content
    chatId
    senderId
    isRead
    createdAt
    sender {
      id
      username
      displayName
      avatar
    }
  }
}
    `;

/**
 * __usePrivateMessageSentSubscription__
 *
 * To run a query within a React component, call `usePrivateMessageSentSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePrivateMessageSentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivateMessageSentSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePrivateMessageSentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PrivateMessageSentSubscription, PrivateMessageSentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PrivateMessageSentSubscription, PrivateMessageSentSubscriptionVariables>(PrivateMessageSentDocument, options);
      }
export type PrivateMessageSentSubscriptionHookResult = ReturnType<typeof usePrivateMessageSentSubscription>;
export type PrivateMessageSentSubscriptionResult = Apollo.SubscriptionResult<PrivateMessageSentSubscription>;
export const OnChatMessageDocument = gql`
    subscription OnChatMessage($chatId: String!, $userId: String!) {
  onChatMessage(chatId: $chatId, userId: $userId) {
    id
    content
    chatId
    senderId
    isRead
    createdAt
    sender {
      id
      username
      displayName
      avatar
    }
  }
}
    `;

/**
 * __useOnChatMessageSubscription__
 *
 * To run a query within a React component, call `useOnChatMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnChatMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnChatMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOnChatMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnChatMessageSubscription, OnChatMessageSubscriptionVariables> & ({ variables: OnChatMessageSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnChatMessageSubscription, OnChatMessageSubscriptionVariables>(OnChatMessageDocument, options);
      }
export type OnChatMessageSubscriptionHookResult = ReturnType<typeof useOnChatMessageSubscription>;
export type OnChatMessageSubscriptionResult = Apollo.SubscriptionResult<OnChatMessageSubscription>;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    createdAt
    updatedAt
    author {
      id
      username
      displayName
      avatar
    }
    postId
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    content
    imageUrl
    isPublic
    createdAt
    updatedAt
    author {
      id
      username
      displayName
      avatar
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: String!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const FindPostByIdDocument = gql`
    query FindPostById($id: String!) {
  findPostById(id: $id) {
    id
    content
    imageUrl
    isPublic
    createdAt
    updatedAt
    likeCount
    commentCount
    author {
      id
      username
      displayName
      avatar
    }
    comments {
      id
      content
      createdAt
      updatedAt
      likeCount
      author {
        id
        username
        displayName
        avatar
      }
    }
  }
}
    `;

/**
 * __useFindPostByIdQuery__
 *
 * To run a query within a React component, call `useFindPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindPostByIdQuery(baseOptions: Apollo.QueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables> & ({ variables: FindPostByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
      }
export function useFindPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export function useFindPostByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export type FindPostByIdQueryHookResult = ReturnType<typeof useFindPostByIdQuery>;
export type FindPostByIdLazyQueryHookResult = ReturnType<typeof useFindPostByIdLazyQuery>;
export type FindPostByIdSuspenseQueryHookResult = ReturnType<typeof useFindPostByIdSuspenseQuery>;
export type FindPostByIdQueryResult = Apollo.QueryResult<FindPostByIdQuery, FindPostByIdQueryVariables>;
export const FindPostsDocument = gql`
    query FindPosts($filters: PostFiltersInput, $sort: PostSortInput, $skip: Float, $take: Float) {
  findPosts(filters: $filters, sort: $sort, skip: $skip, take: $take) {
    id
    content
    imageUrl
    isPublic
    createdAt
    updatedAt
    likeCount
    commentCount
    author {
      id
      username
      displayName
      avatar
    }
    likes {
      id
      userId
      postId
      createdAt
    }
    comments {
      id
      content
      postId
      createdAt
      author {
        id
        username
        displayName
        avatar
      }
    }
  }
}
    `;

/**
 * __useFindPostsQuery__
 *
 * To run a query within a React component, call `useFindPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFindPostsQuery(baseOptions?: Apollo.QueryHookOptions<FindPostsQuery, FindPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostsQuery, FindPostsQueryVariables>(FindPostsDocument, options);
      }
export function useFindPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostsQuery, FindPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostsQuery, FindPostsQueryVariables>(FindPostsDocument, options);
        }
export function useFindPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindPostsQuery, FindPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPostsQuery, FindPostsQueryVariables>(FindPostsDocument, options);
        }
export type FindPostsQueryHookResult = ReturnType<typeof useFindPostsQuery>;
export type FindPostsLazyQueryHookResult = ReturnType<typeof useFindPostsLazyQuery>;
export type FindPostsSuspenseQueryHookResult = ReturnType<typeof useFindPostsSuspenseQuery>;
export type FindPostsQueryResult = Apollo.QueryResult<FindPostsQuery, FindPostsQueryVariables>;
export const GetPrivateChatDocument = gql`
    query GetPrivateChat($id: String!) {
  privateChat(id: $id) {
    id
    creatorId
    recipientId
    status
    createdAt
    updatedAt
    unreadCount
    creator {
      id
      username
      displayName
      avatar
    }
    recipient {
      id
      username
      displayName
      avatar
    }
    messages {
      id
      content
      senderId
      isRead
      createdAt
      sender {
        id
        username
        displayName
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetPrivateChatQuery__
 *
 * To run a query within a React component, call `useGetPrivateChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrivateChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrivateChatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPrivateChatQuery(baseOptions: Apollo.QueryHookOptions<GetPrivateChatQuery, GetPrivateChatQueryVariables> & ({ variables: GetPrivateChatQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrivateChatQuery, GetPrivateChatQueryVariables>(GetPrivateChatDocument, options);
      }
export function useGetPrivateChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrivateChatQuery, GetPrivateChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrivateChatQuery, GetPrivateChatQueryVariables>(GetPrivateChatDocument, options);
        }
export function useGetPrivateChatSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPrivateChatQuery, GetPrivateChatQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPrivateChatQuery, GetPrivateChatQueryVariables>(GetPrivateChatDocument, options);
        }
export type GetPrivateChatQueryHookResult = ReturnType<typeof useGetPrivateChatQuery>;
export type GetPrivateChatLazyQueryHookResult = ReturnType<typeof useGetPrivateChatLazyQuery>;
export type GetPrivateChatSuspenseQueryHookResult = ReturnType<typeof useGetPrivateChatSuspenseQuery>;
export type GetPrivateChatQueryResult = Apollo.QueryResult<GetPrivateChatQuery, GetPrivateChatQueryVariables>;
export const GetPrivateChatsDocument = gql`
    query GetPrivateChats {
  privateChats {
    id
    creatorId
    recipientId
    status
    createdAt
    updatedAt
    unreadCount
    creator {
      id
      username
      displayName
      avatar
    }
    recipient {
      id
      username
      displayName
      avatar
    }
    messages {
      id
      content
      senderId
      isRead
      createdAt
    }
  }
}
    `;

/**
 * __useGetPrivateChatsQuery__
 *
 * To run a query within a React component, call `useGetPrivateChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrivateChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrivateChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPrivateChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>(GetPrivateChatsDocument, options);
      }
export function useGetPrivateChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>(GetPrivateChatsDocument, options);
        }
export function useGetPrivateChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>(GetPrivateChatsDocument, options);
        }
export type GetPrivateChatsQueryHookResult = ReturnType<typeof useGetPrivateChatsQuery>;
export type GetPrivateChatsLazyQueryHookResult = ReturnType<typeof useGetPrivateChatsLazyQuery>;
export type GetPrivateChatsSuspenseQueryHookResult = ReturnType<typeof useGetPrivateChatsSuspenseQuery>;
export type GetPrivateChatsQueryResult = Apollo.QueryResult<GetPrivateChatsQuery, GetPrivateChatsQueryVariables>;
export const MarkMessagesAsReadDocument = gql`
    mutation MarkMessagesAsRead($input: MarkMessagesAsReadInput!) {
  markMessagesAsRead(input: $input) {
    success
    count
  }
}
    `;
export type MarkMessagesAsReadMutationFn = Apollo.MutationFunction<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>;

/**
 * __useMarkMessagesAsReadMutation__
 *
 * To run a mutation, you first call `useMarkMessagesAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkMessagesAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markMessagesAsReadMutation, { data, loading, error }] = useMarkMessagesAsReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkMessagesAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>(MarkMessagesAsReadDocument, options);
      }
export type MarkMessagesAsReadMutationHookResult = ReturnType<typeof useMarkMessagesAsReadMutation>;
export type MarkMessagesAsReadMutationResult = Apollo.MutationResult<MarkMessagesAsReadMutation>;
export type MarkMessagesAsReadMutationOptions = Apollo.BaseMutationOptions<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>;
export const PostCreatedDocument = gql`
    subscription PostCreated {
  postCreated {
    id
    content
    imageUrl
    isPublic
    createdAt
    updatedAt
    author {
      id
      username
      displayName
      avatar
    }
  }
}
    `;

/**
 * __usePostCreatedSubscription__
 *
 * To run a query within a React component, call `usePostCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PostCreatedSubscription, PostCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PostCreatedSubscription, PostCreatedSubscriptionVariables>(PostCreatedDocument, options);
      }
export type PostCreatedSubscriptionHookResult = ReturnType<typeof usePostCreatedSubscription>;
export type PostCreatedSubscriptionResult = Apollo.SubscriptionResult<PostCreatedSubscription>;
export const CommentCreatedDocument = gql`
    subscription CommentCreated {
  commentCreated {
    id
    content
    createdAt
    updatedAt
    author {
      id
      username
      displayName
      avatar
    }
    postId
    post {
      id
      content
    }
  }
}
    `;

/**
 * __useCommentCreatedSubscription__
 *
 * To run a query within a React component, call `useCommentCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCommentCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CommentCreatedSubscription, CommentCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CommentCreatedSubscription, CommentCreatedSubscriptionVariables>(CommentCreatedDocument, options);
      }
export type CommentCreatedSubscriptionHookResult = ReturnType<typeof useCommentCreatedSubscription>;
export type CommentCreatedSubscriptionResult = Apollo.SubscriptionResult<CommentCreatedSubscription>;
export const RequestChatDocument = gql`
    mutation RequestChat($input: RequestChatInput!) {
  requestChat(input: $input) {
    id
    status
    creatorId
    recipientId
    creator {
      id
      username
      displayName
      avatar
    }
    recipient {
      id
      username
      displayName
      avatar
    }
  }
}
    `;
export type RequestChatMutationFn = Apollo.MutationFunction<RequestChatMutation, RequestChatMutationVariables>;

/**
 * __useRequestChatMutation__
 *
 * To run a mutation, you first call `useRequestChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestChatMutation, { data, loading, error }] = useRequestChatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestChatMutation(baseOptions?: Apollo.MutationHookOptions<RequestChatMutation, RequestChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestChatMutation, RequestChatMutationVariables>(RequestChatDocument, options);
      }
export type RequestChatMutationHookResult = ReturnType<typeof useRequestChatMutation>;
export type RequestChatMutationResult = Apollo.MutationResult<RequestChatMutation>;
export type RequestChatMutationOptions = Apollo.BaseMutationOptions<RequestChatMutation, RequestChatMutationVariables>;
export const SendPrivateMessageDocument = gql`
    mutation SendPrivateMessage($input: SendPrivateMessageInput!) {
  sendPrivateMessage(input: $input) {
    id
    content
    chatId
    senderId
    isRead
    createdAt
    sender {
      id
      username
      displayName
      avatar
    }
  }
}
    `;
export type SendPrivateMessageMutationFn = Apollo.MutationFunction<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>;

/**
 * __useSendPrivateMessageMutation__
 *
 * To run a mutation, you first call `useSendPrivateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPrivateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPrivateMessageMutation, { data, loading, error }] = useSendPrivateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPrivateMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>(SendPrivateMessageDocument, options);
      }
export type SendPrivateMessageMutationHookResult = ReturnType<typeof useSendPrivateMessageMutation>;
export type SendPrivateMessageMutationResult = Apollo.MutationResult<SendPrivateMessageMutation>;
export type SendPrivateMessageMutationOptions = Apollo.BaseMutationOptions<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation ToggleLike($input: ToggleLikeInput!) {
  toggleLike(input: $input)
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const UpdateChatStatusDocument = gql`
    mutation UpdateChatStatus($input: UpdateChatStatusInput!) {
  updateChatStatus(input: $input) {
    id
    status
    creatorId
    recipientId
  }
}
    `;
export type UpdateChatStatusMutationFn = Apollo.MutationFunction<UpdateChatStatusMutation, UpdateChatStatusMutationVariables>;

/**
 * __useUpdateChatStatusMutation__
 *
 * To run a mutation, you first call `useUpdateChatStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatStatusMutation, { data, loading, error }] = useUpdateChatStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChatStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChatStatusMutation, UpdateChatStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChatStatusMutation, UpdateChatStatusMutationVariables>(UpdateChatStatusDocument, options);
      }
export type UpdateChatStatusMutationHookResult = ReturnType<typeof useUpdateChatStatusMutation>;
export type UpdateChatStatusMutationResult = Apollo.MutationResult<UpdateChatStatusMutation>;
export type UpdateChatStatusMutationOptions = Apollo.BaseMutationOptions<UpdateChatStatusMutation, UpdateChatStatusMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    content
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    content
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const ChangeStreamInfoDocument = gql`
    mutation ChangeStreamInfo($data: ChangeStreamInfoInput!) {
  changeStreamInfo(data: $data)
}
    `;
export type ChangeStreamInfoMutationFn = Apollo.MutationFunction<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>;

/**
 * __useChangeStreamInfoMutation__
 *
 * To run a mutation, you first call `useChangeStreamInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStreamInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStreamInfoMutation, { data, loading, error }] = useChangeStreamInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeStreamInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>(ChangeStreamInfoDocument, options);
      }
export type ChangeStreamInfoMutationHookResult = ReturnType<typeof useChangeStreamInfoMutation>;
export type ChangeStreamInfoMutationResult = Apollo.MutationResult<ChangeStreamInfoMutation>;
export type ChangeStreamInfoMutationOptions = Apollo.BaseMutationOptions<ChangeStreamInfoMutation, ChangeStreamInfoMutationVariables>;
export const ChangeStreamPreviewDocument = gql`
    mutation ChangeStreamPreview($preview: Upload!) {
  changeStreamPreview(preview: $preview)
}
    `;
export type ChangeStreamPreviewMutationFn = Apollo.MutationFunction<ChangeStreamPreviewMutation, ChangeStreamPreviewMutationVariables>;

/**
 * __useChangeStreamPreviewMutation__
 *
 * To run a mutation, you first call `useChangeStreamPreviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStreamPreviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStreamPreviewMutation, { data, loading, error }] = useChangeStreamPreviewMutation({
 *   variables: {
 *      preview: // value for 'preview'
 *   },
 * });
 */
export function useChangeStreamPreviewMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStreamPreviewMutation, ChangeStreamPreviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStreamPreviewMutation, ChangeStreamPreviewMutationVariables>(ChangeStreamPreviewDocument, options);
      }
export type ChangeStreamPreviewMutationHookResult = ReturnType<typeof useChangeStreamPreviewMutation>;
export type ChangeStreamPreviewMutationResult = Apollo.MutationResult<ChangeStreamPreviewMutation>;
export type ChangeStreamPreviewMutationOptions = Apollo.BaseMutationOptions<ChangeStreamPreviewMutation, ChangeStreamPreviewMutationVariables>;
export const CreateIngressDocument = gql`
    mutation CreateIngress($ingressType: Float!) {
  createIngress(ingressType: $ingressType)
}
    `;
export type CreateIngressMutationFn = Apollo.MutationFunction<CreateIngressMutation, CreateIngressMutationVariables>;

/**
 * __useCreateIngressMutation__
 *
 * To run a mutation, you first call `useCreateIngressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIngressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIngressMutation, { data, loading, error }] = useCreateIngressMutation({
 *   variables: {
 *      ingressType: // value for 'ingressType'
 *   },
 * });
 */
export function useCreateIngressMutation(baseOptions?: Apollo.MutationHookOptions<CreateIngressMutation, CreateIngressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIngressMutation, CreateIngressMutationVariables>(CreateIngressDocument, options);
      }
export type CreateIngressMutationHookResult = ReturnType<typeof useCreateIngressMutation>;
export type CreateIngressMutationResult = Apollo.MutationResult<CreateIngressMutation>;
export type CreateIngressMutationOptions = Apollo.BaseMutationOptions<CreateIngressMutation, CreateIngressMutationVariables>;
export const FindAllLiveStreamsDocument = gql`
    query FindAllLiveStreams($filters: FiltersInput!) {
  findAllLiveStreams(filters: $filters) {
    title
    previewUrl
    isLive
    user {
      username
      avatar
    }
    category {
      title
      slug
    }
  }
}
    `;

/**
 * __useFindAllLiveStreamsQuery__
 *
 * To run a query within a React component, call `useFindAllLiveStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllLiveStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllLiveStreamsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFindAllLiveStreamsQuery(baseOptions: Apollo.QueryHookOptions<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables> & ({ variables: FindAllLiveStreamsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables>(FindAllLiveStreamsDocument, options);
      }
export function useFindAllLiveStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables>(FindAllLiveStreamsDocument, options);
        }
export function useFindAllLiveStreamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables>(FindAllLiveStreamsDocument, options);
        }
export type FindAllLiveStreamsQueryHookResult = ReturnType<typeof useFindAllLiveStreamsQuery>;
export type FindAllLiveStreamsLazyQueryHookResult = ReturnType<typeof useFindAllLiveStreamsLazyQuery>;
export type FindAllLiveStreamsSuspenseQueryHookResult = ReturnType<typeof useFindAllLiveStreamsSuspenseQuery>;
export type FindAllLiveStreamsQueryResult = Apollo.QueryResult<FindAllLiveStreamsQuery, FindAllLiveStreamsQueryVariables>;
export const FindAllStreamsDocument = gql`
    query FindAllStreams($filters: FiltersInput!) {
  findAllStreams(filters: $filters) {
    title
    previewUrl
    isLive
    user {
      username
      avatar
    }
    category {
      title
      slug
    }
  }
}
    `;

/**
 * __useFindAllStreamsQuery__
 *
 * To run a query within a React component, call `useFindAllStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllStreamsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFindAllStreamsQuery(baseOptions: Apollo.QueryHookOptions<FindAllStreamsQuery, FindAllStreamsQueryVariables> & ({ variables: FindAllStreamsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllStreamsQuery, FindAllStreamsQueryVariables>(FindAllStreamsDocument, options);
      }
export function useFindAllStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllStreamsQuery, FindAllStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllStreamsQuery, FindAllStreamsQueryVariables>(FindAllStreamsDocument, options);
        }
export function useFindAllStreamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllStreamsQuery, FindAllStreamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllStreamsQuery, FindAllStreamsQueryVariables>(FindAllStreamsDocument, options);
        }
export type FindAllStreamsQueryHookResult = ReturnType<typeof useFindAllStreamsQuery>;
export type FindAllStreamsLazyQueryHookResult = ReturnType<typeof useFindAllStreamsLazyQuery>;
export type FindAllStreamsSuspenseQueryHookResult = ReturnType<typeof useFindAllStreamsSuspenseQuery>;
export type FindAllStreamsQueryResult = Apollo.QueryResult<FindAllStreamsQuery, FindAllStreamsQueryVariables>;
export const FindRandomStreamsDocument = gql`
    query FindRandomStreams {
  findRandomStreams {
    id
    title
    previewUrl
    isLive
    user {
      id
      username
      avatar
    }
    category {
      title
      slug
    }
  }
}
    `;

/**
 * __useFindRandomStreamsQuery__
 *
 * To run a query within a React component, call `useFindRandomStreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRandomStreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRandomStreamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRandomStreamsQuery(baseOptions?: Apollo.QueryHookOptions<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>(FindRandomStreamsDocument, options);
      }
export function useFindRandomStreamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>(FindRandomStreamsDocument, options);
        }
export function useFindRandomStreamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>(FindRandomStreamsDocument, options);
        }
export type FindRandomStreamsQueryHookResult = ReturnType<typeof useFindRandomStreamsQuery>;
export type FindRandomStreamsLazyQueryHookResult = ReturnType<typeof useFindRandomStreamsLazyQuery>;
export type FindRandomStreamsSuspenseQueryHookResult = ReturnType<typeof useFindRandomStreamsSuspenseQuery>;
export type FindRandomStreamsQueryResult = Apollo.QueryResult<FindRandomStreamsQuery, FindRandomStreamsQueryVariables>;
export const FindStreamByIdDocument = gql`
    query FindStreamById($id: String!) {
  findStreamById(id: $id) {
    id
    title
    isLive
  }
}
    `;

/**
 * __useFindStreamByIdQuery__
 *
 * To run a query within a React component, call `useFindStreamByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStreamByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStreamByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindStreamByIdQuery(baseOptions: Apollo.QueryHookOptions<FindStreamByIdQuery, FindStreamByIdQueryVariables> & ({ variables: FindStreamByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStreamByIdQuery, FindStreamByIdQueryVariables>(FindStreamByIdDocument, options);
      }
export function useFindStreamByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStreamByIdQuery, FindStreamByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStreamByIdQuery, FindStreamByIdQueryVariables>(FindStreamByIdDocument, options);
        }
export function useFindStreamByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindStreamByIdQuery, FindStreamByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindStreamByIdQuery, FindStreamByIdQueryVariables>(FindStreamByIdDocument, options);
        }
export type FindStreamByIdQueryHookResult = ReturnType<typeof useFindStreamByIdQuery>;
export type FindStreamByIdLazyQueryHookResult = ReturnType<typeof useFindStreamByIdLazyQuery>;
export type FindStreamByIdSuspenseQueryHookResult = ReturnType<typeof useFindStreamByIdSuspenseQuery>;
export type FindStreamByIdQueryResult = Apollo.QueryResult<FindStreamByIdQuery, FindStreamByIdQueryVariables>;
export const GenerateStreamTokenDocument = gql`
    mutation GenerateStreamToken($data: GenerateStreamTokenInput!) {
  generateStreamToken(data: $data) {
    token
  }
}
    `;
export type GenerateStreamTokenMutationFn = Apollo.MutationFunction<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>;

/**
 * __useGenerateStreamTokenMutation__
 *
 * To run a mutation, you first call `useGenerateStreamTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateStreamTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateStreamTokenMutation, { data, loading, error }] = useGenerateStreamTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGenerateStreamTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>(GenerateStreamTokenDocument, options);
      }
export type GenerateStreamTokenMutationHookResult = ReturnType<typeof useGenerateStreamTokenMutation>;
export type GenerateStreamTokenMutationResult = Apollo.MutationResult<GenerateStreamTokenMutation>;
export type GenerateStreamTokenMutationOptions = Apollo.BaseMutationOptions<GenerateStreamTokenMutation, GenerateStreamTokenMutationVariables>;
export const RemoveStreamPreviewDocument = gql`
    mutation RemoveStreamPreview {
  removeStreamPreview
}
    `;
export type RemoveStreamPreviewMutationFn = Apollo.MutationFunction<RemoveStreamPreviewMutation, RemoveStreamPreviewMutationVariables>;

/**
 * __useRemoveStreamPreviewMutation__
 *
 * To run a mutation, you first call `useRemoveStreamPreviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStreamPreviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStreamPreviewMutation, { data, loading, error }] = useRemoveStreamPreviewMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveStreamPreviewMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStreamPreviewMutation, RemoveStreamPreviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStreamPreviewMutation, RemoveStreamPreviewMutationVariables>(RemoveStreamPreviewDocument, options);
      }
export type RemoveStreamPreviewMutationHookResult = ReturnType<typeof useRemoveStreamPreviewMutation>;
export type RemoveStreamPreviewMutationResult = Apollo.MutationResult<RemoveStreamPreviewMutation>;
export type RemoveStreamPreviewMutationOptions = Apollo.BaseMutationOptions<RemoveStreamPreviewMutation, RemoveStreamPreviewMutationVariables>;
export const UpdateStreamDocument = gql`
    mutation UpdateStream($data: ChangeStreamInfoInput!) {
  changeStreamInfo(data: $data)
}
    `;
export type UpdateStreamMutationFn = Apollo.MutationFunction<UpdateStreamMutation, UpdateStreamMutationVariables>;

/**
 * __useUpdateStreamMutation__
 *
 * To run a mutation, you first call `useUpdateStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStreamMutation, { data, loading, error }] = useUpdateStreamMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateStreamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStreamMutation, UpdateStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStreamMutation, UpdateStreamMutationVariables>(UpdateStreamDocument, options);
      }
export type UpdateStreamMutationHookResult = ReturnType<typeof useUpdateStreamMutation>;
export type UpdateStreamMutationResult = Apollo.MutationResult<UpdateStreamMutation>;
export type UpdateStreamMutationOptions = Apollo.BaseMutationOptions<UpdateStreamMutation, UpdateStreamMutationVariables>;