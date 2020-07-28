import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // funcao que retorna qual model que ele devera usar
  @JoinColumn({ name: 'provider_id' }) // qual coluna identificara o prestador deste agendamento
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Appointment;
