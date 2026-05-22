import { t, MSG } from '../../i18n'

export default function ListCard({ meta, title, description, count, updated }) {
  return (
    <article className="list-card">
      <div className="list-card__meta">{meta}</div>
      <h2 className="list-card__title">{title}</h2>
      <p className="list-card__desc">{description}</p>
      <div className="list-card__count">
        {t(MSG.ACCOUNT_LIST_BOOKS, { count, updated })}
      </div>
    </article>
  )
}
