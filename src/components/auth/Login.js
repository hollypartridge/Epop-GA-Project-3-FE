import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../lib/api'
import { setToken } from '../lib/auth'

function Login() {

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const [isError, setIsError] = React.useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await login(formData)
      setToken(res.data.token)
      navigate('/projects')
    } catch (err) {
      setIsError(true)
    }
  }

  console.log('FROM', formData)
  
  return (
    <div className='form'>
      <div className='form-div'>
        <div className='form-title'>
          <p className='form-field'>🦋 Login 🦋</p>
        </div>
        <form
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <div className='form-field'>
              <input 
                className='input'
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className='form-field'>
              <input 
                className='input'
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className='submit-button form-field'
              htmlFor="button">
              <button 
                id="button"
                className='button'
                type="submit"
              >Log Me In!</button>
            </div>
            <div className='form-field'>
              {isError && (
                <p className="error">Email or Password were incorrect. Please try again.</p>
              )}
              <div className='form-field auth-info'>
                <p className='form-field auth-para'>Not a member? 
                  <Link className='auth-link' to="/register"> Click here</Link>
                </p> 
              </div>
            </div>
          </div>
        </form>
      </div>   
    </div>
  )

}

export default Login