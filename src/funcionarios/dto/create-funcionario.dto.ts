import { IsNotEmpty, IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class CreateFuncionarioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nome!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  matricula!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cargo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  departamento?: string;
} 