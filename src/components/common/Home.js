import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { getAllProjects } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'


function Home() {
  const [projects, setProjects] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !projects && !isError
  const [primaryProject, setPrimaryProject] = React.useState([])
  const [primaryCreatedAt, setPrimaryCreatedAt] = React.useState(null)
  useLocation()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllProjects()
        setProjects(res.data)
        setPrimaryProject(res.data[0])
        setPrimaryCreatedAt(res.data[0].createdAt.slice(0, 10).split('-').reverse().join(' '))
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className='home'>
        <div className='featured-project'>
          <div className='web-display-bar'>
            <div className='web-display-controls'>
              <div className='dots-display'></div>
              <div className='dots-display'></div>
              <div className='dots-display'></div>
            </div>
            <div className='website-bar'>
              <p id='display-url'>{primaryProject.website}</p>
            </div>
            <div className='web-display-controls'>
              <div className='dots-display-hidden'></div>
              <div className='dots-display-hidden'></div>
              <div className='dots-display-hidden'></div>
            </div>
          </div>
          <div className='video-primary-homepage'>
            <video src={primaryProject.video} autoPlay muted loop />
          </div>
          <div className='primary-info'>
            <p id='primary-created-at'>{primaryCreatedAt}</p>
            <a 
              target='_blank' 
              rel='noreferrer' 
              href={primaryProject.hyperlink}
              id='primary-link'
            >
              <p>{primaryProject.website}</p>
            </a>
            <p id='primary-description'>{primaryProject.description}</p>
            <p id='primary-credits'>credits {primaryProject.credit}</p>
          </div>
        </div>
        <div className='projects-we-love-title'>
          <p>🦋 Projects We Love 🦋</p>
        </div>
        <div className='projects-we-love'>
          {isError && <Error />}
          {isLoading && <Loading />}
          {projects && projects.filter(item => {
            if (item.loved) {
              return item
            }
          }
          ).map(project => (
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
        <div className='browse-archive'>
          <Link to="/projects"><button>Browse Archive</button></Link>
        </div>
      </div>
    </>
  )
}

export default Home

