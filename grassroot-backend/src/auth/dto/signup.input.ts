import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field({nullable: true})
  email: string;

  @Field()
  @IsNotEmpty()
  address: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field(()=> String)
  @IsNotEmpty()
  signature: string;
}
