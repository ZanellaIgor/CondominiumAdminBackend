import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth/const/auth.constants';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  async getDashboardSummary(@Req() req: Request) {
    const user = req[REQUEST_TOKEN_PAYLOAD_KEY];
    return this.dashboardService.getSummary(user);
  }
}
