import React,{useState,useContext,useEffect} from 'react';
import '../components/Home';
import { useGlobalContext } from '../Context'



const Search = () =>{

    
    const {searchTerm,setSearchTerm} = useGlobalContext();

    const Search = (e) =>{

        setSearchTerm(e.target.value)
    }

    return (

        <form className="search-form">
            <div className="form-control">
            <label htmlFor="name">search your favorite cocktail</label>
            <input type="text"  name="name" id="name" onChange = {(e) => Search(e)} />
            </div>
        </form>

    )


}

export default Search;