import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, BaseEntity } from 'typeorm';
import { hash } from 'bcrypt';

@Entity('user', { schema: "user" })
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({select: false})
  mypassword: string;	

  @Column({ select: false })
  secret2fa: string;

  @Column()
  status: number;

  @BeforeInsert()
  async hashPassword() {
    this.mypassword = await hash(this.mypassword, parseInt(process.env.ROUNDS_SECURITY));
  }
}
