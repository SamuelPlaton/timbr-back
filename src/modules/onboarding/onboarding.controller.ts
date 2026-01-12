import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateOnboardingDto, UpdateOnboardingDto } from './onboarding.dto';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getOnboarding(@Request() req) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const onboarding = await this.onboardingService.findOne({
      user: { id: user.id },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding non trouvé');
    }

    return { data: onboarding };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createOnboarding(@Request() req, @Body() body: CreateOnboardingDto) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });

    // Check if onboarding already exists
    const existingOnboarding = await this.onboardingService.findOne({
      user: { id: user.id },
    });

    if (existingOnboarding) {
      // Update existing onboarding
      const updated = await this.onboardingService.update(
        existingOnboarding,
        body,
      );
      return { data: updated };
    }

    // Create new onboarding
    const onboarding = await this.onboardingService.create({
      ...body,
      user,
    });

    return { data: onboarding };
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateOnboarding(@Request() req, @Body() body: UpdateOnboardingDto) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const onboarding = await this.onboardingService.findOne({
      user: { id: user.id },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding non trouvé');
    }

    const updated = await this.onboardingService.update(onboarding, body);
    return { data: updated };
  }
}
