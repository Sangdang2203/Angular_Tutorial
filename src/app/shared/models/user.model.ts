import { Expose, Type } from "class-transformer";
import { Default } from "../../core/decorators/default.decorator";
import { BaseModel } from "../../core/models/base.model";
import 'reflect-metadata';
import { EmailValidator } from "@angular/forms";

export class UserProfileModel {
    @Expose()
    designation: string;
}

export class UserModel extends BaseModel {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    email!: string;

    @Expose()
    password!: string;

    @Expose()
    avatar: string;

    @Expose()
    token: string;

    @Expose()
    @Type(() => UserProfileModel)
    profile: UserProfileModel;

}