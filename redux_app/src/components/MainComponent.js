import React,{Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes'
import DishDetail from './DishdetailComponent.js';
import Home from './HomeComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { BrowserRouter as Router, Link,withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating,author,comment) => dispatch(addComment(dishId, rating,author,comment))
});
class Main extends Component {

  
  constructor(props)
  {
    super(props);
    //Removed and included in reducer.js
    // this.state = {
    //   dishes : DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS
    // };
  }

  
 

  onDishSelect(dishId){
     this.setState({selectedDish : dishId});
  }

 render()
  {
    

    const HomePage = () => { 
      
    const homeargs = {
        dish : this.props.dishes.filter((dish) => dish.featured),
        promotion : this.props.promotions.filter(promo => promo.featured),
        leader: this.props.leaders.filter(leader => leader.featured)
      }
  return( 
      <div>
        {
         <Home homeargs={homeargs}/>}
       
        </div>);          
      }

      const DishWithId = ({match}) => {
                
        let dishid = {
          dish : this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId)),
          comments : this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId)),
          addComment : this.props.addComment
        }
        return(
          <div>
            <DishDetail dishdetails = {dishid}/>
          </div>          
           
        );
      }
        
     return(
        <div>      
        <Header/>
         <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}  />}/>
          <Route exact path="/contactus" component={Contact }/>
          <Route exact path="/aboutus" component={() => <About leaders = {this.props.leaders}/>}/>
          <Redirect to="/home" />
        
        </Switch>
        <Footer/>
        </div>

      );
    }
  }
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));



