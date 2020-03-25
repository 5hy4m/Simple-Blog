import React,{useState,useContext,useRef} from 'react';
import '../css/Post.css';
import Comment from './Comment';
import {BlogContext} from './Home.js';
import blog from '../api/blog';
import TimeAgo from 'timeago-react';

function Post(props) {
    const commentareaRef = useRef(null)
    const [comments,setComments] = useState('')
    const [no_of_comments,set_No_of_comments] = useState(props.no_of_comments)
    const [post_button,toggle_post_button] = useState(false);
    const [isVisible_comments,toggle_comments] = useState(false);
    const context = useContext(BlogContext)
    // console.log(context);
    function handletextarea (e){
        console.log(e);
        if(e.target.value === ""){
            toggle_post_button(false)
        }else{
            toggle_post_button(true)
        }
    }

    async function handleCommentsButton(e){
        e.preventDefault();
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }
        await blog.get(`posts/${props.post_id}/comments`,options)
        .then((response)=>{
            console.log(`Comments.of a post ${props.post_id}`,response.data);
            setComments(response.data)
            // context.updateComments({
            //     type:'RECIEVE',
            //     payload:response.data,
            //     post_id:props.post_id,
            // })
            toggle_comments(!isVisible_comments)
        })
        .catch(error =>{
            console.log(error);
            alert("Kindly Login Or Register to See the Comments")
        })        
    }

    async function handleLike(e){
        e.preventDefault();
        const data = {
            user:1,
            post:props.post_id
        }
        let bool
        const likedata = {
                post:props.post_id
        }
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }
        await blog.post('likes/1/Is_already_liked/',likedata,options)
        .then((response)=>{
            console.log(response.data);
            
            bool = response.data
        }).catch(error =>{
            console.log(error.response);
            alert("Kindly Login Or Register to do Like")
        });
        if(!bool){
        await blog.post('likes/',data,options)
        .then((response)=>{
            console.log(context);
            context.updateLikes({
                type:'CREATE',
                data:response.data})
        })
        .catch(error =>{
            console.log(error.response);
            alert("Kindly Login Or Register to do Like")
        })
        }else{
            await blog.delete(`likes/${props.post_id}`,options)
        .then((response)=>{
            console.log(response.data);
            context.updateLikes({
                type:'DELETE',
                data:response.data})
        })
        .catch(error =>{
            console.log(error.response);
            alert("Kindly Login Or Register to do Like")
        })
        } 
    }
    
    async function postComment(e){
        const data = {
            user:context.username,
            post:props.post_id,
            content: commentareaRef.current.value,
        }
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }
        await blog.post('comments/',data,options)
        .then((response)=>{
            console.log(comments);
            console.log(response.data);
            const data={
                comment_id:response.data.comment_id,
                user:response.data.user,
                post:response.data.post,
                content:response.data.content,
                created_at:new Date(),
                username:context.username,
            }
            set_No_of_comments(no_of_comments + 1)
            // context.updateComments({
            //     type:'POST',
            //     payload:response.data,
            //     post_id:props.post_id,
            // })
            setComments([...comments,data])
        })
        .catch(error =>{
            console.log(error.data);
            alert("Kindly Login Or Register to Post a Comment")
        })   
    }

    async function handleDeletePost(e){
        e.preventDefault();
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }
        await blog.delete(`posts/${props.post_id}`,options)
        .then((response)=>{
            console.log(response.data);
            context.updatePosts({
                type:'DELETE',
                data:response.data})
        })
        .catch(error =>{
            console.log(error.response);
            alert("Kindly Login Or Register to delete Posts")
        })
    }

    // console.log("props of post : ",props);
    if(props.username === context.username){
        var dustbin =<a href="google.com" onClick={handleDeletePost} alt = "google.com" className="dustbin card-link"><small><img src="https://img.icons8.com/carbon-copy/30/000000/delete-forever--v1.png"/></small></a>
    }else{
        var dustbin = <p/>
    }

    function deleteComments(data) {
        // props.no_of_comments = props.no_of_comments -1
        set_No_of_comments(no_of_comments - 1)
        setComments(data)
    }

    console.log(context.comments);
    
    const button = <button type="button" onClick={postComment} className="comment_post_buttom float-right btn-sm btn btn-outline-primary">POST</button>
    return (
        <div className="card" style={{"width": "100%"}}>
            <div className="post card-body">
                <h5 className="card-title">{props.username}</h5>
                {dustbin}
                <p className="card-text postcontent"> {props.content}</p>               
                <div className = "row">
                    <textarea ref={commentareaRef} placeholder="Comment" onChange={handletextarea}  rows='1' className="mt-3 textarea card"/>
                    {post_button ? button : post_button}
                </div>
                <a href="google.com" className="card-link"><small><TimeAgo datetime={props.created_at} locale='en_IN'/></small></a>
                <a href="google.com" onClick={handleCommentsButton} className="comment card-link"><img src="https://img.icons8.com/ios/20/000000/speech-bubble-with-dots.png" alt = "google.com" /> {no_of_comments} Comments</a>
                <a href="google.com" onClick={handleLike} className="like card-link"><img src="https://img.icons8.com/android/20/000000/like.png" alt = "google.com"/>{props.no_of_likes} Likes</a>
            </div>
                {
                isVisible_comments ? comments.map((comment,index)=>
                <Comment key={index} comments={comments} setComments={deleteComments} post_id={props.post_id} comment_id = {comment.comment_id} content={comment.content} username={comment.username} post={comment.post} created_at={comment.created_at} />)
                 : isVisible_comments
                }
        </div>
        
    )
}

export default Post
