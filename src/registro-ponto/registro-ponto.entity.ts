import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionario } from '../funcionarios/funcionario.entity';

@Entity('registro_ponto')
export class RegistroPonto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'funcionario_id' })
  funcionarioId!: number;

  @ManyToOne(() => Funcionario, { eager: true }) // eager se quiser carregar o funcionário automaticamente
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;

  @Column({ type: 'timestamp', name: 'data_hora_entrada' })
  dataHoraEntrada!: Date;

  @Column({ type: 'timestamp', name: 'data_hora_saida', nullable: true })
  dataHoraSaida!: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  latitude!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  longitude!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacao!: string | null;

  @Column({ type: 'varchar', length: 50, default: 'MANUAL' })
  tipoRegistro!: string; // MANUAL, APP, BIOMETRICO, etc.

  @Column({ type: 'varchar', length: 50, default: 'NORMAL' })
  status!: string; // NORMAL, ATRASO, HORA_EXTRA, etc.

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
