import {
  Exclude,
  Expose
} from "class-transformer";
import {
  DTO,
  METHOD
} from "./base.dto";
import {
  IsString,
} from "class-validator";

import { UserResponseDto } from "./user.dto";

@Exclude()
export class AuthResponSeDto {
  @Expose()
  @IsString()
  public api_token!: string

  @Expose()
  public user!: UserResponseDto;
}


export class SignInUserDto extends DTO {
  public static url = "auth/sign_in";

  public readonly responseDTOClass = AuthResponSeDto;

  public readonly url: string = SignInUserDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;

  constructor(public bodyDTO: undefined) {
    super();
  }
}
