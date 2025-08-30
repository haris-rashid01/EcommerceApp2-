import "../App.css";
import Myfooter from "../components/footer";
// import { products } from '../constants/c';
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  fetchProducts,
  selectLoading,
  selectError,
} from "../Slices/productsSlice";
import CustomButton from "../components/button";
import { ProductContext } from "../context/productContext";
import chevron from "../constants/chevron.png";
import searchImg from "../constants/searchImg.png";
import Navbar from "../components/navbar";
import MyMap from "../components/map";
import { GlobalFunctionContext } from "../context/functionsContext";
import { ThemeContext } from "../context/themeContext";
import { logout } from "../Slices/authSlice";

function Main() {
  // const products = useSelector(selectProducts);
      const {products, setProducts} = useContext(ProductContext)
  
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const { setSelectedProduct } = useContext(ProductContext);
  // const [products, setProducts] = useState([]);
  const {loading, setLoading} = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return;

      const expiryTime = decoded.exp * 1000;

      const currentTime = Date.now();

      if (expiryTime <= currentTime) {
        dispatch(logout());
        navigate("/");
        return;
      }

      const timeout = setTimeout(() => {
        dispatch(logout());
        navigate("/");
      }, expiryTime - currentTime);

      return () => clearTimeout(timeout);
    } catch (err) {
      console.error("Invalid token:", err);
      dispatch(logout());
      navigate("/");
    }
  }, [token, dispatch, navigate]);

  
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/Logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch(logout());
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const {
    navBarRef,
    handleLogin,
    handleSignUp,
    handleAbout,
    scrollToContact,
    scrollToUp,
    contactRef,
  } = useContext(GlobalFunctionContext);

  // function useAuthCheck() {

  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch("https://fakestoreapi.in/api/products")
  //     const data = await res.json()

  //     if (JSON.stringify(data.products) !== JSON.stringify(products)) {
  //       setProducts(data.products)
  //     }
  //     setLoading(false)
  //   }
  //   catch (err) {
  //     console.log("Failed to fetch products:", err);
  //     setLoading(false)
  //   }

  // }

  // fetchData()

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch])


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

  const filteredProducts = useMemo(() => {
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handleProducts = (item) => {
    setSelectedProduct(item);
    navigate("/productPage");
  };

  return (
    <div
      className="app"
      style={{ background: theme.background, color: theme.text }}
    >
      <Navbar
        navRef={navBarRef}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onAbout={handleAbout}
        onContact={scrollToContact}
      />
      <div>
      </div>

      <div className="content">
        <h2>Products for Sale</h2>
        <div>
          <img className="searchImg" src={searchImg} alt="noimage" />
          <input
            type="search"
            className="search"
            name="search"
            id="search"
            placeholder="search anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="products">
          {loading ? (
            <div className="spinner"></div>
          ) : (
            filteredProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProducts(item)}
                className={`card ${item.discount > 10 ? "highlight" : ""}`}
              >
                <LazyLoadImage
                  className="imgProduct"
                  src={item.image}
                  alt="image cannot be found"
                />
                <a>
                  <h4> {item.name}</h4>
                </a>
                <strong>Price: ${item.price.toLocaleString()}</strong>
                <div className="details">
                  <pre>Description: {item.description}</pre>
                  <pre>Category: {item.category}</pre>
                  <pre>Quantity: {item.quantity}</pre>
                </div>
              </div>
            ))
          )}
          <div onClick={scrollToUp}>
            <img className="img" src={chevron} alt="noimage" />
          </div>
        </div>
        <MyMap />
      </div>
      <Myfooter ref={contactRef} />
    </div>
  );
}

export default Main;
