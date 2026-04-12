import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AuditsService } from './audits.service';
import { UsersService } from '../users';
import { JwtAuthGuard, FeatureGuard, RequireFeature } from '../../guards';
import { Feature } from '../../config/subscription.config';
import { GenerateAuditDto } from './audits.dto';

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
  @UseGuards(FeatureGuard)
  @RequireFeature(Feature.AUDIT_ACCESS)
  async generateAudit(@Request() req, @Body() body: GenerateAuditDto) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });

    // Check monthly audit limit (beyond feature access)
    await this.auditsService.checkAuditEligibility(user.id);

    const audit = await this.auditsService.generateAudit(
      user,
      body.company_information,
    );

    return { data: audit };
  }
}
