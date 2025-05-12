import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RegistroPonto } from '../registro-ponto/registro-ponto.entity';

@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  matricula!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cargo!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  departamento!: string;

  @OneToMany(() => RegistroPonto, registro => registro.funcionario)
  registros!: RegistroPonto[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
} 