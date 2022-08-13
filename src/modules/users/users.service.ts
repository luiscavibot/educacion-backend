import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getById(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({
        select: ['id', 'nombre', 'correo', 'proyecto', 'facultad', 'roles'],
        where: { id },
      })
      .then((d) =>
        !userEntity ? d : !!d && userEntity.id === d.id ? d : null,
      );
    if (!user)
      throw new NotFoundException('Usuario no existe o no está autorizado');
    return user;
  }

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

  async editUser(id: number, dto: UpdateUserDto, userEntity?: User) {
    const user = await this.getById(id, userEntity);

    const userEditado = Object.assign(user, dto);
    return await this.userRepository.save(userEditado);
  }

  async deleteUser(id: number, userEntity?: User) {
    const noticia = await this.getById(id, userEntity);
    return await this.userRepository.remove(noticia);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
