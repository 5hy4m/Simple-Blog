import React, {useContext } from 'react'
import blog from '../api/blog'
import {BlogContext} from './Home.js';



function Navbar() {
  
  const context = useContext(BlogContext)
  
  function handleLogout(e){
    e.preventDefault();
    const options={
      headers:{"Authorization" : `Token ${context.token}`}
  }
    blog.get("logout/",options)
    .then((response)=>console.log(response.data));
    localStorage.setItem("token","null");
    localStorage.setItem("username","null")
    context.NewUser({
      token:"null",
      username:"null"
    })
    
  }   

  
  

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="google.com">BLOG</a>
        {context.username !== "null" ? <h6>Welcome {context.username}</h6> : <p/>}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" data-toggle="modal" data-target="#RegistrationModal" href="google.com">Register</a>
            </li>
            {context.username !== "null" && context.token !== "null" ?
                                        <li className="nav-item">
                                        <a className="nav-link" onClick={handleLogout} href="google.com">Logout</a>
                                          </li> : <li className="nav-item">
                                            <a className="nav-link" data-toggle="modal" data-target="#LoginModal" href="google.com">Login</a>
                                          </li>
          }
          </ul>
        </div>
      </nav>
    )
}

export default Navbar
