import {
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) throw new BadRequestException('Email and password are required')
    return this.authService.signup(email, password)
  }

  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) throw new BadRequestException('Email and password are required')
    return this.authService.signin(email, password)
  }
}