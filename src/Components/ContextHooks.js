import {useReducer} from 'react'

const blogReducer =(state,action)=>{
    switch(action.type){
        case 'customer':
            console.log("Fetched DATA : ",action.payload);
            return {
                
            };
            default:
            return state
    }
}

function useBlog(defaultState){
    const[state,dispatch] = useReducer(blogReducer,defaultState);
    
    return [state,dispatch]
}

export default useBlog
