import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Nonce extends BaseModel {
  @Field(() => Boolean, { description: 'Success of Nonce Generation' })
  success: boolean;

  @Field(() => String, { description: 'Nonce' })
  nonce: string;

  @Field(() => String, { description: 'Address for Nonce' })
  address: string;
}
