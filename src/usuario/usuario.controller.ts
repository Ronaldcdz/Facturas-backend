import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import type { Request } from 'express';
import { Usuario } from './entities/usuario.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/auth/enums/role.enum';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('usuario')
@Roles(Rol.Usuario)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    const { id } = req.user as Usuario;
    return this.usuarioService.findOne(id);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  // @Roles(Rol.Admin)
  // @UseGuards(RoleGuard)
  // @UseGuards(JwtGuard)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
