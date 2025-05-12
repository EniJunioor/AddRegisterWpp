import { Body, Controller, Get, Post, Query, Res, Param, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto'; // Corrija o caminho aqui
import { gerarPdfFuncionario } from '../helpers/pdf.helper';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly service: FuncionariosService) {}

  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('identificador') identificador?: string,
    @Query('valor') valor?: string,
  ) {
    return this.service.findAll(nome, identificador, valor);
  }

  @Post()
  create(@Body() dto: CreateFuncionarioDto) {
    return this.service.create(dto);
  }

  @Get(':id/pdf')
  async gerarPdf(@Param('id') id: string, @Res() res: Response) {
    const funcionario = await this.service.findOne(Number(id)); // Use findOne aqui
    if (!funcionario) throw new NotFoundException('Funcionário não encontrado');

    gerarPdfFuncionario(funcionario, res);
  }

  @Post(':id/registrar-ponto')
  async registrarPonto(@Param('id') id: string, @Res() res: Response) {
    const funcionario = await this.service.registrarPonto(Number(id));
    if (!funcionario) throw new NotFoundException('Funcionário não encontrado');
    gerarPdfFuncionario(funcionario, res);
  }
}
