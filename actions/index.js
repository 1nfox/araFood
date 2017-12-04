import firebase from '../firebase';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const FETCH_NEXT_EVENTS = 'FETCH_NEXT_EVENT';
export const FETCH_ALL_EVENTS = 'FETCH_ALL_EVENT';
export const FETCH_IN_REQUEST = 'FETCH_IN_REQUEST'
export const FETCH_FINISH = 'FETCH_FINISH'

export const signInUser = ( email, password ) => (dispatch) => {
    dispatch({ type: SIGN_IN_REQUEST });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        dispatch({ type: SIGN_IN_SUCCESS, payload: user });
    })
    .catch( (error) => {
        dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) }); 
    });
};

export const signOutUser = () => (dispatch) => {
    firebase.auth().signOut();
    dispatch({ type: SET_INITIAL_STATE });
};

const authFailMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Email is invalid.';
    case 'auth/user-disabled':
      return 'User is disabled.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/wrong-password':
      return 'Password is invalid.';
    case 'auth/email-already-in-use':
      return 'Email address is already in use.';
    case 'auth/weak-password':
      return 'Password is not strong enough.';
    default:
      return 'Authentication failed.';
  }
};