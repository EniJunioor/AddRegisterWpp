import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RegistroPontoService } from './registro-ponto.service';
import { CreateRegistroPontoDto } from './create-registro-ponto.dto';
import { RegistroPonto } from './registro-ponto.entity';

@Controller('registro-ponto')
export class RegistroPontoController {
  constructor(private readonly registroPontoService: RegistroPontoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRegistroPontoDto): Promise<RegistroPonto> {
    return this.registroPontoService.create(dto);
  }
}
