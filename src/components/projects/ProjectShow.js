
import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { deleteProject, getSingleProject, headers } from '../lib/api'
import { isAuthenticated, isOwner } from '../lib/auth'
import Error from '../common/Error'
import Loading from '../common/Loading'
import AddComment from './AddComment'
import axios from 'axios'


function ProjectShow() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !project && !isError
  const [isFavourite, setIsFavourite] = React.useState(false)
  const [createdAt, setCreatedAt] = React.useState(null)
  const isAuth = isAuthenticated()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleProject(projectId)
        setProject(res.data)
        setCreatedAt(res.data.createdAt.slice(0, 10).split('-').reverse().join(' '))
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [projectId])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId)
        navigate('/projects')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleFavourites = async () => {
    if (isAuth) {
      setIsFavourite(true)
      const res = await axios.post(`/api/projects/${projectId}/favourite`, isFavourite, headers())
      console.log('RES', res)
    } else {
      navigate('/login')
    }
  }

  const handleRemoveFavourite = () => {
    setIsFavourite(false)
  }

  console.log(isFavourite)

  return (
    <section>
      {isLoading && <Loading />}
      {isError && <Error />}
      {project &&
        <div className='home'>
          <div className='featured-project'>
            <div className='web-display-bar'>
              <div className='web-display-controls'>
                <div className='dots-display'></div>
                <div className='dots-display'></div>
                <div className='dots-display'></div>
              </div>
              <div className='website-bar'>
                <p id='display-url'>{project.website}</p>
              </div>
              <div className='web-display-controls'>
                <div className='dots-display-hidden'></div>
                <div className='dots-display-hidden'></div>
                <div className='dots-display-hidden'></div>
              </div>
            </div>
            <div className='video-primary-homepage'>
              <video src={project.video} autoPlay muted loop width='800px' />
            </div>
            <div className='show-info'>
              <p id='primary-created-at'>{createdAt}</p>
              <a 
                target='_blank' 
                rel='noreferrer' 
                href={project.hyperlink}
                id='primary-link'
              >
                <p>{project.website}</p>
              </a>
              <p id='primary-description'>{project.description}</p>
              <p id='primary-credits'>credits {project.credit}</p>
            </div>
          </div>
          <div className='buttons'>
            {!isOwner(project.addedBy._id) ? ( 
              <button
                onClick={!isFavourite ? (handleFavourites) : (handleRemoveFavourite)}
              >
                {isFavourite ? (
                  <>
                    <p>Remove from Favourites</p> 
                  </>
                ) : (
                  <>
                    <p>Add To Favourites</p>
                  </>
                )}
              </button>
            ) : (
              <>
                <Link to={`/projects/${projectId}/edit`}>
                  <button>
                    <p>Edit</p>
                  </button>
                </Link>
                <button onClick={handleDelete}>
                  <p>Delete</p>
                </button>
              </>)}
          </div>
          <h4>{project.primaryDescription}</h4>
          <p className='description-show'>{project.secondaryDescription}</p>
        </div>
      }
      {isAuth &&
      <div>
        <div className='projects-we-love-title'>
          <p>🦋 Comments 🦋</p>
        </div>
        <div className='comments'>
          <AddComment 
            project = {project}
            setProject = {setProject}
          />
        </div>
      </div>}
    </section>
  )
}

export default ProjectShow