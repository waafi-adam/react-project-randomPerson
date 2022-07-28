import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
// const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [person, setPerson] = useState({
    name: '',
    email: '',
    age: '',
    street: '',
    phone: '',
    password: '',
  })
  const [toDisplay, setToDisplay] = useState('name')
  const icons = [
    { label: 'name', icon: <FaUser /> },
    { label: 'email', icon: <FaEnvelopeOpen /> },
    { label: 'age', icon: <FaCalendarTimes /> },
    { label: 'street', icon: <FaMap /> },
    { label: 'phone', icon: <FaPhone /> },
    { label: 'password', icon: <FaLock /> },
  ]
  const fetchRandomPerson = async () => {
    setIsLoading(true)
    const resp = await fetch(url)
    const { results } = await resp.json()
    const fetchedPerson = results[0]
    const {
      name: { first: firstName, last: lastName },
      email,
      dob: { age },
      location: {
        street: { number: streetNum, name: streetName },
      },
      phone,
      login: { password },
      picture: { medium: image },
    } = fetchedPerson
    setPerson({
      name: `${firstName} ${lastName}`,
      email,
      age,
      street: `${streetNum} ${streetName}`,
      phone,
      password,
      image,
    })
    setToDisplay('name')
    setIsLoading(false)
  }
  const mouseEnterHandle = (e) => {
    e.preventDefault()
    const newToDisplay = e.currentTarget.dataset.label
    setToDisplay(newToDisplay)
  }
  useEffect(() => {
    fetchRandomPerson()
  }, [])
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img src={person.image} alt={person.name} className='user-img' />
          <p className='user-title'>my {toDisplay} is</p>
          <p className='user-value'>{person[toDisplay]}</p>
          <div className='values-list'>
            {icons.map((item, idx) => {
              const { label, icon } = item
              return (
                <button
                  key={idx}
                  className='icon'
                  data-label={label}
                  onMouseEnter={mouseEnterHandle}
                >
                  {icon}
                </button>
              )
            })}
          </div>
          <button className='btn' type='button' onClick={fetchRandomPerson}>
            {isLoading ? 'loading' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
