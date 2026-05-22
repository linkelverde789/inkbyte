import { t, MSG } from '../../i18n'
import ListCard from './ListCard'

const PLACEHOLDER_LISTS = [
  {
    id: 1,
    metaKey: MSG.LIST_PUBLIC_SHAREABLE,
    titleKey: MSG.LIST_VACATION_TITLE,
    descKey: MSG.LIST_VACATION_DESC,
    count: 12,
    updatedKey: MSG.LIST_VACATION_UPDATED,
  },
  {
    id: 2,
    metaKey: MSG.LIST_PRIVATE,
    titleKey: MSG.LIST_CLUB_TITLE,
    descKey: MSG.LIST_CLUB_DESC,
    count: 5,
    updatedKey: MSG.LIST_CLUB_UPDATED,
  },
  {
    id: 3,
    metaKey: MSG.LIST_PRIVATE,
    titleKey: MSG.LIST_GIFTS_TITLE,
    descKey: MSG.LIST_GIFTS_DESC,
    count: 3,
    updatedKey: MSG.LIST_GIFTS_UPDATED,
  },
]

export default function ListGrid() {
  return (
    <div className="list-grid">
      {PLACEHOLDER_LISTS.map((list) => (
        <ListCard
          key={list.id}
          meta={t(list.metaKey)}
          title={t(list.titleKey)}
          description={t(list.descKey)}
          count={list.count}
          updated={t(list.updatedKey)}
        />
      ))}
    </div>
  )
}
