import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardImgOverlay,CardTitle, CardText,CardImg, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';


function About(props) {

    console.log("About",props);

       function Renderleaders(leaders)
    {
        console.log("Rnderleaders", leaders);
        console.log("props.leaders", leaders.leaders);

        const test = leaders.leaders.map((detail) =>{
            console.log("name", detail.name);
            return(
                <div>
                <Media>
                <div key={detail.id} className="col-md-5 m-1">
                    <h2>test</h2>
                    {detail.name}
                    
                </div>
                </Media>
                </div>

            );
        })

            
        
        // if(props != null){
        const leaderslist = leaders.leaders.map((detail) =>
        {
            console.log("inside leaderslist", detail);
            return(
                <div className = "container">
                <div key={detail.id} className = "row">
                    <Media>
                      <Media left top className = "col-12 col-md-5 col-lg-3">
                        <Media object width="20%" src={baseUrl + detail.image} alt={detail.name} />
                      </Media>
                     <Media body >
                     <Media heading>
                          {detail.name}
                         <br/>
                     </Media>
                     <Media>
                     {detail.designation}
                     </Media>
                    {detail.description}
                    </Media>
                     <br/>
                     </Media>
              </div> 
            </div>);
              
         
         });
    
            if (props != null){
                return(
                    <div className="col-12 col-md-5 m-1">
                        {leaderslist}
                    {/* {leaderslist} */}
                    </div>
                );
                }
}
    return(
       <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                    <div>
                      <h3>About Us</h3>
                         <hr />
                     </div>                
            </div>
            <div className="row ">
                <div className="col-12 col-md-5 col-lg-3 m-2">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5 col-lg-3 m-2">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-md-6 col-xs-6">Started</dt>
                                <dd className="col-md-6">3 Feb. 2013</dd>
                                <br/>
                                <dt className="col-md-7">Major Stake Holder</dt>
                                <dd className="col-md-5">HK Fine Foods Inc.</dd>
                                <dt className="col-md-7">Last Year's Turnover</dt>
                                 <dd className="col-md-5">$1,250,375</dd>
                                <br/>
                                <dt className="col-md-6">Employees</dt>
                                <dd className="col-md-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                </div>
                <div className="row">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            
            <div className="row ">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
               
                <div className="col-12 col-md-5 col-lg-3">
                    <Media list>
                    <Renderleaders leaders = {props.leaders}/>
                    </Media>
                </div>
                </div>
            </div>
        );
}

export default About;    