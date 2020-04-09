import React,{Component} from 'react';
import { Button, FormGroup, Label, Col,Row } from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form'


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props)
    {
        super(props);

        //state being managed by react-redux form
        // this.state = {
        //     firstname : '',
        //     lastname : '',
        //     telnum : '',
        //     email : '',
        //     agree:false,
        //     contactType : 'Tel',
        //     message : '',
        //     touched : {
        //         firstname : false,
        //         lastname : false,
        //         telnum : false,
        //         email : false
        //     }
        // };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);   
    }



    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(values){

        
        // console.log('Current State is: ' + JSON.stringify(values));
        // this.props.postFeedback(values).then(
        // alert('Current State is: ' + JSON.stringify(values))
        // );
        this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email,values.agree,values.contactType,values.message);
  
        // values.preventDefault();

    }
    //whenever anything changes in the input box
    handleBlur = (field) => (evt) => {
        this.setState({
                touched: {...this.state.touched, [field] : true }
            });
     }

//validate done by react-redux form
    //  validate(firstname, lastname, telnum,email)
    //  {
    //      const errors = {
    //         firstname : '',
    //         lastname: '',
    //         telnum : '',
    //         email : ''
    //      };

    //      if(this.state.touched.firstname && firstname.length < 3)
    //         errors.firstname = 'Firstname should be > 3 characters';
    //     else if(this.state.touched.firstname && firstname.length > 10)
    //         errors.firstname = 'Firstname should be < 10 characters';
    //     if(this.state.touched.lastname && lastname.length < 3)
    //         errors.lastname = 'Lastname should be > 3 characters';
    //     else if(this.state.touched.lastname && lastname.length > 10)
    //         errors.lastname = 'Lastname should be < 10 characters';
    //     if(this.state.touched.telnum && firstname.telnum < 9)
    //         errors.telnum = 'Tel num should be > 3 characters';
       
    //     const reg = /^\d+$/;
    //     if(this.state.touched.telnum && !reg.test(telnum))
    //         errors.telnum = 'Tel num should have only numbers';
    //     if(this.state.touched.email && email.split('').filter(x => x === "@").length !== 1)
    //         errors.email = 'Email should have an @ sign';
        
    //     return errors;
    //  }
    render(){
        //Validate the fields
       // const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
    return(
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                placeholder = "First Name"
                                className = "form-control" 
                                validators ={{
                                  required, minLength : minLength(3), maxLength : maxLength(10)}}/>
                                <Errors 
                                className = "text-danger"
                                model = ".firstname"
                                show = "touched"
                                messages = {{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}/>
                                {/* This is one way of validation */}
                                 {/* value = {this.state.firstname}
                                 valid = {errors.firstname === ''}
                                 invalid = {errors.firstname !== ''}
                                 onBlur = {this.handleBlur('firstname')}
                                 onChange = {this.handleInputChange}/> */}
                                {/* <FormFeedback>
                                    {errors.firstname}
                                </FormFeedback> */}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Control.text model=".lastname" id="lastname" name="lastname"
                                placeholder = "First Name"
                                className = "form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                 />
                                <Errors
                                  className="text-danger"
                                  model=".lastname"
                                  show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                     }}
                                />
                                
                                {/* // value = {this.state.lastname}
                                // valid = {errors.lastname === ''}
                                // invalid = {errors.lastname !== ''}
                                // onBlur = {this.handleBlur('lastname')}
                                // onChange = {this.handleInputChange}/> */}
                                {/* <FormFeedback>
                                    {errors.lastname}
                                </FormFeedback> */}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Control.text model=".telnum" id="telnum" name="telnum"
                                placeholder = "Tel.Num"
                                className = "form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                }}
                                 />
                            <Errors
                                className="text-danger"
                                model=".telnum"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 numbers',
                                    maxLength: 'Must be 15 numbers or less',
                                    isNumber: 'Must be a number'
                                }}/>

                                {/* Handled by react-redux form */}
                                {/* // value = {this.state.telnum}
                                // valid = {errors.telnum === ''}
                                // invalid = {errors.telnum !== ''}
                                // onBlur = {this.handleBlur('telnum')}
                                // onChange = {this.handleInputChange}/> */}

                                {/* <FormFeedback>
                                    {errors.telnum}
                                </FormFeedback> */}
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Email" md={2}>Email </Label>
                            <Col md={10}>
                                <Control.text model=".email" id="email" name="email"
                                placeholder = "Email"
                                className = "form-control" 
                                validators={{
                                    required, validEmail
                                }}
                                 />
                            <Errors
                                className="text-danger"
                                model=".email"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    validEmail: 'Invalid Email Address'
                                }}
                                />

                                {/* value = {this.state.email}
                                valid = {errors.email === ''}
                                invalid = {errors.email !== ''}
                                onBlur = {this.handleBlur('email')}
                                onChange = {this.handleInputChange}/> */}
                                {/* <FormFeedback>
                                    {errors.email}
                                </FormFeedback> */}
                            </Col>
                        </Row>
                        <Row className="form-group">
                                    <Col md={{size:6,offset:2}}>
                                    <div className = "form-check">
                                    <FormGroup check>
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" 
                                                className="form-check-input"
                                                />{' '}
                                                <strong>May we contact you</strong>
                                        </Label>
                                    </FormGroup>
                                    </div>
                            </Col>
                            <Col md={{size:3,offset:1}}>
                                <Control.select model=".contactType" name="contactType" >
                                {/* // value={this.state.contactType}
                                // onChange = {this.handleInputChange}> */}
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Control.select>
                              
                            </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your </Label>
                                <Col md={10}>
                                    <Control.textarea model="textarea" id="message" name="message"
                                        rows="12"
                                        className = "form-control"/>
                                        {/* // value={this.state.message}
                                        // onChange={this.handleInputChange}> */}
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button color="primary"  type="submit" >
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </div>
            </div>
            </div>
    );
}
}

export default Contact;