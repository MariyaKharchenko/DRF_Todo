from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, IsAuthenticated


from .models import User
from .serializers import UserModelSerializer, UserBaseModelSerializer


class UserModelViewSet (ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    #serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserBaseModelSerializer
        return UserModelSerializer



