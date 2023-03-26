from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, IsAdminUser


from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet (ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer



