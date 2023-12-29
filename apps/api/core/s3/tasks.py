from celery import shared_task
from document.models import Document
from django.core.files.base import ContentFile
from utils.s3 import get_s3_client
import blurhash
from PIL import Image as PILImage

@shared_task
def encodeImageToBlurHash(id, image_data):
    try:
        image = PILImage.open(ContentFile(image_data))
        hash = blurhash.encode(image=image, x_components=4, y_components=3)
        instance = Document.objects.get(id=id)
        instance.cover_image_blurhash = hash
        instance.save()
        print("Blur hash completed successfully")
    except:
        print("Blur hash error occured")
        pass


@shared_task
def removeS3object(object_key, bucket_name):
    try:
        s3 = get_s3_client()
        s3.delete_object(Bucket=bucket_name, Key=object_key)
        print("s3 object removed successfully")
    except:
        print("s3 object error occured during removal")
        pass
