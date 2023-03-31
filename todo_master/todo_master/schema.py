import graphene
from graphene import ObjectType, Schema, List, Field, Int, String
from  graphene_django import DjangoObjectType
from todoapp.models import Project, Todo
from userapp.models import User


class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):

    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    user_by_id = Field(UserType, id=Int(required=True))

    def resolve_user_by_id(root,info,id=None):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    projects_by_user = List(ProjectType,id=Int(required=False))
    todo_by_project =  List(TodoType,text_todo=String(required=False))

    def resolve_projects_by_user(root,info,id=None):

        projects = Project.objects.all()
        if id:
            projects = projects.filter(users__id=id)
        return projects


    def resolve_todo_by_project(root,info,name=None):

        todo = Todo.objects.all()
        if name:
            todo = todo.filter(project__name=name)
        return todo


schema = graphene.Schema(query=Query)