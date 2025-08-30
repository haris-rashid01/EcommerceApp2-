import React, { createContext, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalFunctionContext = createContext();

export const GlobalFunctionProvider = ({ children }) => {
  const contactRef = useRef(null);
  const navBarRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const scrollToUp = useCallback(() => {
    navBarRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [])

  const scrollToContact = useCallback(() => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);


  const handleLogin = useCallback(() => {
    navigate('/');
    console.log("Callinglogin");
  }, [navigate]);

  const handleSignUp = useCallback(() => {
  navigate('/SignUp');
  console.log("CallingSignUp");
  }, [navigate]);

  const handleAbout = useCallback(() => {
    navigate('/About');
    console.log("CallingAbout");
  }, [navigate]);

  const handleProducts = (item) => {
    setSelectedProduct(item);
    navigate('/productPage');
    console.log("CallingProducts");
  };


  return (
    <GlobalFunctionContext.Provider
      value={{
        scrollToContact,
        scrollToUp,
        handleLogin,
        handleSignUp,
        handleAbout,
        handleProducts,
        contactRef,
        navBarRef,
        selectedProduct,
      }}
    >
      {children}
    </GlobalFunctionContext.Provider>
  );
};
