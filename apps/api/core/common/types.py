from rest_framework.request import Request as HttpRequest
from document.models import Document

class Request(HttpRequest):
    
    def __init__(self) -> None:
        self.user :Document = None