import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateNonce {
    @Field(() => String)
    @IsNotEmpty()
    @MinLength(20)
    address: string
}