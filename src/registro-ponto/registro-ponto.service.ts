import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroPonto } from './registro-ponto.entity';
import { CreateRegistroPontoDto } from './create-registro-ponto.dto';
import { Funcionario } from '../funcionarios/funcionario.entity';

@Injectable()
export class RegistroPontoService {
  constructor(
    @InjectRepository(RegistroPonto)
    private readonly registroRepo: Repository<RegistroPonto>,

    @InjectRepository(Funcionario)
    private readonly funcionarioRepo: Repository<Funcionario>,
  ) {}

  async create(dto: CreateRegistroPontoDto): Promise<RegistroPonto> {
    // 1. Verifica se o funcionário existe
    const funcionario = await this.funcionarioRepo.findOne({
      where: { id: dto.funcionarioId },
    });

    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    // 2. Valida a data/hora
    const dataHoraEntrada = new Date(dto.data);
    if (isNaN(dataHoraEntrada.getTime())) {
      throw new ConflictException('Formato de data inválido');
    }

    // 3. Cria e persiste o registro
    const novoRegistro = this.registroRepo.create({
      dataHoraEntrada,
      tipoRegistro: dto.metodo,
      latitude: dto.latitude,
      longitude: dto.longitude,
      funcionario, // já é o objeto completo
      observacao: null,
      status: 'NORMAL', // poderia vir do DTO, se desejar personalizar depois
    });

    return await this.registroRepo.save(novoRegistro);
  }
}
