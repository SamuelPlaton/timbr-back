import {
  Controller,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuditItemsService } from './audit-items.service';
import { UsersService } from '../users';
import { JwtAuthGuard } from '../../guards';
import { UpdateAuditItemDto } from './audit-items.dto';

@Controller('audit-items')
@UseGuards(JwtAuthGuard)
export class AuditItemsController {
  constructor(
    private readonly auditItemsService: AuditItemsService,
    private readonly usersService: UsersService,
  ) {}

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateAuditItem(
    @Request() req,
    @Param('id') id: string,
    @Body() body: UpdateAuditItemDto,
  ) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const auditItem = await this.auditItemsService.findOne({ id });

    if (!auditItem) {
      throw new NotFoundException('Audit item non trouvé');
    }

    // Check if the audit item belongs to the user's audit
    if (auditItem.audit.user.id !== user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à cet item d'audit");
    }

    const updated = await this.auditItemsService.update(auditItem, body);
    return { data: updated };
  }
}
