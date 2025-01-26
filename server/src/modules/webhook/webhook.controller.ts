import { Body, Controller, HttpCode, HttpStatus, Post, Headers, UnauthorizedException } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) { }

  @Post('livekit')
  @HttpCode(HttpStatus.OK)
  public async receiveWebhookLivekit(@Body() body: string, @Headers("Authorization") authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException("Вы не передали заголовок авторизации")
    }
    return this.webhookService.receiveWebhookLivekit(body, authorization)
  }
}
