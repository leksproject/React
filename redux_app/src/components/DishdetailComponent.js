import React, {Component } from 'react';    
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row,Col } from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form'


import {DISHES} from '../shared/dishes.js';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

//Form to handle comments
class CommentForm extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            isModalOpen : false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    toggleModal()
    {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }
    
    handleSubmit(values){
        this.toggleModal();
        
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));     
       
    }
    render()
    {
        return(
        <div>
             <Button outline onClick={this.toggleModal} > Submit Comments
             <span className="fa fa-sign-in fa-lg"></span>
             </Button> 
        <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal} fade={false}>
          
        <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
        <ModalBody>
            <div className="col-12 col-md-5 col-bg-6">
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                       <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={{size:10,offset:1}}>
                                <Control.select model=".rating" name="Rating"
                                placeholder = "1"
                                className = "form-control" 
                                validators ={{
                                  required}}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors 
                                className = "text-danger"
                                model = ".rating"
                                show = "touched"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Your Name " md={2}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model=".your name" id="lastname" name="lastname"
                                placeholder = "Your Name"
                                className = "form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                 />
                                <Errors
                                  className="text-danger"
                                  model=".your name"
                                  show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                     }}
                                />                                
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Comment " md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".Comment" id="Comment" name="Comment"
                                placeholder = "Comment"
                                rows = "6"
                                className = "form-control"
                                validators={{
                                    required, minLength: minLength(10), maxLength: maxLength(50)
                                }}
                                 />
                                <Errors
                                  className="text-danger"
                                  model=".comment"
                                  show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 10 characters',
                                        maxLength: 'Must be 50 characters or less'
                                     }}
                                />                                
                                </Col>
                        </Row>
                        
                       <Row className="form-group">
                        <Col md={{size:10, offset:2}}>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Col>
                        </Row>
                        </LocalForm>
                 </div>                               
            </ModalBody>
           
        </Modal>
      </div>
       
        );
    }
}

//Display the details of selected dish            
       function RenderDish({dishdetails})
        {
          console.log("Renderdish dishdetails" ,dishdetails);
            if( dishdetails !== null)
            {
             let tdish = Array.from(dishdetails.dish);               
             return tdish.map((dish) => {                   
            return(
              <div key={dish.id} className="col-md-5 m-1">
                <Card >                                       
                     <div>   
                    <CardBody>
                    <CardImgOverlay >
                         <CardImg width="50%" src={dish.image} alt={tdish.name} className = "img-fluid"/>
                         <CardTitle>{dish.name}</CardTitle>
                         <CardText>{dish.description}</CardText>
                     </CardImgOverlay>
                     </CardBody>
             </div>
                            
               </Card>
               </div>
                 );
                    })
            }
            else{
                return(
                    <div></div>
                     );
            }
        }

        function RenderComments({comments,addComment,dishId}) {
            if (comments != null) {
                console.log("Comments", comments);
                const userComments = comments.map((comment) => {
                    return (
                        <ul className="list-unstyled mt-5">
                            <li className="text-justify">{comment.comment}</li>
                            <li className="text-justify">-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </ul>
                    );
                });
    
                return (
                    <div className="col-12 col-md-5 m-1">
                        <h4 className="text-justify">Comments</h4>
                        {userComments}
                        <CommentForm dishId={dishId} addComment={addComment}/>
                    </div>  
                );
            } else {
                return(
                    <div></div>
                );
            }
        }
                         
        const DishDetail = (props) => {  
          
            if(props.dishdetails != null){
            return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dishdetails.name}</BreadcrumbItem>
                    </Breadcrumb>
                        <div className="col-12">
                         <h3>{props.dishdetails.name}</h3>
                         <br />
                        </div>                
                </div>
            
               <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                        <RenderDish dishdetails={props.dishdetails}/>
                 <div  className="col-12 col-md-5 m-1">     
                    <Card>
                       <RenderComments comments={props.dishdetails.comments}
                        addComment={props.addComment}
                        dishId = {props.dishdetails.id}/>
                    </Card>
                       </div>
                       
                       {/* <CommentForm dishId={props.dishdetails.id} addComment={props.addComment} />  */}
                   </div>           
                </div>
            </div>
            );   
    }  
    }

export default DishDetail;

 