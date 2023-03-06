import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';

const Login = () => {
  const { loading } = useSelector((state) => state.loader);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onEmailChange = (event)=>{
    setEmail(event.target.value)
  }
  const onPassChange = (event)=>{
    setPassword(event.target.value)
  }
  const onSubmit = ()=>{
    dispatch(ShowLoading())
      axios({
        method: "POST",
        data: {
        email,
        password
      },
      withCredentials: true,
      url: "http://localhost:4000/api/users/login",
    }).then((res)=>{
      console.log(res.data)
      dispatch(HideLoading())
    }).catch((err)=>{
      console.log(err.response.data)
      dispatch(HideLoading())
    });
  }
  return (
    <div className='h-screen bg-primary'>
        <div className='page h-100 '>
          <div className="page-content h-100 w-100 d-flex align-items-center justify-content-center py-5">
            <div className="form-content w-75 d-flex align-items-center justify-content-center h-100 shadow bg-body rounded">
              <div className="form-details p-5 bg-secondary text-white w-50 h-100 rounded-start">
                <h2>INFORMATION</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.</p>
                <div>
                   <p><span className='f-weight-6 me-1'>Eu ultrices: </span>Vitae auctor eu augue ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.</p>
                </div>
                <div className='w-35'>
                  <button to='#' className="account text-black text-sm px-3" onClick={()=>{navigate('/register')}}>Create An Account</button>
                </div>
              </div>
              <div className="form-left p-5 w-50 h-100 bg-white rounded-end ">
                <h2 className='text-center pb-3'>Login</h2>
                <div className="form-row p-2">
                    <label className='mb-2' htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" className='input-text' onChange={onEmailChange}/>
                </div>
                <div className="form-row p-2">
                    <label className='mb-2' htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="input-text"  onChange={onPassChange}/>
                </div>
                <div className="form-row pt-5 px-2 ">
                    <button className='w-100 bg-secondary text-white' onClick={onSubmit}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login
