import React,{useState,useEffect} from 'react'
import Post from './Post'
import Navbar from './Navbar'
import blog from '../api/blog';
import { BoxLoading } from 'react-loadingg';
import RegistrationModal from './Modals/RegistrationModal'
import LoginModal from './Modals/LoginModal'
import PostField from './PostField'

export const BlogContext = React.createContext();

function Home() {
    const[loading,setLoading]= useState(true)
    const[posts,setPosts]= useState([])
    const [reset,toggleReset] = useState(true)
    const [comments,setComments] = useState([])
    // const[likes,setLikes]= useState([])
    // const[replies,setReplies]= useState([])
    const[token,setToken] = useState(localStorage.getItem("token"))
    const[username,setUserName] = useState(localStorage.getItem("username"))

    if(loading){
        var post = <BoxLoading />
    }else{
        post = posts.map((post,index)=>
            <Post 
                key = {index}
                username = {post.username}
                content = {post.content}
                no_of_likes = {post.no_of_likes}
                no_of_comments = {post.no_of_comments}
                created_at = {post.created_at}
                post_id = {post.post_id}

                />
        )
    }

    useEffect(() => {
        async function fetch_posts(){
        console.log();
        await blog.get("posts/")
        .then(response => {
            console.log("posts",response.data);
            setLoading(false)
            setPosts(response.data)        
     })
     .catch(error =>{
        console.log(error.data);
        alert("Kindly Login Or Register to post a Comment")
    })
}
     fetch_posts();
    },[])


    function updatePosts(data){
        console.log(data);
        if(data.type === 'CREATE'){
            console.log(data.data);
            console.log(posts);
            setPosts([data.data,...posts])
            toggleReset(!reset)
        }
        if(data.type === 'DELETE'){
            
            let posts_copy = posts.filter((x)=> x.post_id != data.data.post)
            console.log(posts_copy,data.data);
            setPosts(posts_copy)
        }
    }

    function updateLikes(data){
        if(data.type === 'CREATE'){
        const posts_copy = posts.map((x)=>{
            if(x.post_id === data.data.post){
                x.no_of_likes = x.no_of_likes + 1
                return x 
            }
            return x
        })
        console.log("changed posts",posts_copy);
        setPosts(posts_copy)
    }
    if(data.type === 'DELETE'){
        
        const posts_copy = posts.map((x)=>{
            if(x.post_id === data.data.post){
                x.no_of_likes = x.no_of_likes - 1
                return x 
            }
            return x
        })
        console.log("changed posts",posts_copy);
        setPosts(posts_copy)
    }
    }
    function updateComments(data){
        console.log(data);
        if(data.type='RECIEVE'){
            const post_id = data.post_id
            setComments({post_id:data.payload})
        }
        if(data.type='POST'){
            const post_id = data.post_id
            const copy = comments.push({
                key:post_id,
                value:data.payload
            })
            setComments([...copy])
        }
        if(data.type="DELETE"){}
    }

    function NewUser(data){
        console.log("newuser");
        
        setToken(data.token)
        setUserName(data.username)
    }    

    return (
        <BlogContext.Provider
                value = {{
                    posts:posts,
                    updatePosts,
                    NewUser,
                    username,
                    token,
                    reset,
                    updateLikes,
                    updateComments,
                    comments
                    }}
            >
                <div className="container">
                    <Navbar/>
                    <div className="jumbotron">
                        <PostField />
                        {post}
                    </div>
                </div>
                <RegistrationModal />
                <LoginModal/>
            </BlogContext.Provider>
    )
}

export default Home
