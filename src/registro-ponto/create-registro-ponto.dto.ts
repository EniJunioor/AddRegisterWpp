import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsLatitude,
  IsLongitude,
  IsDateString,
} from 'class-validator';

export class CreateRegistroPontoDto {
  @IsDateString({}, { message: 'Data deve estar no formato ISO (ex: 2025-05-12T08:00:00)' })
  data!: string;

  @IsString()
  @IsNotEmpty({ message: 'Método é obrigatório (ex: "manual" ou "app")' })
  metodo!: string;

  @IsLatitude({ message: 'Latitude inválida' })
  latitude!: string;

  @IsLongitude({ message: 'Longitude inválida' })
  longitude!: string;

  @IsNumber({}, { message: 'ID do funcionário deve ser um número' })
  funcionarioId!: number;
}
