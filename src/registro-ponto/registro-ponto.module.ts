import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPonto } from './registro-ponto.entity';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoService } from './registro-ponto.service';
import { Funcionario } from '../funcionarios/funcionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroPonto, Funcionario])],
  controllers: [RegistroPontoController],
  providers: [RegistroPontoService],
})
export class RegistroPontoModule {}
