import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ContactTypes } from 'src/types/contact-types.enum';

@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ContactTypes })
  type: ContactTypes;

  @Column('varchar')
  value: string;

  @ManyToOne(() => UserEntity, (user) => user.contacts)
  user: UserEntity;
}
