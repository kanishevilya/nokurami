mc alias set myminio http://localhost:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

mc mb --ignore-existing myminio/nokurami-records

mc anonymous set public myminio/nokurami-records

echo "MinIO setup complete."