from rest_framework.serializers import ModelSerializer

from .models import Project, Todo

from userapp.serializers import UserModelSerializer
from rest_framework.serializers import HyperlinkedRelatedField


class ProjectModelSerializer(ModelSerializer):
    file_link = HyperlinkedRelatedField
    user = UserModelSerializer

    class Meta:
        model = Project
        fields = '__all__'



class TodoModelSerializer(ModelSerializer):
    #user = UserModelSerializer

    class Meta:
        model = Todo
        fields = '__all__'
