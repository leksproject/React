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
import {addComment,fetchDishes,fetchComments, fetchPromos,fetchLeaders} from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders : () => {dispatch(fetchLeaders())}
});
class Main extends Component {

  
  constructor(props)
  {
    super(props);
    console.log("props",props);
    //Removed and included in reducer.js
    // this.state = {
    //   dishes : DISHES,
    //   comments: COMMENTS,
    //   promotions: PROMOTIONS,
    //   leaders: LEADERS
    // };
  }

  //Executed after the main component is mou+
  nted
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
          addComment : this.props.addComment
        }
        return(
          <div>
            <DishDetail dishdetails = {dishid}/>
          </div>          
           
        );
      }
        
     return(

        // <div>
        //   <Router>
        //   <div>
        //     <Header/>
        //    <TransitionGroup>
        //     <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        //       <Switch location={this.props.location}>
        //           <Route path='/home' component={HomePage} />
        //           <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
        //           <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
        //           <Route path='/menu/:dishId' component={DishWithId} />
        //           <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
        //           <Redirect to="/home" />
        //       </Switch>
        //       <Footer/>
        //     </CSSTransition>
        //   </TransitionGroup>
        //   </div>
        //   </Router>
 
        // </div>
        <div>      
        <Header/>
        <TransitionGroup>
        {/* <CSSTransition
        className="container result"
        transitionName="test"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>  */}

           {/* <CSSTransition key={this.props.location.key} classNames="page" timeout={300}/> */}
         <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}  />}/>
          <Route exact path="/contactus" component={Contact }/>
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



