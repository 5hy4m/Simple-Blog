import React,{useState,useRef,useContext} from 'react'
import '../css/Comment.css'
import Reply from './Reply'
import TimeAgo from 'timeago-react';
import blog from '../api/blog';
import {BlogContext} from './Home'

function Comment(props) {
    const [reply_textarea,toggle_reply_textarea] = useState(false);
    const [replies,setReplies] = useState('')
    const [reply_button,toggle_reply_button] = useState(false);
    const replyAreaRef = useRef(null)
    const context = useContext(BlogContext)

    function handleReplyArea(e){
        // console.log("cmommetn",e.target,);
        if(e.target.value === ""){
            toggle_reply_button(false)
        }else{
            toggle_reply_button(true)
        }
    }

    async function postReply(e){
        const data = {
            user:context.username,
            post:props.post_id,
            comment:props.comment_id,
            content: replyAreaRef.current.value,
        }
        console.log(data);
        
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }        
        await blog.post('replies/',data,options)
        .then((response)=>{
            console.log(replies);
            console.log(response.data);
            const data={
                user:response.data.user,
                comment:response.data.comment_id,
                content:response.data.content,
                created_at:new Date(),
                username:context.username,
            }
            setReplies([...replies,data])
        })
        .catch(error =>{
            console.log(error.data);
            alert("Kindly Login Or Register to Post the Replies")
        }) 
    }

    async function handleReplyView(e){
        e.preventDefault();
        const options={
            headers:{"Authorization" : `Token ${context.token}`}
        }
        await blog.get(`comments/${props.comment_id}/replies`,options)
        .then((response)=>{
            console.log(`Replies.of a Comment ${props.comment_id}`,response.data);
            setReplies(response.data)
            toggle_reply_textarea(!reply_textarea)
        })
        .catch(error =>{
            console.log(error.data);
            alert("Kindly Login Or Register to See the Replies")
        }) 
    }

    async function handleDeleteComment(e){
        e.preventDefault();
        const options={
            headers:{"Authorization" : `Token ${context.token}`},
            data:{
                post:props.post_id
            }
        }
        await blog.delete(`comments/${props.comment_id}`,options)
        .then((response)=>{
            console.log(response.data);
            let comments_copy = props.comments.filter((x)=> x.comment_id != response.data.comment)    
            props.setComments(comments_copy)
        })
        .catch(error =>{
            console.log(error);
            alert("Kindly Login Or Register to delete Comments")
        })
    }
 

    if(props.username === context.username){
        var dustbin =<a href="google.com"  onClick={handleDeleteComment} className="dustbin card-link"><small><img  alt="google.com" src="https://img.icons8.com/carbon-copy/30/000000/delete-forever--v1.png"/></small></a>
    }else{
        var dustbin = <p/>
    }

    const textarea = <textarea ref={replyAreaRef} onChange={handleReplyArea} placeholder="Reply to this comment" rows="1"/>
    const button = <button type="button" onClick={postReply} className="replybutton btn btn-sm btn-outline-primary">reply</button>
    return (
        <div className="commentbody card-body">
                <h5 className="cmt-username card-title">{props.username}</h5>
                <p className="cmt-content card-text">{props.content}</p>
                <a href="google.com" className="card-link"><small><TimeAgo datetime={props.created_at} locale='en_IN' /></small></a>
                    <a href="google.com" onClick={handleReplyView} className="card-link"><small>Reply</small></a>
                    {dustbin}
                <div className = "row">
                    {reply_textarea ? textarea : reply_textarea}
                    {reply_button ? button : reply_button}
                </div>
                
                {
                    reply_textarea ? replies.map((comment,index)=>
                    <Reply key={index}  content={comment.content} username={comment.username}  created_at={comment.created_at} />) 
                    : reply_textarea 
                }
        </div>
    )
}

export default Comment
