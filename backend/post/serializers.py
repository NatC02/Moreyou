from rest_framework import serializers
from account.serializers import UserSerializer

from . models import User

class UserSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'body', 'created_by', 'time_since_created']