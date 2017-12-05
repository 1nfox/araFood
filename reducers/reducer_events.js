const INITIAL_STATE = {
  events: [],
  loading: false
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case 'EVENT_REQUEST_START':
            return { ...state, loading: true };
        case 'EVENT_REQUEST_SUCCESS':
            return { ...state, events: action.payload};
        case 'EVENT_REQUEST_ERROR':
            return { ...state, ...INITIAL_STATE, error: action.payload };
        case 'EVENT_ADDED':
            return { ...state, events : [...state.events, action.payload]};
        case 'EVENT_REMOVED':
            const index = state.events.findIndex( item => item.id === action.payload)
            return { ...state, events : [...state.events.slice(0, index), ...state.events.slice(index + 1)] };
        case 'EVENT_REQUEST_END':
            return { ...state, loading: false };
        default:
            return state;
  }
};

export default reducer;