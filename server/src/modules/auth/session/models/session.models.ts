import { DeviceInfo, LocationInfo, SessionMetadata } from "@/src/shared/types/session-metada.types";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LocationModel implements LocationInfo {
    @Field(() => String)
    country: string;

    @Field(() => String)
    city: string;

    @Field(() => String)
    latitude: number;

    @Field(() => String)
    longitude: number;
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
    @Field(() => String)
    browser: string;

    @Field(() => String)
    os: string;

    @Field(() => String)
    type: string;
}

@ObjectType()
export class SessionMetadataModel implements SessionMetadata {

    @Field(() => LocationModel)
    location: LocationModel;

    @Field(() => DeviceModel)
    device: DeviceModel;

    @Field(() => String)
    ip: string;

}

@ObjectType()
export class SessionModel {
    @Field(() => ID)
    public id: string

    @Field(() => String)
    public userId: string

    @Field(() => String)
    public createdAt: string

    @Field(() => SessionMetadataModel)
    public metadata: SessionMetadataModel
}