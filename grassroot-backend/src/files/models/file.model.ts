import 'reflect-metadata';
import {
  ObjectType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class File extends BaseModel {
  @Field()
  uploadedIPFS: boolean;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => String)
  metadataUrl: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => String)
  resolver: string;
}
