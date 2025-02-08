import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';

const PopularAuthor = () => {
  const [authors, setAuthors]=useState([]);
  useEffect(()=>{
    const fetchUser=async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_REACT_APP}/api/user/authors`,
        {
          withCredentials:true
        });
        setAuthors(data.authors);
    };
    fetchUser();
  },[]);
  return (
    <section className='popularAuthors'>
      <h3>Popular Authors</h3>
      <div className='container'>
         {
          authors && authors.length > 0 ? (authors.slice(0,4).map(element=>{
            return(
              <div className='card' key={element._id}>
                <img src={element.avatar.url} alt="author" />
                <p>{element.name}</p>
                <p>{element.role}</p>
              </div>
            )
          })) : (<BeatLoader size={30} color='gray'/>)
         }
      </div>
    </section>
  )
}

export default PopularAuthor
