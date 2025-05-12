// Correto:
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsEnum, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoRegistro {
  MANUAL = 'MANUAL',
  BIOMETRICO = 'BIOMETRICO',
  APP = 'APP',
  WEB = 'WEB'
}

export enum StatusRegistro {
  NORMAL = 'NORMAL',
  ATRASO = 'ATRASO',
  HORA_EXTRA = 'HORA_EXTRA',
  FALTA = 'FALTA',
  FERIADO = 'FERIADO'
}

export class CreateRegistroPontoDto {
  @IsNotEmpty()
  @IsNumber()
  funcionarioId!: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dataHoraEntrada!: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dataHoraSaida?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;

  @IsOptional()
  @IsEnum(TipoRegistro)
  tipoRegistro?: TipoRegistro = TipoRegistro.MANUAL;

  @IsOptional()
  @IsEnum(StatusRegistro)
  status?: StatusRegistro = StatusRegistro.NORMAL;
} 