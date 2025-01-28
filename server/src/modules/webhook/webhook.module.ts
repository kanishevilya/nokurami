import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { RawBodyMiddleware } from '@/src/shared/middlewares/raw-body.middleware';
import { NotificationService } from '../notification/notification.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, NotificationService],
})
export class WebhookModule {
  public configure(cosumer: MiddlewareConsumer) {
    cosumer.apply(RawBodyMiddleware).forRoutes(
      { path: "webhook/livekit", method: RequestMethod.POST }
    )
  }

}
