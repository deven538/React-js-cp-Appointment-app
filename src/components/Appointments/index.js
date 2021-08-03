// Write your code
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    typeOfDoctor: '',
    dateTime: '',
    isFilterActive: false,
  }

  onChangeName = event => {
    this.setState({typeOfDoctor: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateTime: event.target.value})
  }

  filterLikedImages = () => {
    const {appointmentList} = this.state

    const filteredAppointmentList = appointmentList.filter(
      each => each.isFavorite !== false,
    )
    this.setState(prevState => ({
      ...prevState,
      appointmentList: filteredAppointmentList,
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onClickStarButton = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddButtonClicked = event => {
    event.preventDefault()

    const {typeOfDoctor, dateTime} = this.state

    const newAppointment = {
      id: uuidv4(),
      typeOfDoctor,
      dateTime,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      typeOfDoctor: '',
      dateTime: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isFavorite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {typeOfDoctor, dateTime, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="background-container">
        <div className="card">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="input-image-container">
            <div className="input-container">
              <form
                className="form-control form-edits"
                onSubmit={this.onAddButtonClicked}
              >
                <label htmlFor="myInput" className="title-edit">
                  TTITLE
                </label>
                <input
                  type="text"
                  value={typeOfDoctor}
                  id="myInput"
                  onChange={this.onChangeName}
                  className="input-edit"
                  placeholder="Title"
                />
                <label htmlFor="date-input" className="title-edit">
                  DATE
                </label>
                <input
                  type="date"
                  id="date-input"
                  value={dateTime}
                  onChange={this.onChangeDate}
                  className="input-edit"
                  placeholder="Title"
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image-edit"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bottom-head-button-container">
            <h1 className="appoint-head">Appointments</h1>
            <button
              className={`starred-item-button ${filterClassName}`}
              type="button"
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                onClickStarButton={this.onClickStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
