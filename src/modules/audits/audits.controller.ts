import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AuditsService } from './audits.service';
import { UsersService } from '../users';
import { JwtAuthGuard } from '../../guards';

@Controller('audits')
@UseGuards(JwtAuthGuard)
export class AuditsController {
  constructor(
    private readonly auditsService: AuditsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getAllAudits(@Request() req) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const audits = await this.auditsService.findAll({
      user: { id: user.id },
    });

    return { data: audits };
  }

  @Get(':id')
  async getAuditById(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const audit = await this.auditsService.findOne({
      id,
      user: { id: user.id },
    });

    if (!audit) {
      throw new NotFoundException('Audit non trouvé');
    }

    return { data: audit };
  }

  @Post()
  async generateAudit(@Request() req) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const audit = await this.auditsService.generateAudit(user);

    return { data: audit };
  }
}
