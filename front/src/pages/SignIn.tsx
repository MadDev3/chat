import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { domen } from '../Config';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function onChange(e: {target: {name: string, value: string}}){
        const target = e.target;
        switch(target.name){
            case 'email':
                setEmail(target.value)
                break;
            case 'password':
                setPassword(target.value)
                break;
        }
    }

    function Auth() {
        const url: string = `${domen}/auth/login`;
        let user = {
            email: email,
            password: password
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.token){
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('email', email);
                    navigate('/chat');
                }
        })
    }

    return (
        <div className="mx-5 mt-2">
            <Link to="/">Sign Up</Link>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={onChange} value={email} name="email" type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onChange} value={password} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={Auth} variant="primary" type="button">
                    Sign In
                </Button>
            </Form>
        </div>
    );
}

export default SignIn;
