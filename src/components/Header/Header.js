import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAsyncMovies,fetchAsyncShows } from '../../features/movies/moviesSlice'
import user from '../../images/user.png'
import './Header.scss'
function Header() {
    const [term, setTerm]=useState('')
    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        if(term==="") return alert('please enter search')
        e.preventDefault()
       
        dispatch(fetchAsyncMovies(term))
        dispatch(fetchAsyncShows(term))
        console.log(term)
        setTerm("")
    }
  return ( 
    <div className='header'>
         <div className='logo'>
        <Link to='/'>
           Movie APP
        </Link>
        </div>
        <div className='search-bar'>
            <form onSubmit={submitHandler}>

                <input type='text' value={term} placeholder='Search Movies or shows' onChange={(e)=>setTerm(e.target.value)}/>
                <button type='submit'>
                    <i className='fa fa-search'></i>
                </button>
            </form>
        </div>
        <div className='user-image'>
        <img src={user } alt='user'/>
        </div>
    </div> 
  )
}

export default Header 