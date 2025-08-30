import React, { forwardRef } from 'react'
import { ThemeContext } from '../context/themeContext'
import { useContext } from 'react';

const Myfooter = forwardRef((props, ref) => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer ref={ref} className='footer' style={{ background: theme.footerBg, color: theme.text }}>
        <div>
          <h1>Contact</h1>
          <p>Email: sample.channel@gmail.com</p>
          <p>Phone Number: 03214385757</p>
        </div>
        <div className='feedback'>
          <label htmlFor="email">Enter your email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="comment">Enter a comment</label>
          <textarea className='comment' name="comment" id="comment"></textarea>
          <button className='cSubmit' type="submit">Submit</button>
        </div>
      </footer>
  )
})

export default Myfooter