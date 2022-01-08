
import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { deleteProject, getSingleProject } from '../lib/api'
import { isOwner } from '../lib/auth'
import Error from '../common/Error'
import Loading from '../common/Loading'


function ProjectShow() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !project && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleProject(projectId)
        setProject(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [projectId])

  console.log(project)

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

  return (
    <section>
      {isLoading && <Loading />}
      {isError && <Error />}
      {project &&
        <div className='show'>
          <div className='right-side'>
            <div>
              <h1>{project.projectTitle}</h1>
            </div>
            <div>
              <button>Add To Favourites ❤️</button>
              {isOwner(project.addedBy._id) && 
            <>
              <Link to={`/projects/${projectId}/edit`}><button>Edit Your Project </button></Link>
              <button onClick={handleDelete}>
                <img 
                  src='https://i.imgur.com/ygGtZOs.png' 
                  className='show-icons'
                />
              </button>
            </>}
            </div>
            <div>
              <h3>{project.primaryDescription}</h3>
            </div>
            <div>
              <p>{project.secondaryDescription}</p>
            </div>
          </div>
          <div className='left-side'>
            <div className='show-primary-image'>
              <img src={project.primaryImage} alt={project.projectTitle} />
            </div>
          </div>
          {/* <div className='show-primary-image'>
            <img 
              src={project.secondaryImage.map(image => {
                console.log(image)
              })} 
              alt={project.projectTitle} />
          </div> */}
        </div>
      }
    </section>
  )
}

export default ProjectShow