import '../App.css';
import Myfooter from './footer';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword } from '../Slices/formSlice';

function LoginSign() {
  const dispatch = useDispatch();
  const {email, password} = useSelector((state) => state.form)

  return (
    <div className='loginPage'>
      <div className="box">
        <label htmlFor="email">Enter your email</label>
        <input type="email" value={email} name="email" id="email" placeholder='Email' onChange={(e)=> dispatch(setEmail(e.target.value))} />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} name="password" id="password" placeholder='Password' onChange={(e)=> dispatch(setPassword(e.target.value))}/>
        <button className='loginButton' type="submit">Submit</button>
      </div>
        <Myfooter/>
    </div>

  );
}

export default LoginSign;
