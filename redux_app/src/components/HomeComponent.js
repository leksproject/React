import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

import { FadeTransform } from 'react-animation-components';


function RenderCard({item, isLoading, errMess})
{
    console.log("Render Card",item);
    // console.log()
    // 
    // else

    const itemwise = item.map((eachitem) => {
        
         return(
            <div className = "container">
                <div key={eachitem.id} className = "col-12 col-md-5 col-lg-3">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
            
                <CardBody>
                <CardImg src={baseUrl + eachitem.image} alt={eachitem.name} />
                <CardTitle>{eachitem.name}</CardTitle>
                {eachitem.designation ? <CardSubtitle>{eachitem.designation}</CardSubtitle> : null }
                <CardText>{eachitem.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
            </div>
            </div>
        );

    });

    if(isLoading){
        return(
             <Loading/>
             );
        }
    else if(errMess){
        return(
            <h4>{errMess}</h4>
             );
        }
    else if(item != null){
      return( 
          <div>
        {itemwise}
        </div>
        );
}
}

function Home(props)
{
  
    if(props != null)
        {
    return(
        
        <div className="container">
            <div className=" row align-items-start">
                 <div className="col-12 col-md-5 col-bg-6 m-1">
                    <RenderCard item={props.homeargs.dish}
                    isLoading={props.homeargs.dishesLoading} 
                    errMess = {props.homeargs.disheserrMess} /> 
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderCard item={props.homeargs.promotion}
                    isLoading={props.homeargs.promosLoading} 
                    errMess = {props.homeargs.promoserrMess}
                     />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderCard item={props.homeargs.leader}
                     isLoading={props.homeargs.leadersLoading} 
                     errMess = {props.homeargs.leaderserrMess} />
                </div>  
            </div>
    
            <h4>Home</h4>
        </div>
    
    );
        }
        else{
            return(
                <div></div>
            );
        }
}

export default Home