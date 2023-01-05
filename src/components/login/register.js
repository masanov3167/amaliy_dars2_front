import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './main.css'
import { useContext } from "react";
import { Context } from "../context/context";
import { useEffect } from "react";

const Register = () =>{
    const navigate = useNavigate()
    const {link, token, setToken, fetchHeaders} = useContext(Context)
    
    const resHandler = res =>{
        if(res.status === 200 && res.success){
            setToken(res.token);
            alert('success')
            return
        }

        setToken(false)
        alert(res.message)
    }

    const handleSubmit = e =>{
        e.preventDefault();
        const {name, parol, pic} = e.target

        if(name.value.length<3 || parol.value.length<3 || pic.value.length<3){
            alert('malumotla kam');
            return
        }

        const raw = {
            name: name.value,
            parol: parol.value,
            pic: pic.value,
        }

            fetch(`${link}/users`,{
                method:'POST',
                headers:fetchHeaders,
                body: JSON.stringify(raw)
            })
            .then(res => res.json())
            .then(data => resHandler(data))
            .catch(() => alert('xatolik'))

        e.target.reset()
    }

    

    useEffect(() =>{
        if(token){
            navigate('/')
        }
    }, [token])

     return (
        <div className="login__wrapper">
            <div className="login__content">
                <h2 className="fw-bold">register</h2>
                <form onSubmit={handleSubmit} className="login__form" >
                    <div>
                        <span className="d-block ms-2" >name</span>
                        <input className="form-control mb-2" type="text" name="name" placeholder='name *' required/>
                    </div>

                    <div>
                        <span className="d-block ms-2" >password</span>
                        <input  className="form-control mb-2" type="text" name="parol" placeholder='password' required/>
                    </div>

                    <div>
                        <span className="d-block ms-2" >pic</span>
                        <input  className="form-control mb-2" type="text" name="pic" placeholder='pic' required/>                   
                    </div>
                    
                    <button className="btn btn-info w-100 mb-2" type="submit">register</button>
                </form>

                <Link className="btn btn-light w-100 mb-2" to='/login'>login</Link>
                <Link className="btn btn-primary w-100 mb-2" to='/'>Bosh menyu</Link>
            </div>
        </div>
    )
}

export default Register;