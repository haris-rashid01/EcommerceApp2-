import "./App.css";
import { Routes, Route } from "react-router-dom";

import React, { lazy, Suspense, useEffect } from "react";
import store from "./components/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./components/store";
import axiosInstance from "./hooks/axios";
import { ProductProvider } from "./context/productContext";
import { GlobalFunctionProvider } from "./context/functionsContext";
import { fun } from "./screens/SignUp";
import { ThemeProvider } from "./context/themeContext";
import Cookies from "js-cookie";
import axios from "axios";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./screens/dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GitHubCallback from "./screens/GitHubCallback";
import FacebookCallback from "./screens/FacebookCallback";
import CartScreen from "./screens/CartScreen";
import AdminRoute from "./components/adminProtected";

const Main = lazy(() => import("./screens/Main"));
const About = lazy(() => import("./screens/about"));
const ProductPage = lazy(() => import("./screens/productPage"));
const Login = lazy(() => import("./screens/Login"));
const SignUp = lazy(() => import("./screens/SignUp"));
global.axios = axiosInstance;

function App() {
  return (
    <GoogleOAuthProvider clientId="182936880032-0dlh0lj0516ivn567fccj0703s1gem1e.apps.googleusercontent.com">
      <ThemeProvider>
        <GlobalFunctionProvider>
          <ProductProvider>
            <Provider store={store}>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                  </div>
                }
              >
                <PersistGate loading={null} persistor={persistor}>
                  <Routes>
                    <Route
                      path="/Main"
                      element={
                        <ProtectedRoute>
                          <Main />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/dash" element={<AdminRoute><Dashboard /></AdminRoute>} />
                    <Route path="/About" element={<About />} />
                    <Route path="/ProductPage" element={<ProductPage />} />
                    <Route path="/" element={<Login />} />
                    <Route
                      path="/SignUp"
                      element={<SignUp />}
                      loader={() => {
                        fun();
                      }}
                    />
                    <Route path="/CartScreen" element={<CartScreen />} />
                    <Route
                      path="/github-callback"
                      element={<GitHubCallback />}
                    />
                    <Route
                      path="/facebook-callback"
                      element={<FacebookCallback />}
                    />
                  </Routes>
                </PersistGate>
              </Suspense>
            </Provider>
          </ProductProvider>
        </GlobalFunctionProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
