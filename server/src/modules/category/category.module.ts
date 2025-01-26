import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';

@Module({
  controllers: [CategoryResolver],
  providers: [CategoryService],
})
export class CategoryModule { }
