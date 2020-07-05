import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
