import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionariosController } from './funcionarios.controller';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from './funcionario.entity';
import { RegistroPonto } from '../registro-ponto/registro-ponto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario, RegistroPonto])],
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})
export class FuncionariosModule {}