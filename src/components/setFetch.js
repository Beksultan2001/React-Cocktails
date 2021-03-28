


function setFetch(drinks){

    const itemsPerpage = 6;

    const amountOfPage =  Math.ceil(drinks.length / itemsPerpage)

    const array = Array.from({length: amountOfPage}, ( a ,index) =>{

        
        const start = index * itemsPerpage;

        return drinks.slice(start,start + itemsPerpage)

    });

    return array


}

export default setFetch