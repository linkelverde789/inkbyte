from django.urls import path

from lists.api.views import ListListView

urlpatterns = [path("profile/lists/", ListListView.as_view())]
