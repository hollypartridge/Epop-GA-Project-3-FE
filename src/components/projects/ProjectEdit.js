import React from 'react'
import { getSingleProject, headers } from '../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const initialState = {
  projectTitle: '',
  primaryDescription: '',
  primaryImage: '',
  secondaryDescription: '',
  secondaryImage: [],
  categoryTag: [],
}

function ProjectEdit() {
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [primaryCharacterCount, setPrimaryCharacterCount] = React.useState(0)
  const { projectId } = useParams()
  const navigate = useNavigate()
    
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleProject(projectId)
        setFormData(res.data)
      } catch (err) {
        setFormErrors(err.response.data.errors)
      }
    }
    getData()
  }, [projectId])

  const handleTextInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors,  [e.target.name]: '' })
  }

  let primaryCharacterCountLimit = false
  if (primaryCharacterCount > 250) {
    primaryCharacterCountLimit = true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(`/api/projects/${projectId}`, formData, headers())
      console.log('RES', res.data.message)
      navigate(`/projects/${projectId}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <div className='form'>
      <div className='form-div'>
        <div className='form-title'>
          <p className='form-field'>🦋 Edit Project 🦋</p>
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
                value={formData.website}
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
                value={formData.credit}
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
                value={formData.hyperlink}
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
                value={formData.description}
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
                value={formData.video}
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

export default ProjectEdit