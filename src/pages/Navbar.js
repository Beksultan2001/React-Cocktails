import React,{useState,useRef, useEffect} from 'react';
import {FaBars, FaTwitter} from 'react-icons/fa';
import {links, social} from '../data';
import '../App.css'
import logo from '../logo.svg';
import { Link } from "react-router-dom";


const Navbar = () =>{

    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);


    useEffect(() =>{

        const linksHeight = linksRef.current.getBoundingClientRect().height;
        
        if(showLinks){
            linksContainerRef.current.style.height = `${linksHeight}px`;

        }else{
            linksContainerRef.current.style.height = '0px'
        }
        
    },[showLinks]);
    

    return (
        <nav>
            <div className = "nav-center">
                <div className = "nav-header">
                    <img src={logo} alt = "logo"/>
                    <button className = "nav-toggle" onClick = {() =>{
                        return setShowLinks(!showLinks)
                    }}>
                        <FaBars />
                    </button>
                </div>
                
                <div className = {`${showLinks ? 'links-container show-container':'links-container'}`} ref = {linksContainerRef}>
                    <ul className = "links" ref= {linksRef}>
                        {links.map((link) =>{

                            const {id,url, text} = link;

                            return <li key = {id}>
                                      <Link to={`${url}`}>
                                        <a className= "just">{text}</a>
                                    </Link>
                            </li> 

                        })}
                    </ul>
                </div>
                
                <ul className = "social-icons">
                    {social.map((items) =>{

                        const {id, url,icon} = items;


                        return (
                            <li key = {id}>
                                <a href = {url}>{icon}</a>
                            </li>
                        )
                        
                    })}
                    
                </ul>

            </div>
        </nav>
    )

}

export default Navbar