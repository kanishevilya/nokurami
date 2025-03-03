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

export type ConfirmChangedEmailInput = {
  newEmail: Scalars['String']['input'];
  token: Scalars['String']['input'];
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
  createIngress: Scalars['Boolean']['output'];
  createSocialLink: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  disable2FA: Scalars['Boolean']['output'];
  enable2FA: Scalars['Boolean']['output'];
  followToChannel: Scalars['Boolean']['output'];
  generateStreamToken: GenerateStreamTokenModel;
  login: AuthModel;
  logout: Scalars['Boolean']['output'];
  new_password: Scalars['Boolean']['output'];
  removeProfileAvatar: Scalars['Boolean']['output'];
  removeSession: Scalars['Boolean']['output'];
  removeSocialLink: Scalars['Boolean']['output'];
  removeStreamPreview: Scalars['Boolean']['output'];
  reorderSocialLinks: Scalars['Boolean']['output'];
  requestToEmailChange: Scalars['Boolean']['output'];
  reset_password: Scalars['Boolean']['output'];
  sendMessage: MessageModel;
  unfollowFromChannel: Scalars['Boolean']['output'];
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


export type MutationCreateIngressArgs = {
  ingressType: Scalars['Float']['input'];
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
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


export type MutationReset_PasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendMessageArgs = {
  data: SendMessageInput;
};


export type MutationUnfollowFromChannelArgs = {
  channelId: Scalars['String']['input'];
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

export type Query = {
  __typename?: 'Query';
  findAllCategories: Array<CategoryModel>;
  findAllLiveStreams: Array<StreamModel>;
  findAllStreams: Array<StreamModel>;
  findCategoryBySlug: CategoryModel;
  findChannelByUsername: UserModel;
  findFollowersCountByChannel: Scalars['Float']['output'];
  findFollowingsCountByChannel: Scalars['Float']['output'];
  findMessagesByStream: Array<MessageModel>;
  findMyFollowers: FollowersResponse;
  findMyFollowings: FollowingsResponse;
  findNotificationsByUserId: Array<NotificationModel>;
  findRandomCategories: Array<CategoryModel>;
  findRandomStreams: Array<StreamModel>;
  findRecommendedChannels: Array<UserModel>;
  findSocialLinks: Array<SocialLinkModel>;
  findUnreadNotificationsCount: Scalars['Float']['output'];
  generateTotpSecret: TotpModel;
  getAllSessions: Array<SessionModel>;
  getCurrentSession: SessionModel;
  getProfile: UserModel;
  getSessionsByUser: Array<SessionModel>;
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

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export type SendMessageInput = {
  streamId: Scalars['String']['input'];
  text: Scalars['String']['input'];
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
  newMessageAdded: MessageModel;
  newNotificationAdded: NotificationModel;
};


export type SubscriptionNewMessageAddedArgs = {
  streamId: Scalars['String']['input'];
};


export type SubscriptionNewNotificationAddedArgs = {
  userId: Scalars['String']['input'];
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
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


export type FindAllCategoriesQuery = { __typename?: 'Query', findAllCategories: Array<{ __typename?: 'CategoryModel', id: string, title: string, slug: string, description: string, previewUrl: string, streams: Array<{ __typename?: 'StreamModel', title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> }> };

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

export type FindFollowersCountByChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindFollowersCountByChannelQuery = { __typename?: 'Query', findFollowersCountByChannel: number };

export type FindFollowingsCountByChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type FindFollowingsCountByChannelQuery = { __typename?: 'Query', findFollowingsCountByChannel: number };

export type FindMyFollowingsChannelsQueryVariables = Exact<{
  data: FindFollowersInput;
}>;


export type FindMyFollowingsChannelsQuery = { __typename?: 'Query', findMyFollowings: { __typename?: 'FollowingsResponse', totalCount: number, followings: Array<{ __typename?: 'FollowModel', following: { __typename?: 'UserModel', id: string, username: string, avatar?: string | null, stream: { __typename?: 'StreamModel', previewUrl?: string | null, title: string, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } } } }> } };

export type FindRecommendedChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRecommendedChannelsQuery = { __typename?: 'Query', findRecommendedChannels: Array<{ __typename?: 'UserModel', id: string, username: string, avatar?: string | null, stream: { __typename?: 'StreamModel', previewUrl?: string | null, title: string, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } } }> };

export type FindMessagesByStreamQueryVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type FindMessagesByStreamQuery = { __typename?: 'Query', findMessagesByStream: Array<{ __typename?: 'MessageModel', id: string, text: string, createdAt: any, user: { __typename?: 'UserModel', id: string, username: string, displayName: string } }> };

export type NewMessageAddedSubscriptionVariables = Exact<{
  streamId: Scalars['String']['input'];
}>;


export type NewMessageAddedSubscription = { __typename?: 'Subscription', newMessageAdded: { __typename?: 'MessageModel', text: string, createdAt: any, user: { __typename?: 'UserModel', username: string } } };

export type SendMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MessageModel', id: string, text: string, createdAt: any, user: { __typename?: 'UserModel', id: string, username: string, displayName: string } } };

export type FindMyFollowersQueryVariables = Exact<{
  data: FindFollowersInput;
}>;


export type FindMyFollowersQuery = { __typename?: 'Query', findMyFollowers: { __typename?: 'FollowersResponse', totalCount: number, followers: Array<{ __typename?: 'FollowModel', createdAt: any, follower: { __typename?: 'UserModel', username: string, avatar?: string | null } }> } };

export type FindMyFollowingsQueryVariables = Exact<{
  data: FindFollowersInput;
}>;


export type FindMyFollowingsQuery = { __typename?: 'Query', findMyFollowings: { __typename?: 'FollowingsResponse', totalCount: number, followings: Array<{ __typename?: 'FollowModel', createdAt: any, followingId: string, following: { __typename?: 'UserModel', username: string, avatar?: string | null } }> } };

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

export type ChangeProfileInformationMutationVariables = Exact<{
  input: ChangeProfileInfoInput;
}>;


export type ChangeProfileInformationMutation = { __typename?: 'Mutation', changeProfileInfo: boolean };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserModel', id: string, username: string, displayName: string, email: string, avatar?: string | null, information?: string | null, telegramChatId?: string | null, userSecurity: { __typename?: 'UserSecurityModel', isEmailVerified: boolean, isTwoFAEnabled: boolean }, notificationSettings: { __typename?: 'NotificationSettingsModel', siteNotificationsEnable: boolean, telegramNotificationsEnable: boolean }, stream: { __typename?: 'StreamModel', title: string, isLive: boolean, serverUrl?: string | null, streamKey?: string | null, chatSettings?: { __typename?: 'ChatSettingsModel', isChatEnabled: boolean, isChatFollowersOnly: boolean } | null } } };

export type ChangeProfileAvatarMutationVariables = Exact<{
  avatar: Scalars['Upload']['input'];
}>;


export type ChangeProfileAvatarMutation = { __typename?: 'Mutation', changeProfileAvatar: boolean };

export type RemoveProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfileAvatarMutation = { __typename?: 'Mutation', removeProfileAvatar: boolean };

export type CreateSocialLinkMutationVariables = Exact<{
  input: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: boolean };

export type FindSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSocialLinksQuery = { __typename?: 'Query', findSocialLinks: Array<{ __typename?: 'SocialLinkModel', id: string, title: string, position: number, url: string }> };

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

export type Disable2FaMutationVariables = Exact<{ [key: string]: never; }>;


export type Disable2FaMutation = { __typename?: 'Mutation', disable2FA: boolean };

export type Enable2FaMutationVariables = Exact<{
  data: Enable2FaInput;
}>;


export type Enable2FaMutation = { __typename?: 'Mutation', enable2FA: boolean };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', secret: string, qrcodeUrl: string } };

export type RequestToEmailChangeMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestToEmailChangeMutation = { __typename?: 'Mutation', requestToEmailChange: boolean };

export type ClearSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionMutation = { __typename?: 'Mutation', clearSessionFromCookie: boolean };

export type GetCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentSessionQuery = { __typename?: 'Query', getCurrentSession: { __typename?: 'SessionModel', id: string, userId: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', city: string, country: string, latitude: string, longitude: string } } } };

export type GetSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionsByUserQuery = { __typename?: 'Query', getSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, userId: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', city: string, country: string, latitude: string, longitude: string } } }> };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', id: string, username: string, email: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout: boolean };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: boolean };

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


export type FindRandomStreamsQuery = { __typename?: 'Query', findRandomStreams: Array<{ __typename?: 'StreamModel', title: string, previewUrl?: string | null, isLive: boolean, user: { __typename?: 'UserModel', username: string, avatar?: string | null }, category: { __typename?: 'CategoryModel', title: string, slug: string } }> };

export type GenerateStreamTokenMutationVariables = Exact<{
  data: GenerateStreamTokenInput;
}>;


export type GenerateStreamTokenMutation = { __typename?: 'Mutation', generateStreamToken: { __typename?: 'GenerateStreamTokenModel', token: string } };

export type ChangeChatSettingsMutationVariables = Exact<{
  data: ChangeChatSettingsInput;
}>;


export type ChangeChatSettingsMutation = { __typename?: 'Mutation', changeChatSettings: boolean };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', new_password: boolean };

export type PasswordResetMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type PasswordResetMutation = { __typename?: 'Mutation', reset_password: boolean };

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', userSecurity: { __typename?: 'UserSecurityModel', isEmailVerified: boolean } } | null } };


export const FindAllCategoriesDocument = gql`
    query FindAllCategories {
  findAllCategories {
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
    text
    createdAt
    user {
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