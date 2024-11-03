import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactEntity } from './contact.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date | null;

  @Column('varchar')
  role: 'admin' | 'user';

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    cascade: ['insert'],
  })
  contacts: ContactEntity[];
}
