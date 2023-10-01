import { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errorText, setErrorText] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post('login', {
            email,
            password
            }, {withCredentials: true});
        if (axios.isAxiosError(response) && response.response?.status === 401) {
            alert(response?.response?.data?.error + ' => ' +response?.response?.data?.message);
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data?.token}`;
            setRedirect(true);  
        }
    };

    if(redirect) {
      return <Navigate to="/" />
    }

    return <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

        <div className="form-floating">
          <input required type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
            onChange={ e => setEmail(e.target.value)} />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" 
            onChange={ e => setPassword(e.target.value)} />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {/* {errorText && ( */}
          <div className="invalid-feedback">{errorText}</div>
        {/* )} */}
        <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; Bhushan Jagtap - 2023</p>
      </form>
    </main>
};