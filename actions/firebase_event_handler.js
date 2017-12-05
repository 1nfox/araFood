import firebase from '../firebase';

export const EVENT_REQUEST_START = 'EVENT_REQUEST_START';
export const EVENT_REQUEST_END = 'EVENT_REQUEST_END';
export const EVENT_REQUEST_SUCCESS = 'EVENT_REQUEST_SUCCESS';
export const EVENT_REQUEST_ERROR = 'EVENT_REQUEST_ERROR';

export const EVENT_ADDED = 'EVENT_ADDED';
export const EVENT_REMOVED = 'EVENT_REMOVED';


export function getEvents() {
  return dispatch => {
    dispatch({ type: EVENT_REQUEST_START });
    return firebase.database().ref('/events').once('value', snap => {
        const events = []
        const obj = snap.val()
        for (let key in obj) {
          let subscribers = []
          if (obj[key].subscribers !== 'undefined') {
            const subList = obj[key].subscribers
            for (let key in subList) {
              subscribers.push(subList[key])
            }
          }
          events.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId,
            subscribers: subscribers
          })
        }
      dispatch({ type: EVENT_REQUEST_SUCCESS, payload: events })
      dispatch({ type: EVENT_REQUEST_END })
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: EVENT_REQUEST_ERROR, payload: events });
      dispatch({ type: EVENT_REQUEST_END })
    });
  }
}

export function watchEventAdded(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    firebase.database().ref('/events').on('child_added', (snap) => {
        let newEvent = snap.val()
        firebase.database().ref('/events/'+snap.key).on('child_added', data => {
            if(data.key ==='subscribers') {
                    newEvent = {...newEvent, subscribers : data.val()}
                    dispatch({ type: EVENT_ADDED, payload: newEvent });
            }
        })
    })
    dispatch({ type: EVENT_REQUEST_END })
}

export function watchEventRemoved(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    firebase.database().ref('/events').on('child_removed', (snap) => {
        dispatch({ type: EVENT_REMOVED, payload: snap.val() });
    })
    .catch((error) => {
        console.log(error);
        dispatch({ type: EVENT_REQUEST_ERROR, payload: events });
    });
}
