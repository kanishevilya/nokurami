import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async findAll() {
        const streams = await this.prismaService.stream.findMany({
            include: {
                user: true
            }
        })

        return streams
    }

}
