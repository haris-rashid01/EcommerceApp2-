import { useState } from 'react';
import '../App.css';
import LoginSign from '../components/loginsign';
import { useLoaderData, useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

function SignUp() {

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { theme} = useContext(ThemeContext);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/SignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include"
    });
    const data = await res.json();
    setMessage(data.msg);
  }


  // const data = useLoaderData()
  const { id } = useParams()
  return (
    <div className='loginPage'  style={{ background: theme.background, color: theme.text }}>
      <Link to="/">Home</Link>
      {/* <NavLink to="/ContactPage">fdfd</NavLink> */}
      <h1 style={{ textAlign: "center" }}>SignUp {id} </h1>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <label htmlFor="username">Enter your username</label>
          <input name="username" placeholder='Username' onChange={handleChange} />
          
          <label htmlFor="email">Enter your email</label>
          <input type="email" name="email" placeholder='Email' onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password"  placeholder='Password' onChange={handleChange} />

          <button className='loginButton' type="submit">Submit</button>
          <p>{message}</p>
        </div>
      </form>
    </div>

  );
}
export default SignUp;

export const fun = async (params) => {
  const response = await fetch("https://api.github.com/users/hiteshchoudhary")
  return response.json()
}
