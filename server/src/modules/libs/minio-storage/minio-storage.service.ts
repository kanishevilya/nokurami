import {
    DeleteObjectCommand,
    type DeleteObjectCommandInput,
    PutObjectCommand,
    type PutObjectCommandInput,
    S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioStorageService {
    private readonly client: S3Client;
    private readonly bucket: string;

    public constructor(private readonly configService: ConfigService) {
        this.client = new S3Client({
            endpoint: this.configService.getOrThrow<string>('MINIO_ENDPOINT'),
            region: this.configService.get<string>('MINIO_REGION') || 'us-east-1',
            credentials: {
                accessKeyId: this.configService.getOrThrow<string>('MINIO_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow<string>('MINIO_SECRET_ACCESS_KEY'),
            },
            forcePathStyle: true,
        });

        this.bucket = this.configService.getOrThrow<string>('MINIO_BUCKET_NAME');
    }

    public async upload(buffer: Buffer, key: string, mimetype: string): Promise<void> {
        const command: PutObjectCommandInput = {
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: mimetype,
        };

        try {
            await this.client.send(new PutObjectCommand(command));
        } catch (error) {
            console.error('Ошибка при загрузке файла в MinIO:', error);
            throw error;
        }
    }

    public async remove(key: string): Promise<void> {
        const command: DeleteObjectCommandInput = {
            Bucket: this.bucket,
            Key: key,
        };

        try {
            await this.client.send(new DeleteObjectCommand(command));
        } catch (error) {
            console.error('Ошибка при удалении файла из MinIO:', error);
            throw error;
        }
    }
}
