import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {BeatLoader} from 'react-spinners';

const AllAuthor = () => {
  const { mode } = useSelector((state) => state.global);
  const [authors, setAuthors]=useState([]);

  useEffect(()=>{
    const fetchAuthors = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP}/api/user/authors`, {
          withCredentials: true,
        });
          setAuthors(data.authors);
        }
    fetchAuthors();
  }, []);

  return (
    <div className={mode === "dark" ? "dark-bg" : "light-bg"}> {/* Wrapper div for mode */}
    <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}> 
       <h2>ALL AUTHORS</h2>
       <div className="container">
        {
          authors && authors.length > 0 ? (authors.map(element=>{
            return(
              <div className='card' key={element._id}>
                <img src={element.avatar?.url} alt="author_avatar" />
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            )
          })):(<BeatLoader size={30} color="gray" style={{padding:"200px 0"}}/>)
        }
       </div>
    </article>
    </div>
  )
}

export default AllAuthor
