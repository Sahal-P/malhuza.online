# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from common.types import Request
import boto3
from django.conf import settings
import blurhash
from PIL import Image as PILImage
from s3.tasks import encodeImageToBlurHash

def generate_s3_presigned_url(bucket_name, file_key, expiration=3600):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION,
    )

    try:
        # Generate a pre-signed URL for PUT operation
        presigned_url = s3_client.generate_presigned_url(
            "put_object",
            Params={"Bucket": bucket_name, "Key": file_key},
            ExpiresIn=expiration,
        )
        return presigned_url
    except Exception as e:
        # Log the error or handle it based on your requirements
        print(f"Error generating pre-signed URL: {e}")
        return None


class S3PresignedUrl(APIView):
    def get(self, request: Request):
        bucket_name = settings.BUCKET_NAME
        name = request.query_params.get("file_key", None)
        file_key = f"media/images/malhuza/{name}"
        presigned_url = generate_s3_presigned_url(bucket_name, file_key)

        if presigned_url:
            return Response({"presigned_url": presigned_url})
        else:
            return Response(
                {"error": "Error generating pre-signed URL"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class BlurHash(APIView):
    def patch(self, request: Request):
        image_data = request.FILES["image"].read()
        _id = request.data["id"]
        encodeImageToBlurHash.delay(_id, image_data)
        
        return Response(status=status.HTTP_204_NO_CONTENT)
