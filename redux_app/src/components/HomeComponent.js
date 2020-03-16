import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({item})
{
    
    if(item != null){
        return item.map((item) => {
     return(
        <div className = "container">
            <div key={item.id} className = "col-12 col-md-5 col-lg-3">
                    
        <Card>
           
            <CardBody>
            <CardImg src={item.image} alt={item.name} />
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
        </div>
        </div>
       
     );
});
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
                    <RenderCard item={props.homeargs.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderCard item={props.homeargs.promotion} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderCard item={props.homeargs.leader} />
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