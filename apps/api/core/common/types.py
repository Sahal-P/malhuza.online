from django.http import HttpRequest
from document.models import Document

class Request(HttpRequest):
    
    def __init__(self) -> None:
        self.user :Document = None