import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'

function ProjectIndex() {
  const [projects, setProjects] = React.useState([])
  const [keyword, setKeyword] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !projects && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllProjects()
        setProjects(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  const handleSearch = (e) => {
    setKeyword(e.target.value)
  }

  const searchProducts = projects.filter(project => {
    if (keyword === '') {
      return project
    } else if (project.website.toLowerCase().includes(keyword.toLowerCase())) {
      return project
    }
  })

  return (
    <div className='index'>
      <div className='index-title'>
        <div className='search-bar'>
          <input 
            placeholder='Search by name...' 
            type='text'
            id='input'
            onChange={handleSearch}
            value={keyword}
          />
        </div>
      </div>
      <div className='projects-we-love'>
        {isLoading && <Loading />}
        {isError && <Error />}
        {projects &&
          searchProducts.map(project => (
            <div key={project._id} className='projects-we-love-single'>
              <Link to={`/projects/${project._id}`}>
                <video 
                  src={project.video} 
                  muted 
                  loop 
                  width='280px'
                  onMouseOver={event => event.target.play()}
                  onMouseOut={event => event.target.pause()}
                />
              </Link>
              <p className='project-description'>{project.createdAt.slice(0, 10).split('-').reverse().join(' ')}</p>
              <a 
                target='_blank' 
                rel='noreferrer' 
                href={project.hyperlink}
              >
                <p className='project-website'>{project.website}</p>
              </a>
              <p className='project-description'>{project.description}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProjectIndex