import React, { use, useEffect, useState } from 'react'
import { showCommentUrl } from '../api_url'
import { singleTopicUrl } from '../api_url'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { postCommUrl } from '../api_url'
import "./SingleTopic.css"

const SingleTopic = () => {
    const {id} = useParams()
    const [comment, setComment] = useState([])
    const [topic, setTopic]= useState({})
    const [userId, setUserId]= useState(localStorage.getItem("userId"))
    const [topicId, setTopicId]= useState(id)
    const [userName, setUserName]= useState("")
    const [message, setMessage] = useState("")
    const [commentId, setCommentId] = useState("")
    const navigate = useNavigate()

    const token = localStorage.getItem("user_token")

        
const commentHandler = async (e) => {
    e.preventDefault();

    if (!token) {
        alert("Please login to add your opinion");
        navigate("/user/login");
        return;
    }

    try {
        const response = await axios.post(
            postCommUrl,
            { topicId, userId, userName, message },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Opinion posted successfully");

        setMessage("");
        await topicHandler();

    } catch (error) {
        console.error(
            "Error posting opinion:",
            error.response?.data || error.message
        );
    }
};
    
    const topicHandler = async()=>{
        try {
            const response = await axios.get(`${showCommentUrl}/${id}`)
            setCommentId(response.data.result[0]?._id ||"")
            setComment(response.data.result)

            const topicResponse = await axios.get(`${singleTopicUrl}/${id}`)
            setTopic(topicResponse.data.record)

        } catch (error) {
            
        }
    }
    useEffect(()=>{
        topicHandler()
    },[id])


  return (
    <div>
          <div className="singleTopicPage">
                        <h1>{topic.title}</h1>
                    </div>
<div className="commSection">
            {comment.map((item)=>{
            return(
                <div className="commRecord" key={item._id}>
                  
                    <div className="">
                        {item.userName}
                    </div>
                    <div className="">
                        {item.message}
                    </div>
                   
                </div>
            )
        })}
</div>
        <div className="">
             <div className="">
                        <form onSubmit={commentHandler}>
                            <div className="postComm">
                                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                                <br /><br />
                        <textarea className='postArea'
                         value={message} 
                         onChange={(e)=>setMessage(e.target.value)}
                         cols={80} rows={10}
                         />
                        <br />
                        <button type='submit'>Post you Opinion</button>
                            </div>
                        </form>
                    </div>
        </div>
    </div>
  )
}

export default SingleTopic