import React from "react";
import './Home.css';
import { AiFillSetting } from "react-icons/ai";
import Card from 'react-bootstrap/Card';
import * as ImIcons from 'react-icons/im'
import * as Fa6Icons from 'react-icons/fa6'
import * as BsIcons from 'react-icons/bs'
import * as Hi2Icons from 'react-icons/hi2'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import 'bootstrap';

function Home(){
    return(
        <div className="home1">
        <h1 className="head">Dashboard
        <div className="settings">
<AiFillSetting/>
        </div></h1>
        <div className="container-fluid">

        <Card className="card" id="card">   
          <div className="card-top">
           <p>TOTAL ORDERS
           <span>0%</span></p>
          </div>
          <div className="card-center">
            <ImIcons.ImCart className="card-icon"/>
            <h1 className="card-num">381</h1>
          </div>
          <div className="card-bottom">
            <p>view more...</p>
          </div>
    </Card> 

    <Card className="card" id="card">   
          <div className="card-top">
           <p>TOTAL SALES
           <span>0%</span></p>
          </div>
          <div className="card-center">
            <Fa6Icons.FaRegCreditCard className="card-icon" style={{marginLeft:'-5px', width:'50px'}}/>
            <h1 className="card-num" style={{marginLeft:'-10px'}}>98.2K</h1>
          </div>
          <div className="card-bottom">
            <p>view more...</p>
          </div>
    </Card> 

    <Card className="card" id="card">   
          <div className="card-top">
           <p>TOTAL CUSTOMERS
           <span>0%</span></p>
          </div>
          <div className="card-center">
            <BsIcons.BsFillPersonFill className="card-icon"/>
            <h1 className="card-num">815</h1>
          </div>
          <div className="card-bottom">
            <p>view more...</p>
          </div>
    </Card> 

    <Card  className="card" id="card" style={{float: 'right', marginRight: '0px'}}>   
          <div className="card-top">
           <p>PEOPLE ONLINE
           <span>0%</span></p>
          </div>
          
          <div className="card-center">
            <Hi2Icons.HiMiniUserGroup className="card-icon"/>
            <h1 className="card-num">0</h1>
          </div>
          <div className="card-bottom">
            <p>view more...</p>
          </div>
    </Card> 
    <div className="container-fluid, map" id="map">
     <div className="map-top">
     <BiIcons.BiWorld style={{height:'20px', width:'50px'}}/>
     WORLD MAP</div> 
  
    </div>
    <div className="container-fluid, map" id="map" style={{float:'right'}}>
     <div className="map-top">
    <AiIcons.AiOutlineBarChart style={{height:'20px', width:'50px'}}/>
     SALES ANALYTICS</div> 
    </div>
    <div className="container-fluid, activity"></div>
        </div>
        </div>
    )
}
export default Home;
