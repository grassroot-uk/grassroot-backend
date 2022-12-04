import { Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

export class CreateFileDto {
  @Field(() => String, { description: 'Metadata of Image' })
  @IsNotEmpty()
  metadata: string;

  @Field(() => String, {description: "Name for the File"})
  @IsNotEmpty()
  name: string;
}
