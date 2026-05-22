export default function RememberMeField({ id = 'remember', label, checked, onChange }) {
  return (
    <div className="row-check">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
