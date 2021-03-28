import React,{useState,useContext,useEffect} from 'react';


const AppContext = React.createContext()


const AppProvider = ({children}) =>{

    
    const [searchTerm, setSearchTerm] = useState('a');
    const [basket, setBasket] = useState([])

    return (
        <AppContext.Provider value = {{searchTerm,setSearchTerm,basket,setBasket}}>
            {children}
        </AppContext.Provider>
    )

    
};

export const useGlobalContext = () => {

    return useContext(AppContext)

  }
  
  export { AppContext, AppProvider }
