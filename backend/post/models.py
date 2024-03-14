import uuid 
from django.db import models

from account.models import User

# Create your models here.
class PostAttachment(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to = 'post_attachments')
    created_by = models.ForeignKey(User, related_name='post_attachments', on_delete=models.CASCADE)

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    body = models.TextField(blank=True, null=True)
    attachments = models.ManyToManyField(PostAttachment, blank=True)
    #likes
    #likes_count
    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)