import { useEffect, useState } from "react";
import React from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`
console.log(API_URL)

const App = ()=> {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('')
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data =  await response.json();
        setMovies(data.Search)   
    }

    console.log(movies)
    useEffect(() => {
         searchMovies();
    }, []);
    return(
        <div className='app'>
                <h1>Movies</h1>
            <dvi className='search'>
                <input 
                placeholder='Search for movies'
                value= {searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img src={SearchIcon} 
                alt='Search'
                onClick={() =>searchMovies(searchTerm)}/>
            </dvi>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => 
                        <MovieCard movie={movie} />
                    )}
                </div>
            ) : (
                <div className='empty'> 
                        <h3> there are no movies wit that title</h3>
                </div>
            )
            }
        </div>
    )
}

export default App