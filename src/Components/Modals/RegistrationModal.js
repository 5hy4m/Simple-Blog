import React,{useRef} from 'react'
import blog from '../../api/blog'

function RegistrationModal() {
  const usernameRef = useRef("")
  const passwordRef = useRef("")

  async function handleRegister(){
        const data = {
          username:  usernameRef.current.value,
          password:  passwordRef.current.value
        }
        console.log("Creating User");
        await blog.post('register/',data)
        .then(response =>{
            console.log(response.data);
            alert("USER created Successfully")
        })
        .catch((error)=>{
          console.log(error.response)
        })
      }



    return (
        <div className="modal fade" id="RegistrationModal" tabIndex={-1} role="dialog" aria-labelledby="RegistrationModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="RegistrationModalLabel">Registration</h5>
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
          <button type="button" onClick={handleRegister} className="btn btn-primary">Register</button>
        </div>
      </div>
          </div>
        </div>
      </div>
    )
}

export default RegistrationModal
