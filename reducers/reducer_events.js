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
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case 'EVENT_REQUEST_END':
            return { ...state, loading: false };
        default:
            return state;
  }
};

export default reducer;