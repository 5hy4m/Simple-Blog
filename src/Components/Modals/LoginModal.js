import React,{useRef,useContext} from 'react'
import blog from '../../api/blog'
import {BlogContext} from '../Home.js';

function LoginModal() {
  const context = useContext(BlogContext)
  const usernameRef = useRef("")
  const passwordRef = useRef("")

  async function handleRegister(){
        const data = {
          username:  usernameRef.current.value,
          password:  passwordRef.current.value
        }
        console.log("Creating User");
        await blog.post('api-token-auth/',data)
        .then(response =>{
            console.log(response.data);
            context.NewUser({
              token:response.data.token,
              username:usernameRef.current.value,
            })
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("username",usernameRef.current.value)
            alert("Successfully Logged in")
        })
        .catch((error)=>{
          console.log(error.response)
        })
          }

    return (
        <div className="modal fade" id="LoginModal" tabIndex={-1} role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="LoginModalLabel">Login</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">UserName:</label>
              <input type="text" ref={usernameRef} className="form-control" id="username" placeholder="Required.Max 150 Characters.Letters, digits and @/./+/-/_ only." />
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">Password:</label>
              <input type="text" ref={passwordRef} className="form-control" id="password" />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" onClick={handleRegister} className="btn btn-primary">Login</button>
        </div>
      </div>
          </div>
        </div>
      </div>
    )
}

export default LoginModal
