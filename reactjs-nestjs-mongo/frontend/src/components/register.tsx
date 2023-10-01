import { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();
      if(!isSubmitDisabled) {
        await axios.post('register', {
          name,
          email,
          password
        });
        setRedirect(true);  
      }
    };

    const validatePassword = (value: string) => {
      const minLength = 8;
      const letterPattern = /[a-zA-Z]/;
      const numberPattern = /[0-9]/;
      const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
      if (
        value.length < minLength ||
        !letterPattern.test(value) ||
        !numberPattern.test(value) ||
        !specialCharPattern.test(value)
      ) {
        setValidationError(
          "Password must contain at least 8 characters, 1 letter, 1 number, and 1 special character."
        );
        setIsSubmitDisabled(true);
      } else {
        setValidationError("");
        setIsSubmitDisabled(false);
      }

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
            onChange={ e => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }
             } />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {validationError && <p className="error">{validationError}</p>}

        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; Bhushan Jagtap - 2023</p>
      </form>
    </main>
};