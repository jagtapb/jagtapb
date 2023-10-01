import { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();
      await axios.post('register', {
        name,
        email,
        password
      });
      setRedirect(true);
    };

    if(redirect) {
      return <Navigate to="/login" />
    }

    return <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

        <div className="form-floating">
          <input required type="text" className="form-control" id="floatingName" placeholder="Name"
            onChange={ e => setName(e.target.value)} />
          <label htmlFor="floatingName">Name</label>
        </div>
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

        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; Bhushan Jagtap - 2023</p>
      </form>
    </main>
};