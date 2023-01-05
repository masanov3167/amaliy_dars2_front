import React, {useContext} from "react"
import { Context } from "../context/context"
import './header.css'

const Header = () =>{
    const {token, setToken} = useContext(Context);
    const logOut = () =>{
        setToken(false)
    }

    return (
        <header  className='header'>
          <div className="header__logo">
            2-dars
          </div>
          <div className="header__nav">
            {
                token ?(
                    <button className='btn btn-primary' onClick={logOut} >Log out</button>
                    ):(
                        <>
                        <a className="btn btn-info header__nav__item" href="/login">Login</a>
                        <a className="btn btn-danger header__nav__item" href="/register">register</a>
                        </>
                    )
            }
          </div>
        </header>
    )
}

export default Header;