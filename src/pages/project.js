import React from 'react';
import {useGlobalContext} from '../Context';


const Project = () =>{


    const {basket,setBasket} = useGlobalContext();


    return (
        <div>
            {basket.map((t) =>{

                const {name} = t;

                return <h1>{name}</h1>

            })}
        </div>
    )

}

export default Project;