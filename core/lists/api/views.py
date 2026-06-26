from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from lists.use_cases.get_stats import GetStatsUseCase
from events.models import EventType
from events.use_cases.create_event import CreateEventUseCase
from lists.use_cases.list_lists import ListListUseCase
from lists.exceptions import ListError
from lists.use_cases.delete_list import DeleteListUseCase
from lists.use_cases.get_list import GetListUseCase
from lists.use_cases.update_list import UpdateListUseCase
from lists.use_cases.create_list import CreateListUseCase
from lists.use_cases.list_lists_for_user import ListListForUserUseCase
from lists.api.serializers import (
    CreateListSerializer,
    ListResponseSerializer,
    ListStatsSerializer,
    UpdateListSerializer,
)


def _create_event(
    event_type: EventType,
    user,
    metadata,
    target=None,
):
    CreateEventUseCase().execute(
        user=user, event_type=event_type, target=target, metadata=metadata
    )


def _list_error_response(exc: ListError) -> Response:
    status_code = (
        status.HTTP_404_NOT_FOUND
        if exc.code == "not_found"
        else status.HTTP_400_BAD_REQUEST
    )
    return Response({"detail": exc.message, "code": exc.code}, status=status_code)


class ListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))

        items, total = ListListUseCase().execute(page=page, page_size=page_size)
        _create_event(
            event_type=EventType.LIST_VIEW,
            user=request.user,
            metadata={
                "path": request.path,
                "method": request.method,
                "params": request.query_params.dict(),
            },
        )
        return Response(
            {
                "count": total,
                "page": page,
                "page_size": page_size,
                "results": ListResponseSerializer(
                    items, many=True, context={"request": request}
                ).data,
            }
        )

    def post(self, request):
        data = request.data
        serializer = CreateListSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        try:
            list_output = CreateListUseCase().execute(
                **serializer.validated_data, user=request.user
            )

        except ListError as exc:
            return _list_error_response(exc)

        metadata = {
            "path": request.path,
            "method": request.method,
            "params": request.data,
        }

        _create_event(
            event_type=EventType.LIST_CREATE,
            user=request.user,
            metadata=metadata,
            target=list_output,
        )

        return Response(
            ListResponseSerializer(list_output, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class MyListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page = int(request.query_params.get("page", 1))

        page_size = int(request.query_params.get("page_size", 10))
        user = request.user

        items, total = ListListForUserUseCase().execute(
            page=page, page_size=page_size, user=user
        )

        _create_event(
            event_type=EventType.MINE_LIST_VIEW,
            user=request.user,
            metadata={
                "path": request.path,
                "method": request.method,
                "params": request.query_params.dict(),
            },
        )

        return Response(
            {
                "count": total,
                "page": page,
                "page_size": page_size,
                "results": ListResponseSerializer(
                    items, many=True, context={"request": request}
                ).data,
            }
        )


class MyListStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            stats_dto = GetStatsUseCase().execute(user=user)
        except ListError as exc:
            return _list_error_response(exc)

        return Response(
            ListStatsSerializer(stats_dto, context={"request": request}).data
        )


class ListDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, list_id):
        try:
            list_output = GetListUseCase().execute(list_id=list_id)

        except ListError as exc:
            return _list_error_response(exc=exc)

        _create_event(
            event_type=EventType.LIST_VIEW,
            user=request.user,
            metadata={
                "path": request.path,
                "method": request.method,
                "params": request.query_params.dict(),
            },
            target=list_output,
        )

        return Response(
            ListResponseSerializer(list_output, context={"request": request}).data
        )

    def patch(self, request, list_id):
        try:
            serializer = UpdateListSerializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)

            list_output = UpdateListUseCase().execute(
                list_id=list_id, user=request.user, **serializer.validated_data
            )

        except ListError as exc:
            return _list_error_response(exc)

        _create_event(
            event_type=EventType.LIST_UPDATE,
            user=request.user,
            metadata={
                "path": request.path,
                "method": request.method,
                "params": request.data,
            },
            target=list_output,
        )

        return Response(
            ListResponseSerializer(list_output, context={"request": request}).data
        )

    def delete(self, request, list_id):
        try:
            DeleteListUseCase().execute(list_id=list_id, user=request.user)
        except ListError as exc:
            return _list_error_response(exc)

        _create_event(
            event_type=EventType.LIST_DELETE,
            user=request.user,
            metadata={
                "path": request.path,
                "method": request.method,
            },
        )

        return Response(status=status.HTTP_204_NO_CONTENT)
