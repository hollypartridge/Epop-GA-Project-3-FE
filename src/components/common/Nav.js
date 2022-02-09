import { Link, useNavigate, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Nav() {
  const navigate = useNavigate()
  const isAuth = isAuthenticated()
  useLocation()

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <nav>
      <div className='primary-nav'>
        <div className='nav-mobile'>
          <Link to="/"><button id='epop'>epop</button></Link>
          <Link to="/projects"><button>archive</button></Link>
        </div>
        <div className='nav-mobile'>
          {isAuth ? (
            <>
              <Link to="/favourites"><button>Favourites</button></Link>
              <Link to="/projects/create"><button>Submit</button></Link>
              <button onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/register"><button>Sign up</button></Link>
              <Link to="/login"><button>Login</button></Link>
            </>
          )}
        </div>
        <div className='nav-mobile'>
          <Link to="/about"><button>?</button></Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav