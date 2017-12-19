const INITIAL_STATE = {
  events: [],
  loading: false,
  current_event: []
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case 'EVENT_REQUEST_START':
            return { ...state, loading: true };
        case 'EVENT_REQUEST_SUCCESS':
            return { ...state, events: action.payload};
        case 'CURRENT_EVENT_REQUEST_SUCCESS':
            return { ...state, current_event: action.payload};
        case 'EVENT_REQUEST_ERROR':
            return { ...state, ...INITIAL_STATE, error: action.payload };
        case 'EVENT_ADDED':
            return { ...state, events : [...state.events, action.payload]};
        case 'EVENT_REMOVED':
            const index_event = state.events.findIndex( item => item.id === action.payload)
            return { ...state, events : [...state.events.slice(0, index_event), ...state.events.slice(index_event + 1)] };
        case 'SUBSCRIBER_ADDED':
            return { ...state, current_event : {...state.current_event, subscribers: [...state.current_event.subscribers, action.payload] }};
        case 'SUBSCRIBER_REMOVED':
            console.log('***************************')
            console.log(state.current_event)
            console.log(action.payload)
            const index = state.current_event.subscribers.findIndex( item => item.id === action.payload.id)
            return { ...state, current_event : {...state.current_event, subscribers: [...state.current_event.subscribers.slice(0, index), ...state.current_event.subscribers.slice(index + 1)]} };

        case 'EVENT_REQUEST_END':
            return { ...state, loading: false };
        default:
            return state;
  }
};

export default reducer;