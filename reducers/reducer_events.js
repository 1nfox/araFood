const INITIAL_STATE = {
  events: {},
  loading: false
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case 'EVENT_REQUEST_START':
            return { ...state, ...INITIAL_STATE, loading: true };
        case 'EVENT_REQUEST_SUCCESS':
            return { ...state, ...INITIAL_STATE, events: action.payload};
        case 'EVENT_REQUEST_ERROR':
            return { ...state, ...INITIAL_STATE, error: action.payload };
        case 'EVENT_ADDED':
            return { ...state, ...INITIAL_STATE};
        case 'EVENT_REMOVED':
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case 'EVENT_REQUEST_END':
            return { ...state, loading: false };
        default:
            return state;
  }
};

export default reducer;