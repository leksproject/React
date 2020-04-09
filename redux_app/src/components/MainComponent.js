import React,{Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent.js';
import Home from './HomeComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { BrowserRouter as Router,withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {postComment,postFeedback, addComment,fetchDishes,fetchComments, fetchPromos,fetchLeaders} from '../redux/ActionCreators';
import { TransitionGroup } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating,author,comment) => dispatch(addComment(dishId, rating,author,comment)),
  postComment: (dishId, rating,author,comment) => dispatch(postComment(dishId, rating,author,comment)),
  postFeedback: (firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message,
    id) => dispatch(postFeedback( firstname,
      lastname,
      telnum,
      email,
      agree,
      contactType,
      message,
      id)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders : () => {dispatch(fetchLeaders())}
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

  //Executed after the main component is mounted

  //As main component is mounted, these will be updated from server.
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  onDishSelect(dishId){
     this.setState({selectedDish : dishId});
  }

 render()
  {

    console.log("Main", this.props);
        const HomePage = () => { 
      
    const homeargs = {
        dish : this.props.dishes.dishes.filter((dish) => dish.featured),
        dishesLoading : this.props.dishes.isLoading,
        disheserrMess : this.props.dishes.errMess,
        promotion : this.props.promotions.promotions.filter(promo => promo.featured),
        promosLoading : this.props.promotions.isLoading,
        promoserrMess : this.props.promotions.errMess,
        leader: this.props.leaders.leaders.filter(leader => leader.featured),
        leadersLoading : this.props.leaders.isLoading,
        leaderserrMess : this.props.leaders.errMess,
      }
  return( 
      <div>
        {
         <Home homeargs={homeargs}/>}
         </div>);          
      }

      const DishWithId = ({match}) => {
        
        let dishid = {
          dish : this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId)),
          isLoading : this.props.dishes.isLoading,
          errMess : this.props.dishes.errMess,
          comments : this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId)),
          commentserrMess : this.props.comments.errMess,
          addComment : this.props.addComment,
          postComment : this.props.postComment,
              
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
        <TransitionGroup>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}  />}/>
          <Route exact path="/contactus" component={()=> <Contact postFeedback = {this.props.postFeedback}/>}/>
          <Route exact path="/aboutus" component={() => <About leaders = {this.props.leaders.leaders}/>}/>
          <Redirect to="/home" />
        
        </Switch>
        <Footer/>
        {/* </CSSTransition> */}
      </TransitionGroup>
      </div>

      );
    }
  }
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));



