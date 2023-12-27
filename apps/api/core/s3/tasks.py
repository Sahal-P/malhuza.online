# tasks.py

from celery import shared_task
from document.models import Document
from django.core.files.base import ContentFile

import blurhash
from PIL import Image as PILImage

@shared_task
def encodeImageToBlurHash(id, image_data):
    try:
        image = PILImage.open(ContentFile(image_data))
        hash = blurhash.encode(image=image, x_components=4, y_components=3)
        instance = Document.objects.get(id=id)
        instance.coverImageBlurHash = hash
        instance.save()
    except:
        pass

    print("Blur hash completed successfully")
