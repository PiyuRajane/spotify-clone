import React,{useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import { useStateProvider } from '../StateProvider';
import axios from 'axios';
import { reducerCases } from '../Constant';

export default function Spotify() {
  const [{token},dispatch] = useStateProvider();
  const bodyref = useRef();
  const [navbackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyScrolled = () =>{
    bodyref.current.ScrollTop > 30
    ? setNavBackground(true)
    : setNavBackground(false);
    bodyref.current.ScrollTop > 268
    ? setHeaderBackground(true)
    : setHeaderBackground(false);
  };
  useEffect(()=>{
    const getUserInfo = async ()=>{
      const {data} = await axios.get("https://api.spotify.com/v1/me",{
        headers:{
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        },
      });
      const userInfo ={
        userId :data.id,
        userName : data.display_name,
      };
      dispatch({type: reducerCases.SET_USER,userInfo});
    };
    getUserInfo()
  },[dispatch,token])


  return (
    <Container>
     <div className="spotify_body">
      <Sidebar />
      
    <div className="body" ref={bodyref} onScroll={bodyScrolled}>
      <Navbar navBackground={navbackground} />
      
        <div className="body_contents">
          <Body headerBackground={headerBackground}/>

        </div>
      </div>
     </div>
     <div className="spotify_footer">
      <Footer />

     </div>
    </Container>
  )
}
const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display: grid;
grid-template-rows: 85vh 15vh;
.spotify_body{
  display: grid;
  grid-template-columns: 15vw 85vh;
  height: 100%;
  width: 100%;
  background:linear-gradient(transparent,rgba(0,0,0,1));
  background-color: rgb(32,87,100);
}
.body{
  height: 100%;
  width: 1303px;
  overflow: auto;
  &::-webkit-scrollbar{
    width: 0.7rem;
    &-thumb{
      background-color: rgba(255,255,255,0.6)
    }
  }
}


`


