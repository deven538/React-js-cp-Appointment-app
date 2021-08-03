// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onClickStarButton} = props
  const {typeOfDoctor, dateTime, id, isFavorite} = eachAppointment

  const nonFavImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const favImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const isClicked = () => {
    onClickStarButton(id)
  }

  const formattedDate = format(new Date(dateTime), 'dd MMMM yyyy, EEEE')

  const whichImage = isFavorite ? favImage : nonFavImage

  return (
    <li className="list-item">
      <div className="heading-and-image">
        <p className="type-of-doctor">{typeOfDoctor}</p>
        <button
          type="button"
          className="star-button"
          onClick={isClicked}
          testid="star"
        >
          <img src={whichImage} className="fav-image" alt="star" />
        </button>
      </div>
      <p className="date-time" textContent="Title">
        Date: {formattedDate}
      </p>
    </li>
  )
}

export default AppointmentItem
