import React,{useEffect,useState} from 'react';
import { useParams, Link } from 'react-router-dom'
import './single.css';
import Loading from '../components/loading';


const Single = () =>{

    const { id } = useParams();
    const [loading, setLoading] = useState(null);
    const [items, setItems] = useState({});
    const [incred, setIncredient] = useState([]);


    useEffect(() =>{

        setLoading(true)
        
        async function fetchUrl(){

            try{
                let newInfo = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

                let second = await newInfo.json();
        
                const just = second.drinks.filter((t) =>{
        
                    return t.idDrink == id;
        
                })
        
                let newList = []
        
                let boolean = true;
        
                let i = 1;
        
                while(boolean){
        
                    console.log(items['strIngredient1'])
                    if(items[`strIngredient${i}`]){
                        
                        newList.push(items[`strIngredient${i}`]);
        
                        i++
        
                    }else{
                        boolean = false;
                    }
                    
                }
        
                setItems(...just)
                setIncredient(newList);
            }catch(error){
                console.log(error)
            }
            setLoading(false)


        }

        fetchUrl()


    },[]);

    if(loading){

        return(
            <Loading />
        )

    }else{

        const {strDrink:name, strDrinkThumb:img,strGlass: info,
            strCategory:category, strAlcoholic: type,strInstructions: Instructions} = items;



            return (
                <>

                <div className = "singlePage">
        
                    <Link to='/' className='btn btn-back'>
        
                        <button class = "btn btn-back" >back home</button>
        
                    </Link>
                    <h1>{name}</h1>
        
                    <div className = "singleMain">
                        <div className = "single_image">
                            <img src={img}/>
                        </div>
                        <ul className = "single_info">
                            <li className = "eachInfo"><span>Name:</span>{name}</li>
                            <li className = "eachInfo"><span>Category:</span>{category}</li>
                            <li className = "eachInfo"><span>Info:</span>{type}</li>
                            <li className = "eachInfo"><span>Glass:</span>{info}</li>
                            <li className = "eachInfo"><span>Instructons:</span>{Instructions}</li>
                            <li className = "eachInfo"><span>Ingredients:</span>{incred.map((t,index)=>{
        
                                if(index === 0){
                                    return (
                                        <>
                                           {t} 
                                        </>
                                    )
                                }
                                return (
                                    <>
                                      ,  {t} 
                                    </>
                                )
                             
                            })}</li>
        
                        </ul>
                    </div>
                    
                </div>
                </>
            )
        
    }

   
}

export default Single;