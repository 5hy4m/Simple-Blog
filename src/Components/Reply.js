import React,{useContext} from 'react'
import '../css/Reply.css'
import TimeAgo from 'timeago-react';
import {BlogContext} from './Home'

function Reply(props) {
    const context = useContext(BlogContext);

    function handleDeleteReply(e){
        e.preventDefault();
        
    }

    if(props.username === context.username){
        var dustbin =<a href="google.com" onClick={handleDeleteReply} className="dustbin card-link"><small><img src="https://img.icons8.com/carbon-copy/30/000000/delete-forever--v1.png"/></small></a>
    }else{
        var dustbin = <p/>
    }
    return (
        <div className="commentbody card-body">
                <h5 className="cmt-username card-title">{props.username}</h5>
                <p className="cmt-content card-text">{props.content}</p>
                <a href="google.com" className="card-link"><small><TimeAgo datetime={props.created_at} locale='en_IN' /></small></a>
                {dustbin}
        </div>
    )
}

export default Reply
