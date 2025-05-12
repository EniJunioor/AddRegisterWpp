import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { RegistroPonto } from '../registro-ponto/registro-ponto.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionariosRepository: Repository<Funcionario>,

    @InjectRepository(RegistroPonto)
    private registroRepo: Repository<RegistroPonto>,
  ) {}

  async findAll(nome?: string, identificador?: string, valor?: string): Promise<Funcionario[]> {
    const where: any = {};

    if (nome) {
      where.nome = Like(`%${nome}%`);
    }

    if (identificador && valor) {
      if (['email', 'matricula', 'departamento', 'cargo'].includes(identificador)) {
        where[identificador] = valor;
      } else {
        throw new ConflictException('Identificador inválido');
      }
    }

    return this.funcionariosRepository.find({ 
      where, 
      relations: ['registros'],
      order: {
        nome: 'ASC'
      }
    });
  }

  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const existingFuncionario = await this.funcionariosRepository.findOne({
      where: [
        { email: createFuncionarioDto.email },
        { matricula: createFuncionarioDto.matricula }
      ]
    });

    if (existingFuncionario) {
      throw new ConflictException('Já existe um funcionário com este email ou matrícula');
    }

    const newFuncionario = this.funcionariosRepository.create(createFuncionarioDto);
    return this.funcionariosRepository.save(newFuncionario);
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionariosRepository.findOne({
      where: { id },
      relations: ['registros']
    });

    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }

    return funcionario;
  }

  async findByEmail(email: string): Promise<Funcionario> {
    const funcionario = await this.funcionariosRepository.findOne({
      where: { email }
    });

    if (!funcionario) {
      throw new NotFoundException(`Funcionário com email ${email} não encontrado`);
    }

    return funcionario;
  }

  async findByMatricula(matricula: string): Promise<Funcionario> {
    const funcionario = await this.funcionariosRepository.findOne({
      where: { matricula }
    });

    if (!funcionario) {
      throw new NotFoundException(`Funcionário com matrícula ${matricula} não encontrado`);
    }

    return funcionario;
  }

  async update(id: number, updateFuncionarioDto: Partial<CreateFuncionarioDto>): Promise<Funcionario> {
    const existingFuncionario = await this.findOne(id);

    if (updateFuncionarioDto.email || updateFuncionarioDto.matricula) {
      const duplicateCheck = await this.funcionariosRepository.findOne({
        where: [
          { email: updateFuncionarioDto.email },
          { matricula: updateFuncionarioDto.matricula }
        ]
      });

      if (duplicateCheck && duplicateCheck.id !== id) {
        throw new ConflictException('Já existe um funcionário com este email ou matrícula');
      }
    }

    Object.assign(existingFuncionario, updateFuncionarioDto);
    return this.funcionariosRepository.save(existingFuncionario);
  }

  async remove(id: number): Promise<void> {
    const funcionario = await this.findOne(id);
    await this.funcionariosRepository.remove(funcionario);
  }

  async findByDepartamento(departamento: string): Promise<Funcionario[]> {
    return this.funcionariosRepository.find({
      where: { departamento },
      order: {
        nome: 'ASC'
      }
    });
  }

  async findByCargo(cargo: string): Promise<Funcionario[]> {
    return this.funcionariosRepository.find({
      where: { cargo },
      order: {
        nome: 'ASC'
      }
    });
  }

  async countByDepartamento(): Promise<{ departamento: string; total: number }[]> {
    const funcionarios = await this.funcionariosRepository.find();
    const countByDept = funcionarios.reduce((acc, curr) => {
      const dept = curr.departamento || 'Sem departamento';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(countByDept).map(([departamento, total]) => ({
      departamento,
      total
    }));
  }

  async registrarPonto(id: number): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }

    const registro = this.registroRepo.create({
      dataHoraEntrada: new Date(),
      tipoRegistro: 'MANUAL',
      status: 'NORMAL',
      funcionario
    });

    await this.registroRepo.save(registro);
    return this.findOne(id);
  }
}

