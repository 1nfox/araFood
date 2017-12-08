import firebase from '../firebase';

export const EVENT_REQUEST_START = 'EVENT_REQUEST_START';
export const EVENT_REQUEST_END = 'EVENT_REQUEST_END';
export const EVENT_REQUEST_SUCCESS = 'EVENT_REQUEST_SUCCESS';
export const EVENT_REQUEST_ERROR = 'EVENT_REQUEST_ERROR';
export const CURRENT_EVENT_REQUEST_SUCCESS = 'CURRENT_EVENT_REQUEST_SUCCESS';

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

export function setCurrentEvent(eventId) {
  return dispatch => {
    //dispatch({ type: EVENT_REQUEST_START });
    return firebase.database().ref('/events/'+eventId).once('value', snap => {
        let event = snap.val()
          let subscribers = []
          if (event.subscribers !== 'undefined') {
            const subList = event.subscribers
            for (let key in subList) {
              subscribers.push(subList[key])
            }
          }
        event.subscribers = subscribers
        event.id = snap.key
        dispatch({ type: CURRENT_EVENT_REQUEST_SUCCESS, payload: event })
        //dispatch({ type: EVENT_REQUEST_END })
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: EVENT_REQUEST_ERROR, payload: events });
      dispatch({ type: EVENT_REQUEST_END })
    });
  }
}

export function onAddEvent(title, date, heure, description, image, userId) {
  return dispatch => {
    dispatch({ type: EVENT_REQUEST_START });
    const Event = {
        title: title,
        description: description,
        imageUrl: 'http://www.fredzone.org/wp-content/uploads/2014/11/daft1_2.gif',
        date: '2017-12-09 12:12',
        creatorId: userId,
        subscribers: []
    }
    firebase.database().ref('events').push(Event)
    .then((data) => {
      dispatch(subscribe(userId, data.key, ''))
    })
    dispatch({ type: EVENT_REQUEST_END })
  }
}

export function watchEventAdded(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    firebase.database().ref('/events').on('child_added', (snap) => {
        let newEvent = snap.val()
        const newEventKey = snap.key
        firebase.database().ref('/events/'+snap.key).on('child_added', data => {
            if(data.key ==='subscribers') {
                    newEvent = {...newEvent, subscribers: data.val(), id: newEventKey}
                    dispatch({ type: EVENT_ADDED, payload: newEvent });
            }
        })
    })
    dispatch({ type: EVENT_REQUEST_END })
}

export function watchEventRemoved(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    firebase.database().ref('/events').on('child_removed', (snap) => {
        dispatch({ type: EVENT_REMOVED, payload: snap.key });
    })
}


export function subscribe(userId, eventId, comment) {
  console.log(userId)
  console.log(eventId)
  console.log(comment)
    return dispatch => {
        firebase.database().ref('/events/'+eventId).child('subscribers/'+userId).set({
          id: userId,
          comment: comment
        })
        console.log('***')
    }
}

function getCurrentEventId() {
    return (dispatch, getState) => {
        return getState().currentEvent.id
    };
}



export function unsubscribe(userId, eventId) {
  return dispatch => {
    firebase.database().ref('/events/' + eventId).child('subscribers/' + userId).remove()
  }
};

export function watchSubscriberAdded(dispatch) {
    //dispatch({ type: EVENT_REQUEST_START });
    console.log(getCurrentEventId())
    firebase.database().ref('/events').on('child_added', (snap) => {
        let newEvent = snap.val()
        const newEventKey = snap.key
        firebase.database().ref('/events/'+snap.key).on('child_added', data => {
            if(data.key ==='subscribers') {
                    newEvent = {...newEvent, subscribers: data.val(), id: newEventKey}
                    dispatch({ type: EVENT_ADDED, payload: newEvent });
            }
        })
    })
    //dispatch({ type: EVENT_REQUEST_END })
}

export function watchSubscriberRemoved(dispatch) {
    dispatch({ type: EVENT_REQUEST_START });
    firebase.database().ref('/events').on('child_removed', (snap) => {
        dispatch({ type: EVENT_REMOVED, payload: snap.key });
    })
}