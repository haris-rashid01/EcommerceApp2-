import React, { useContext } from 'react';
import '../App.css';
import Myfooter from '../components/footer';
import Navbar from '../components/navbar';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CustomButton from '../components/button';
import { ProductContext } from '../context/productContext';
import { GlobalFunctionContext } from '../context/functionsContext';
import { ThemeContext } from '../context/themeContext';
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import { useNavigate } from 'react-router-dom';

function ProductPage() {
    const { selectedProduct: product } = useContext(ProductContext);
    const { navBarRef, handleLogin, handleSignUp, handleAbout, scrollToContact } = useContext(GlobalFunctionContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCart = () => {
        console.log(product);
        
        dispatch(addToCart(product));
        navigate("/CartScreen");
    };

    return (
        <div style={{ background: theme.background, color: theme.text }}>
            <Navbar
                navRef={navBarRef}
                onLogin={handleLogin}
                onSignUp={handleSignUp}
                onAbout={handleAbout}
                onContact={scrollToContact}
            />
            <div className="product">
                <LazyLoadImage style={{ height: 300, width: 300 }} src={product.image} alt="no-image" />
                <h3>{product.name}</h3>
                <b>Price: ${product.price.toLocaleString()}</b>
                <br />
                <b>Category {product.category} </b>
                <p>{product.description}</p>
                <CustomButton onClick={handleCart} label="Add to Cart" />
            </div>
            <Myfooter />
        </div>
    );
}
export default ProductPage;
