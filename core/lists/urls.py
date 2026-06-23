from django.urls import path

from lists.api.views import ListDetailsView, ListView, MyListView

urlpatterns = [
    path("lists/", ListView.as_view()),
    path("lists/mine/", MyListView.as_view()),
    path("lists/<int:list_id>/", ListDetailsView.as_view()),
]
