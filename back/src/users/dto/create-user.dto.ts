import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    readonly email: string;
    @ApiProperty({example: '123435454', description: 'Пароль'})
    readonly password: string;
}