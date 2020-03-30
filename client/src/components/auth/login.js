import React, {useState, useContext, useEffect} from 'react'
import AuthContext from './../../context/Auth/AuthContext';
import AlertContext from './../../context/Alert/AlertContext';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { login, isAuthenticated, error, clearErrors } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (error === 'invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error,props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password} = user;

    const onChange = event => {
        setUser({...user, [event.target.name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danget')
        } else {
            login({ email, password })
        }
    } 

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span> </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login
