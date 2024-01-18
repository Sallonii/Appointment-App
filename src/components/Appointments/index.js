// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    active: false,
  }

  onChangingTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangingDate = event => {
    this.setState({date: event.target.value})
  }

  onClickingAdd = event => {
    event.preventDefault()
    const {title, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  starSelected = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickingStarred = () => {
    const {active} = this.state
    this.setState({active: !active})
  }

  onSelectingStarred = () => {
    const {active, appointmentList} = this.state

    if (active) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, active} = this.state
    const filterClassName = active ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.onSelectingStarred()
    return (
      <div className="bg">
        <div className="card-container">
          <div className="content-container">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onClickingAdd}>
                <div className="form-item">
                  <label htmlFor="title">TITLE</label>
                  <input
                    className="form-control"
                    id="title"
                    type="text"
                    placeholder="Title"
                    onChange={this.onChangingTitle}
                    value={title}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="date">Date</label>
                  <input
                    className="form-control date-input"
                    id="date"
                    type="date"
                    onChange={this.onChangingDate}
                    value={date}
                  />
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr />
          <div className="appointments-section">
            <h1>Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${filterClassName}`}
              onClick={this.onClickingStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetail={eachAppointment}
                key={eachAppointment.id}
                starSelected={this.starSelected}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
