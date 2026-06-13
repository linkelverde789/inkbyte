import { t, MSG } from '../../i18n'

export default function ListCard({ meta, title, description, count, updated, href = '#' }) {
  return (
    <a
      className="list-card"
      href={href}
      onClick={(event) => event.preventDefault()}
      aria-label={title}
    >
      <div className="list-card__meta">{meta}</div>
      <h2 className="list-card__title">{title}</h2>
      <p className="list-card__desc">{description}</p>
      <div className="list-card__count">
        <strong>{count}</strong> {t(MSG.ACCOUNT_LIST_BOOKS_LABEL)} ·{' '}
        {t(MSG.ACCOUNT_LIST_UPDATED, { updated })}
      </div>
    </a>
  )
}
