from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework.filterset import FilterSet
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from django.http import HttpResponse

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from .filters import ProjectFilter, TodoFilter


class ProjectPageNumberPagination(PageNumberPagination):
    #default_limit = 10  эта команда не отрабатывала, заменила на команду ниже
    page_size = 10


class TodoPageNumberPagination(PageNumberPagination):
    #default_limit = 20
    page_size = 20


class ProjectModelViewSet(ModelViewSet):
    #renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    #renderer_classes = [JSONRenderer]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoPageNumberPagination
    filterset_class = TodoFilter


    def destroy(self, request, *args, **kwargs):
            try:
                instance = self.get_object()
                instance.closed = True
                instance.save()
            except:
                return Response(status=404)
            else:
                return Response(status=204)




