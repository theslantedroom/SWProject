import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setProducts] = useState([]);


  // fetch data
  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('data from usefetch',data.results);
    setProducts(data);
    setLoading(false);
  }

    useEffect(() => {
    getProducts();
    // envoke when url changes
  }, [url]);

//   custom hook return obj
return {loading, data:data}

};
