import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    if (!query || query.length < 3) {
      throw new BadRequestException(
        'Le SIREN/SIRET doit contenir au moins 3 caractères',
      );
    }

    const company = await this.companyService.searchCompany(query);
    return { data: company };
  }
}
