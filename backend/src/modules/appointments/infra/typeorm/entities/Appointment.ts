import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // funcao que retorna qual model que ele devera usar
  @JoinColumn({ name: 'provider_id' }) // qual coluna identificara o prestador deste agendamento
  provider: User;

  @Column()
  user_id: string;

  // um usuario pode agendar N relacionamentos
  // O eager faz um Join entre os usuarios e appointments, o Lazy tambem poderia ser usado no lugar mas é diferente
  @ManyToOne(() => User) // funcao que retorna qual model que ele devera usar
  @JoinColumn({ name: 'user_id' }) // qual coluna identificara o prestador deste agendamento
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
