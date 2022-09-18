import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto

    const user = new User()
    user.username = username
    user.password = password
    user.email = email
    user.is_admin = 1

    return this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email } = updateUserDto

    return this.userRepository.update({ id }, { username, password, email })
  }

  async remove(id: number) {
    return this.userRepository.delete({
      id
    })
  }

  async checkAdmin(id: number) {
    return this.userRepository.findOne({
      where: { id, is_admin: 1 }
    })
  }
}
