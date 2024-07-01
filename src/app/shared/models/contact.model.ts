import { Expose, Type } from "class-transformer";
import { BaseModel } from "../../core/models/base.model";
import { Default } from "../../core/decorators/default.decorator";

export class ContactModel extends BaseModel {
  @Expose()
  id?: number;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  phone!: string;

  @Expose()
  services: string[];

  @Expose()
  message: string;

}