import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPontoController } from 'src/registro-ponto/registro-ponto.controller';
import { RegistroPontoService } from 'src/registro-ponto/registro-ponto.service';
import { RegistroPonto } from 'src/registro-ponto/registro-ponto.entity';
import { Funcionario } from 'src/funcionarios/funcionario.entity';
import { RegistroPontoModule } from 'src/registro-ponto/registro-ponto.module';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'meu-postgres',
      port: 5432,
      username: 'postgres',
      password: 'iddd',
      database: 'api_ponto',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FuncionariosModule,
    RegistroPontoModule,
  ],
})
export class AppModule {}
