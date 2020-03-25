import React from 'react'
import Post from './Post'
import Navbar from './Navbar'
import blog from '../api/blog';
import { BoxLoading } from 'react-loadingg';
import RegistrationModal from './Modals/RegistrationModal'
import LoginModal from './Modals/LoginModal'
import PostField from './PostField'

export const Context = React.createContext();

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            username:null,
            posts: {},
            likes:{},
            replies: {},
        }
    }

    async componentDidMount() {
        const token = "36d2304b778f872f2d08cbc2364cf5540cd1a9a6"
        const options = {
            headers: {'Authorization': `Token ${token}`}
          };
        await blog.get("posts/",options)
        .then(response => {
            console.log("posts",response.data);
            this.setState({
            loading:false,
            posts:response.data
       });
     },
     error =>{
         console.log(error);   
     }
     )
    }

    setPosts = (data)=>{
        console.log(data);
        
    }
    setComments = (data)=>{
        console.log(data);
        
    }
    setReplies = (data)=>{
        console.log(data);
    }
    setLikes = (data)=>{
        console.log(data);
        const posts = [...this.state.posts]
        console.log(posts); 
        const post = posts.filter((x)=> x.post_id === data.post_id)
        post.no_of_likes = post.no_of_likes + 1
        posts.forEach(element => {
            if(element.post_id === data.post_id)
                element.no_of_likes = post.no_of_likes
        });
        this.setState(posts)
        console.log("changed posts",posts);
        
        this.setState(data)
    }


    render() {
        if(this.state.loading){
            var post = <BoxLoading />
        }else{
            post = this.state.posts.map((post,index)=>
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
        return (
            <Context.Provider
                value = {{
                    posts:this.state.posts,
                    comments:this.state.comments,
                    replies:this.state.replies,
                    setPosts:this.setPosts,
                    setComments:this.setComments,
                    setReplies:this.setReplies,
                    setLikes:this.setLikes.bind(this),
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
            </Context.Provider>
        )
    }
}
export default Home
