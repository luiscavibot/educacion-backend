import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashing } from '../auth/helpers/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const usuarioExiste = await this.userRepository.findOne({
      where: { nombre: createUserDto.nombre },
    });
    if (usuarioExiste)
      throw new BadRequestException('Usuario ya registrado con este nombre');

    createUserDto.password = await Hashing.generate(createUserDto.password);
    const nuevoUsuario = this.userRepository.create(createUserDto);
    return await this.userRepository.save(nuevoUsuario);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(correo: string) {
    return this.userRepository.findOne({
      where: { correo },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
