import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { PubSubProvider } from '../libs/pub-sub/pub-sub.provider';

@Module({
  providers: [ChatResolver, ChatService, PubSubProvider],
})
export class ChatModule { }
