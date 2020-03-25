import React,{useState,useRef,useContext} from 'react'
import blog from '../api/blog'
import {BlogContext} from './Home.js';
function PostField() {
    const postfield_ref = useRef(null)
    const [post_button,toggle_post_button] = useState(false);
    const context = useContext(BlogContext) 
    console.log(context);
    function handletextarea (e){
        // console.log(e);
        if(e.target.value === ""){
            toggle_post_button(false)
        }else{
            toggle_post_button(true)
        }
    }

    async function handleCreatePost(e){
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }
        const data = {
            user: context.username,
            content:  postfield_ref.current.value
        }
        console.log("Creating post");
        await blog.post('posts/',data,options)
        .then((response =>{
            console.log(response.data);
            context.updatePosts({
                data:response.data,
                type:'CREATE',
            })
        }))
        .catch(error =>{
            console.log(error.response);
            // alert("Kindly Login Or Register to Post something new")
        })}

    

    const button = <button type="button" onClick={handleCreatePost} className="float-right mb-2 btn-sm btn btn-outline-primary">POST</button>

    return (
        <React.Fragment>
        <textarea ref={postfield_ref} placeholder = "what was interesting today?" onChange={handletextarea} id="postfield"  style={{width:"100%"}}/>
        {post_button ? button : post_button}
        </React.Fragment>
    )
}

export default PostField
