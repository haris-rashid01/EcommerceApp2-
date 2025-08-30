import {createContext, useState } from "react";
import { useEffect } from "react";

export const ProductContext = createContext()

export const ProductProvider = ({children}) =>{

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          credentials: "include",
        });
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


    return(
       <ProductContext.Provider value={{selectedProduct, setSelectedProduct, products, setProducts, loading, setLoading}}>
        {children}
       </ProductContext.Provider>
    )
}