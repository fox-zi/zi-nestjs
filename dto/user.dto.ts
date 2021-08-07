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
  Matches
} from "class-validator";
import {
  EMAIL_REGEXP
} from "business/user";

@Exclude()
export class RegisterUserBodyDto {
  @Expose()
  @IsString()
  public password!: string;

  @IsString()
  @Expose()
  public first_name: string;

  @IsString()
  @Expose()
  public last_name: string;

  @Matches(EMAIL_REGEXP, {
    message: 'Email invalid'
  })
  @Expose()
  public email!: string;
}

@Exclude()
export class UserResponseDto {
  @Expose()
  @IsString()
  public password!: string;

  @IsString()
  @Expose()
  public first_name: string;

  @IsString()
  @Expose()
  public last_name: string;

  @Matches(EMAIL_REGEXP, {
    message: 'Email invalid'
  })
  @Expose()
  public email!: string;
}

export class RegisterUserDto extends DTO {
  public static url = "auth/sign_up";

  public readonly responseDTOClass = UserResponseDto;

  public readonly url: string = RegisterUserDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;

  constructor(public bodyDTO: RegisterUserBodyDto) {
    super();
  }
}
