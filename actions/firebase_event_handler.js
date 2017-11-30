import firebase from '../firebase';

export const EVENT_REQUEST_START = 'EVENT_REQUEST_START';
export const EVENT_REQUEST_SUCCESS = 'EVENT_REQUEST_SUCCESS';
export const EVENT_REQUEST_ERROR = 'EVENT_REQUEST_ERROR';

export const EVENT_ADDED = 'EVENT_ADDED';
export const EVENT_REMOVED = 'EVENT_REMOVED';


export function getEvents() {
  return dispatch => {
    dispatch({ type: EVENT_REQUEST_START });
    return database.ref('/events').once('value', snap => {
      const events = snap.val();
      dispatch({ type: EVENT_REQUEST_SUCCESS, payload: events })
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: EVENT_REQUEST_ERROR, payload: events });
    });
  }
}

export function watchEventAdded(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    database.ref('/events').on('child_added', (snap) => {
        dispatch({ type: EVENT_ADDED, payload: snap.val() });
    })
    .catch((error) => {
        console.log(error);
        dispatch({ type: EVENT_REQUEST_ERROR, payload: events });
    });
}

export function watchEventRemoved(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    database.ref('/events').on('child_removed', (snap) => {
        dispatch({ type: EVENT_REMOVED, payload: snap.val() });
    })
    .catch((error) => {
        console.log(error);
        dispatch({ type: EVENT_REQUEST_ERROR, payload: events });
    });
}
