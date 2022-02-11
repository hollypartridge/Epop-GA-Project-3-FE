import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { register } from '../lib/api'

const intialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

function Registration() {

  const [formData, setFormData] = React.useState(intialState)
  const [formErrors, setFormErrors] = React.useState(intialState)

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors,  [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(formData)
      navigate('/login')
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <div className='form'>
      <div className='form-div'>
        <div className='form-title'>
          <p className='form-field'>🦋 Register 🦋</p>
        </div>
        <form
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <div className="form-field">
              <input 
                className='input'
                name="username"
                id="username"
                onChange={handleInputChange}
              />
            </div>
            {formErrors.username && <p className="error">Username is a required field</p>}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <div className="form-field">
              <input 
                className='input'
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            {formErrors.email && <p className="error">Email is a required field</p>}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className="form-field">
              <input 
                className='input'
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </div>
            {formErrors.password && <p className="error">Password is a required field</p>}
          </div>
          <div className="form-field">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <div className="form-field">
              <input  
                className='input'
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                onChange={handleInputChange}
              />
            </div>
            {formErrors.passwordConfirmation && <p className="error">Passwords do not match</p>}
          </div>
          <div className="FIELD">
            <div className='submit-button form-field'
              htmlFor="button">
              <button 
                id="button"
                className='button'
                type="submit"
              >Register</button>
            </div>
            <div className='auth-para'>
              <p>Already a member?  <Link className='auth-link' to="/login">Click here</Link></p> 
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration

