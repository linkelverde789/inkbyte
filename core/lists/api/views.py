from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from lists.use_cases.create_list import CreateListUseCase
from lists.use_cases.list_lists_for_user import ListListForUserUseCase
from lists.api.serializers import CreateListSerializer, ListResponseSerializer


class ListListView(APIView):
    [IsAuthenticated()]

    def get(self, request):
        page = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 10))
        user = request.user

        items, total = ListListForUserUseCase().execute(
            page=page, page_size=page_size, user=user
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

        except Exception as exc:
            print(exc)
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            ListResponseSerializer(list_output, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )
