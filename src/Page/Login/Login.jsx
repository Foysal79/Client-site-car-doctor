
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
const Login = () => {
    const {signIn} = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const handelLogin = e => {
        e.preventDefault();
        e.preventDefault();
        const form = e.target;
        
        const email = form.email.value;
        const password = form.password.value;

        const user = {
            email,
            password
        }
        console.log(user);
        signIn(email, password)
        .then(result => {
          const loggedInUser = result.user;
            console.log(loggedInUser);
            const user = {email};
            

            // get access token
            axios.post('http://localhost:5000/jwt', user, {withCredentials : true })
            .then(res => {
              console.log(res.data);
              if(res.data.success)
              {
                navigate(location?.state ? location?.state : '/')
              }
            })

        })
        .catch(error =>  {
            console.log(error);
        })
        
    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center w-1/2 lg:text-left mr-10">
      
      <img src={logo} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <h1 className="text-5xl font-bold">Login</h1>
      <form onSubmit={handelLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Login</button>
        </div>
      </form>
      <p className='text-base font-semibold'>Have an account?
      <Link className='text-2xl font-bold' to='/signUp' >Sign Up</Link> </p>
    </div>
  </div>
</div>
    );
};

export default Login;