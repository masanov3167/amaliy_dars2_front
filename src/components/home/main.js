import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/context";
import Header from "../header/header";
import './homeItem.css'

const Main = () => {
  const {token,setToken,  link,fetchHeaders} = useContext(Context);
  const [data, setData] = useState({fetched: false,error: false,data: {}});
  const [imgError, setImgError] = useState([])
  const [edit, setEdit] = useState({display:false, id: false})

  useEffect(() => {
      if(token){
        fetch(`${link}/users`,{
          headers:fetchHeaders
        })
          .then((res) => res.json())
          .then((data) =>
            setData(
              data.status === 200
                ? { fetched: true, data: data.data }
                : { error: true, fetched: false }
            )
          )
          .catch(() => setData({ error: true, fetched: false }));
      }
      
  }, []);

  const DeleteUser = id =>{
    fetch(`${link}/users/${id}`,{
      headers:fetchHeaders,
      method:'DELETE'
    })
      .then((res) => res.json())
      .then(result => {
        if(result.status === 200 && result.success){
          data.fetched = true
          data.error = false
          data.data = data.data.filter(a => a.id!==id)
            setData({...data});
            alert(result.message);
            return
        }
        if(result.status === 401 || result.status===498){
          setToken(false);
            alert(result.message);
            return
        }
        alert(result.message)
      })
      .catch(() => alert('xatolik birozdan keyin urinib ko`ring'));
  }

  const EditUser = (id, index) =>{
    const name = document.querySelector(`.user__name${index}`).value
    const parol = document.querySelector(`.user__parol${index}`).value
    const pic = document.querySelector(`.user__pic${index}`).value
    
    fetch(`${link}/users/${id}`,{
      headers:fetchHeaders,
      method:'PUT',
      body: JSON.stringify({name, parol, pic})
    })
      .then((res) => res.json())
      .then(result => {
        if(result.status === 200 && result.success){
          data.fetched = true
          data.error = false
          data.data[index] = result.data
            setData({...data});
            setEdit({display:false, id: false})
            alert(result.message);
            return
        }
        if(result.status === 401 || result.status===498){
          setToken(false);
            alert(result.message);
            return
        }
        alert(result.message)
      })
      .catch(() => alert('xatolik birozdan keyin urinib ko`ring'));
  }


  return (
    <div className="container">
        <Header />

      {
        token ? (
          <div className="users__list row">
        {
            data.fetched && data.data.length > 0 ? (
                data.data.map((e, index) => (
                  <div key={index} className="col-4">
                      {
                        edit.display && edit.id === e.id ? (
                          <div>
                            <div>
                                  <span className="d-block ms-2" >name</span>
                                  <input className={`form-control mb-2 user__name${index}`} defaultValue={e.name} type="text" name="name" placeholder='name *' required/>
                              </div>

                              <div>
                                  <span className="d-block ms-2" >password</span>
                                  <input  className={`form-control mb-2 user__parol${index}`} defaultValue={e.parol} type="text" name="parol" placeholder='password' required/>
                              </div>

                              <div>
                                  <span className="d-block ms-2" >pic</span>
                                  <input  className={`form-control mb-2 user__pic${index}`} defaultValue={e.pic} type="text" name="pic" placeholder='pic' required/>                   
                              </div>
                              
                              <button onClick={() => EditUser(e.id, index)} className="btn btn-info w-100 mb-2" type="submit">Edit</button>
                          </div>
                        ):(
                          <div className="users__list__item">
                            <img onError={() => setImgError([...imgError,e.id])} src={imgError.some(a =>a === e.id) ? 'https://www.dingwallmedicalgroup.co.uk/website/S55376/files/Photo%20Unavailable.jpg' : e.pic} alt={`${e.name}'s img`} />
                            <h4>{e[`name`]}</h4>
                            <h4>{e[`parol`]}</h4>
                            <button onClick={() => DeleteUser(e.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                            <button onClick={() => setEdit({display:true, id: e.id})} className="ms-2 btn btn-danger"><i className="fa-solid fa-pen-to-square"></i></button>
                          </div>
                        )
                      }
                  </div>
                ))
            ): data.fetched && data.data.length === 0 ? (
              <div className="loading__wrap">
                <div className="loading__container">
                  <div className="loading__ball"></div>
                  <div className="loading__text">Topilmadi :(</div>
                  
                </div>
              </div>
            ): data.error && data.fetched === false ? (
              <div className="loading__wrap">
                <div className="loading__container">
                  <div className="loading__ball"></div>
                  <div className="loading__text">Xatolik &#9888;</div> 
                </div>
              </div>
            ):(
              <div className="loading__wrap">
                <div className="loading__container">
                  <div className="loading__ball"></div>
                  <div className="loading__text">Yuklanmoqda &#9203;</div>
                </div>
              </div>
            )
        }
      </div>
        ) :(
          <div>
            Avval ro'yhatdan o'ting yoki eski profilingizga login qiling
          </div>
        )
      }
      
      </div>
  );
};

export default Main;
