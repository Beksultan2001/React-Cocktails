import React, { useState, useEffect } from "react";
import Loading from "./loading";
import "./Home.css";
import { Link } from "react-router-dom";
import {useGlobalContext} from '../Context';
import Set from '../components/setFetch';


const Home = () => {

    const {searchTerm,setSearchTerm,basket,setBasket} = useGlobalContext();

    const [loading, setLoading] = useState(null);
    const [items, setItem] = useState([]);
    const [sort, setSort] = useState([])
    const [page, setPage] = useState(1);

 
    useEffect(() => {

    setLoading(true);

    async function fetchUrl() {

      try {
          
        let newInfo = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        let data = await newInfo.json();
        const { drinks } = data;

        if (drinks) {
          const list = Set(drinks);
          setSort(list)
          let newList = [];
          list[page].map((t) =>{
            const {
              idDrink: id,
              strDrink: name,
              strDrinkThumb: img,
              strGlass: info,
              strCategory: category,
              boolean
              } = t;
              let newObj = {
                id: id,
                name: name,
                img: img,
                info: info,
                category: category,
                boolean: false
              }
              newList.push(newObj)
          });
          setItem(newList);
        }else{
          setItem([])
        }
      } catch (error) {
        
        console.log(error)

      }

      setLoading(false);
    }
    fetchUrl();
   

  }, [searchTerm,page]);

  const setIndex = (index) =>{

    setPage(index);

  }

  const sendItem = (id) =>{

    let newArray = [];

    let just = basket.some((t) =>{
      return t.id === id
    });
    let test = items.filter((t) =>{
      return t.id === id
    });

    if(!just){
      let tek = [...basket,...test]
      setBasket(tek);
    }
    else{
      let newItem = basket.filter((t) =>{
        return t.id !== id
      })
      setBasket(newItem);
    }
    
    items.map((t) =>{

      if(t.id === id){

        if(t.boolean){
          t.boolean = false;
        }else{
          t.boolean = true;
      }
      }

      newArray.push(t)
      
    })

    setItem(newArray)

    console.log(newArray,basket)

  }

  const nextBtn = () =>{

    let number ;

    if(page >= sort.length-1){

      number = 0

    }else{
      number = page + 1

    }
    console.log(number)
    setPage(number)

  }

  const prevBtn = () =>{
    let number ;
    if(page <  1){
      number = sort.length - 1
    }else{
      number = page - 1
    }
    console.log(number)
    setPage(number)
  }

  if (loading) {
    return <Loading />;

  } if (items.length <  1) {

    return (
      <h2 className='section-title'>
        no cocktails matched your search criteria
      </h2>
    )
  }

    return (

      <div className="move">
        <div className = "main">

            <h2 className = "title">Cocktails</h2>
            <ul className="container">
            {items.map((item) => {

                const {
               id,
              name,
               img,
                info,
                category,
                boolean
                } = item;

                let just = basket.some((t) =>{

                  return t.id === id 
  
                });
              
                return (
                <li key={id} className="item">
                    <div className="image">
                    <img src={img} />
                    </div>
                    <div className="item_info">
                    <h2>{name}</h2>
                    <h3>{info}</h3>
                    <h4>{category}</h4>
                    <Link to={`/home/${id}`}>
                        <button className="btn btn-more">More Detail</button>
                    </Link>
                    </div>
                </li>
                );
            })}
            </ul>
            <div className = "three">
              <span className = "prev" onClick = {() => prevBtn()}>prev</span>
              <ul className = "pages">
                {sort.map((_,index) =>{

                  return <li className = {`${page === index ? 'page active' : 'page'}`} key = {index} onClick = {() =>

                  setIndex(index)}>{index+1}</li>
                })}
              </ul>
              <span className = "next"  onClick = {() => nextBtn()}>next</span>

            </div>
   
        </div>
        
      </div>
    );
  
};
export default Home;
