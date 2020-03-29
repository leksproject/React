import React, {Component } from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import DishdetailComp from './DishdetailComponent.js'
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

    function RenderMenuItem({dish, onClick})
    {
        return(
        // <Card
        //     // onClick={() => onClick(dish.id)}>               
        //     // <CardColumns>
        //     //  <CardImg width="50%" src={dish.image}  alt="Card image cap" className="img-fluid"/>
        //     //   <CardImgOverlay>
        //     //  <CardTitle>{dish.name}</CardTitle>
        //     // </CardImgOverlay>
        //     // </CardColumns>       
        // </Card>
        <Card>
        <Link to={`/menu/${dish.id}`} >
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Link>
        </Card>
        );
    }
  
      const Menu = (props) => 
      {
          console.log("Inside Menu", props.dishes);
        const menu = props.dishes.dishes.map((dish) => {
            return(
                <div className="col-12 col-lg-6 col-md-5 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish} onClick = {props.onClick}/>
                </div>           
            );
        });
        if(props.dishes.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }

        else if(props.dishes.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
                
            )
        }
        else {
             return(
            //     <div className="container">
            //     <div className="row">
            //         <div>
            //      {menu}        
            //         </div>
            //     </div>
            //  </div>
                    <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );}

      }
   
      
export default Menu;