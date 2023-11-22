import React, { useState } from 'react'
import styled from 'styled-components'
import * as RiIcons from 'react-icons/ri'
import * as Io5Icons from 'react-icons/io5'
import * as CgIcons from 'react-icons/cg'
import { Sidebardata } from './Sidebardata'
import Submenu from './Submenu'
import './sidebar.css'
import { IconContext } from 'react-icons/lib'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Nav = styled.div`
background:#15171c;
height: 60px;
display: flex;
justify-content: flex-start;
align-items: center;
width:81.5%;
float:right;
color:white;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 50px;
`;

const DropdownOption = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #ddd;
    text-decoration: none;
  }
`;

const User = styled.div`
border:1px solid grey;
height:100%;
width:30%;
margin-left:40%;
color:white;
`;

const Demo = styled.div`
width:60%;
height:100%;
float:left;
`;

const Logout = styled.div`
width:40%;
height:100%;
float:left;
border-left:1px solid grey;
`;


const SidebarNav = styled.nav`
background:#15171c;
width: 250px;
height:100vh;
color:white;
display: flex;
justify-content: center;
position: fixed;
top:0;
transition: 350ms;
z-index:10;
overflow: scroll;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = () => {
  const nav = useNavigate();
const [sidebar ] = useState()

const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Container fluid>
    <IconContext.Provider value={{ color: '#fff'}}>
      <Nav>

<h3 style={{fontWeight:'bolder', marginLeft:'10px'}}>ADMINISTRATION</h3>
<User id='user'>
  <Demo>
  <div
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          style={{ cursor: 'pointer' }}
        >
 <img src="https://www.ecomdeveloper.com/demo/image/cache/profile-45x45.png" alt="Demo User" class="img-circle"></img>
 <p style={{marginLeft:'6px', float:'left', marginTop:'15px'}}> Demo User <RiIcons.RiArrowDropDownFill  style={{width:'30px', height:'30px', color:'white'}}/></p> </div>
 <DropdownContent isOpen={isDropdownOpen}>
          <DropdownOption href="#"><CgIcons.CgProfile style={{color:'grey'}}/> Your Profile</DropdownOption>
          <DropdownOption href="#">My demo shop</DropdownOption>
        </DropdownContent></Demo>
  <Logout onClick={()=>nav("/admin")} style={{cursor:'pointer'}}>
  <Io5Icons.IoLogOutOutline style={{marginLeft:'10px', marginTop:'18px', height:'20px', width:'20px', color:'white', float:'left'}}/>
 <p style={{marginLeft:'6px', float:'left', marginTop:'15px'}}>Logout</p> </Logout>
</User>
      </Nav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
           Navigation
            {Sidebardata.map((item, index)=>{
                return <Submenu item={item} key={index}/>
            })}
        </SidebarWrap>
      </SidebarNav>
      </IconContext.Provider>
      <Container fluid>
     <Outlet/>
   </Container> 
    </Container>
    
  )
}

export default Sidebar
