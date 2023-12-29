from django.conf import settings
from mypy_boto3_s3.client import S3Client 
import boto3

def get_s3_client() -> S3Client:
    return boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION,
    )