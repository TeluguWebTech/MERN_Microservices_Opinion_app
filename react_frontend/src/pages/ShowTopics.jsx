import React, { useEffect, useState } from 'react'
import { showTopicUrl } from '../api_url'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './ShowTopics.css'

const ShowTopics = () => {
    const [topics, setTopics] = useState([])

    const topicHandler = async()=>{
        try {
            const response = await axios .get(showTopicUrl)
            // console.log(response.data)
            setTopics(response.data.result)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        topicHandler()
    }, [])
  return (
    <div className='topicSection'>
        {topics.map((item)=>{
            return(
                <div className="topicRecord" key={item.title}>
                   <h2>{item.title}</h2>
                   <p>{item.desc}</p>
                   <div className="seeOps">
                    <Link to={`/single/topic/${item._id}`}>
                    <button>Post your Opinion</button>
                    </Link>
                    <Link to={`/single/topic/${item._id}`}>
                    <button>See Opinions</button>
                    </Link>
                   </div>
                </div>
            )
        })}
    </div>
  )
}

export default ShowTopics