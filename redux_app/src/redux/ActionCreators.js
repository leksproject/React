import * as ActionTypes from './ActionTypes'
import {DISHES} from '../shared/dishes'
import {baseUrl} from '../shared/baseUrl';

export const addComment = (comment) => ({
        type:ActionTypes.ADD_COMMENT,
        payload : comment
});

//Thunk - returns dispatch with different actions
export const fetchDishes = () => (dispatch) => {
   dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
    .then(response => {
      if (response.ok) {
            console.log("Response in fetchDishes",response);
        return response;
        } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
        }
    },
    error => {
            var errmess = new Error(error.message);
            throw errmess;
    })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(DISHES)))
            .catch(error => dispatch(dishesFailed(error.message)));

}

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
            .then(response => {
                if (response.ok) {
                    console.log("Response",response);
                return response;
                } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                // error.response = response;
                throw error;
                }
            },
            error => {
                    var errmess = new Error(error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)));
    
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId : dishId,
        rating : rating,
        author : author, 
        comment : comment
    };

    newComment.date = new Date().toISOString();
    console.log("New comment", newComment);
    return fetch(baseUrl + 'comments',{
        method : "POST",
        body : JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
      .then(response => response.json())
      .then(response => dispatch(addComment(response)))
      .catch(error =>  { console.log('post comments', error.message);
       alert('Your comment could not be posted\nError: '+error.message); });
  };

  export const postFeedback = (Firstname, Lastname, tel, email,agree,contactType, message) => (dispatch) => {
    
    const newFeedback = {
        Firstname : Firstname,
        Lastname : Lastname,
        tel : tel,
        email : email,
        agree: agree,
        contactType: contactType,
        message: message,
    };

    newFeedback.date = new Date().toISOString();

   console.log("newfeedback",newFeedback);
    return fetch(baseUrl + 'feedback',
    {
   
        method : "POST",
        body : JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
            console.log("Response in postfeedback",JSON.stringify(response));
            return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
      .then(response => response.json())
      .then(response => dispatch(
                postFeedback(response)
                ))
      .catch(error =>  { console.log('post feedback', error.message);
       alert('Your comment could not be posted\nError: '+error.message); });
  };

    
//Different action types
export const dishesLoading = () => ({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmess
});

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});

export const commentsFailed = (errmess) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errmess
});

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});

export const fetchPromos = () => (dispatch) => {
   dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)));

}

//Different action types
export const promosLoading = () => ({
    type:ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload : errmess
});

export const addPromos = (promos) => ({
    type : ActionTypes.ADD_PROMOS,
    payload : promos
})


export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
    if (response.ok) {
        console.log("Response in fetchDishes",response);
    return response;
    } else {
    var error = new Error('Error ' + response.status + ': ' + response.statusText);
    error.response = response;
    throw error;
    }
},
error => {
        var errmess = new Error(error.message);
        throw errmess;
})
     
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});
