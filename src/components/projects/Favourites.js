import React from 'react'
import { getAllProjects } from '../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'
import { Link } from 'react-router-dom'

function Favourites() {
  const [projects, setProjects] = React.useState([])
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

  return (
    <div className='home'>
      <div className='projects-we-love-title'>
        <p>🦋 Your Favourites 🦋</p>
      </div>
      <section>
        {isLoading && <Loading />}
        {isError && <Error />}
        {projects &&
        <div className='projects-we-love'>
          {projects.filter(project => {
            return project.favouritedBy.length > 0
          }).map(project => (
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
        }
      </section>
    </div>
  )
}

export default Favourites