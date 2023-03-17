import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIkey } from '../../common/apis/MovieApiKey'
import { useDispatch } from 'react-redux'

export const fetchAsyncMovies=createAsyncThunk('movies/fetchAsyncMovies',async(term)=>{
   
    const response =await movieApi.get(`?apikey=${APIkey}&s=${ term }&type=movie `)
    console.log('the response from Api',response)
   return response.data;

})

export const fetchAsyncShows=createAsyncThunk('movies/fetchAsyncShows',async(term)=>{
    
    const response =await movieApi.get(`?apikey=${APIkey}&s=${ term }&type=series`)
    console.log('the response from Api',response)
   return response.data;

})

export const fetchAsyncMoviesShowDetail=createAsyncThunk('movies/fetchAsyncMoviesShowDetail',async(id)=>{
     
    const response =await movieApi.get(`?apikey=${APIkey}&i=${id}&Plot=full`)
    console.log('the response from Api',response) 
   return response.data;

})
const initialState={
    movies:{},
    shows:{},
    SelectMovieOrShow:{},
    isLoading: false,
    error: null,
}

const movieSlice = createSlice({
    name:'movies',
    initialState,
    reducers:{
          addMovies:(state,{payload})=>{
            state.movies=payload;
        
            
          }
    }, 
    extraReducers:{
        [fetchAsyncMovies.pending]:(state)=>{
          
            state.error = null
          
        },
        [fetchAsyncMovies.fulfilled]:(state,{payload})=>{
            state.isLoading = false
            console.log('Fetched Successfuly')
            return{...state, movies:payload}
        },
        [fetchAsyncMovies.rejected]:()=>{
            console.log('Rejected')
            
        },
        [fetchAsyncShows.fulfilled]:(state,{payload})=>{
            console.log('Fetched Successfuly')
            return{...state, shows:payload}
        },
        [fetchAsyncMoviesShowDetail.fulfilled]:(state,{payload})=>{
            console.log('Fetched Successfuly')
            return{...state,  SelectMovieOrShow:payload}
        },
        
    } 
})
export const{addMovies}=movieSlice.actions

export const getAllMovies=(state)=>state.movies.movies
export const getAllShows=(state)=>state.movies.shows
export const getSelectedMovieOrShow=(state)=>state.movies.SelectMovieOrShow 
export default movieSlice.reducer