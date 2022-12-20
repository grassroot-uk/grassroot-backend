import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Category extends BaseModel {
  
  @Field(() => String, { description: 'Name of the Category' })
  name: string;

  @Field(() => String, { description: 'Type of the Category' })
  type: string;
}
