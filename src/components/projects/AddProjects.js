import React from 'react'
import { createProject } from '../lib/api'
import { useNavigate } from 'react-router-dom'

const intialState = {
  website: '',
  hyperlink: '',
  credit: '',
  description: '',
  video: '',
}

function AddProject() {
  const navigate = useNavigate()
  const [primaryCharacterCount, setPrimaryCharacterCount] = React.useState(0)
  const [formData, setFormData] = React.useState(intialState)
  const [formErrors, setFormErrors] = React.useState(intialState)

  const handleTextInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors,  [e.target.name]: '' })
  }

  let primaryCharacterCountLimit = false
  if (primaryCharacterCount > 400) {
    primaryCharacterCountLimit = true
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createProject(formData)
      navigate(`/projects/${res.data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <div className='form'>
      <div className='form-div'>
        <div className='form-title'>
          <p className='form-field'>🦋 Submit A Project 🦋</p>
        </div>
        <form 
          onSubmit={handleSubmit}
        >
          <div className='form-field'>
            <label htmlFor="website">Website *</label>
            <div className='form-field'>
              <input 
                className='input'
                name="website"
                id="website"
                onChange={handleTextInputChange}
              />
            </div>
            {formErrors.website && <p className="error">Website is a required field</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="credit">Credits *</label>
            <div className='form-field'>
              <input 
                className='input'
                name="credit"
                id="credit"
                onChange={handleTextInputChange}
              />
            </div>
            {formErrors.credit && <p className="error">Credits is a required field</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="hyperlink">URL *</label>
            <div className='form-field'>
              <input 
                className='input'
                name="hyperlink"
                id="hyperlink"
                onChange={handleTextInputChange}
              />
            </div>
            {formErrors.hyperlink && <p className="error">URL is a required field</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="description">Description* <span className="character-count form-field">{primaryCharacterCount}/400</span></label>
            <div className='form-field'>
              <textarea 
                className={primaryCharacterCountLimit ? 'input-text-area-red' : 'input-text-area'}
                name="description"
                id="description"
                onChange={handleTextInputChange}
                onChangeCapture={(e) => setPrimaryCharacterCount(e.target.value.length)}
              />
            </div>
            {primaryCharacterCountLimit ? <p className="error">Too many characters</p> : ''}
            {formErrors.description && <p className="error">Description is a required field</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="video">Video Walkthrough *</label>
            <div className='form-field'>
              <input 
                className='input'
                name="video"
                id="video"
                onChange={handleTextInputChange}
              />
            </div>
            {formErrors.video && <p className="error">Video Walkthrough is a required field</p>}
          </div>
          <div className="submit-button form-field">
            <button 
              type="submit"
            >Submit!</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProject