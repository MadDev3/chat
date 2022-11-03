import {useEffect, useRef, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { domen } from "../Config";

interface IUsers {
    email: string;
    password: string;
    id: number;
}

const Chat = (props: any) => {

    const [users, setUsers] = useState<IUsers[]>([]);
    const [user, setUser] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [idTo, setIdTo] = useState();
    const [id, setId] = useState();
    const [block, setBlock] = useState(false);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const socket = useRef()
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        // @ts-ignore
        socket.current = new WebSocket(`ws://localhost:5000`)

        // @ts-ignore
        socket.current.onopen = () => {
            setConnected(true)
            console.log('success')
        }
        // @ts-ignore
        socket.current.onmessage = () => {

        }
        // @ts-ignore
        socket.current.onclose = () => {

        }

        getUsers();
        getId();
        
        if(!localStorage.getItem('email')){
            navigate('/')
        }
    }, [])

    function getUsers() {
        fetch(`${domen}/users`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            });
    }

    function onChange(e: {target: {value: string}}) {
        setMessage(e.target.value);
    }

    function Send() {
        let sms = {
            content: message,
            idFrom: id,
            idTo: idTo
        };
        const url: string = `${domen}/messages`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(sms),
        })
        .then((res) =>  res.json())
        .then((data) => {
            setMessage('');
            fetch(`${domen}/messages/${id}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                    .then((res) => res.json())
                    .then((messages) => {
                        setMessages(messages);
                    })
        })
        
    }

    function getId() {
        const email = localStorage.getItem('email');
        fetch(`${domen}/users/${email}`)
            .then((res) => res.json())
            .then((data) => {
                setId(data.id)
            })
    }

    function chooseUser(id: number) {
        setBlock(true);
        let user = users.find(item => item.id == id);
        if(user)
        setUser(user.email);
        if(user){
            fetch(`${domen}/users/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setIdTo(data.id)
                    fetch(`${domen}/messages/${id}/${id}`)
                        .then((res) => res.json())
                        .then((messages) => {
                            setMessages(messages);
                            console.log(messages)
                        })
                })
        }
    }

    const usersList = users.map(function (user: {email: string, id: number}, index: number) {
        if(user.email === localStorage.getItem('email')){
            return;
        }
        return  <Button key={index} onClick={() => chooseUser(user.id)} variant="primary">
                    {user.email}
                </Button>
    })

    const sms = messages.map(function(message: {content: string, idFrom: number, idTo: number, createdAt: string}, index: number) {
        if((id == message.idFrom || id == message.idTo) && (idTo == message.idFrom || idTo == message.idTo)){
            return  <div key={index} className={id == message.idTo ? 'message right' : 'message'}>
                        <span className="author">{id == message.idTo ? user : localStorage.getItem('email')}</span><br/>
                        {message.content}<br/>
                        {message.createdAt}
                    </div>
        }
        
    })

    function logout() {
        localStorage.removeItem('email');
    }

    return(
        <div className="mx-5 mt-2">
            <Link onClick={logout} to='/'>Выйти</Link> <br/>
            Выберите пользователя:
            <div className="d-grid gap-2">
                {usersList}
            </div>
            {block && 
                <div>
                    Выбранный пользователь: {user}
                    <Form.Group className="mt-2 mb-3" controlId="formBasicEmail">
                        <Form.Control onChange={onChange} value={message} name="message" type="text" placeholder="Enter message" />
                        <Button onClick={Send} className="mt-2" variant="primary" type="button">
                            Отправить
                        </Button>
                    </Form.Group>
                </div>
            }
            {sms}
        </div>
    )
}

export default Chat;
