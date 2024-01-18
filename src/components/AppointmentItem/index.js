// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetail, starSelected} = props
  const {title, date, id, isStarred} = appointmentDetail

  const onClickingStar = () => {
    starSelected(id)
  }

  const isStarSelected = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div>
        <p className="title">{title}</p>
        <p className="date">Date {date}</p>
      </div>
      <button
        type="button"
        data-testid="star"
        className="star-img"
        onClick={onClickingStar}
      >
        <img src={isStarSelected} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
