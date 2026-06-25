from lists.models import List


class ListSelector:
    def get_list_by_id(self, list_id: int) -> List | None:
        return List.objects.filter(id=list_id).first()

    def list_lists(self):
        return List.objects.all().order_by("id")
