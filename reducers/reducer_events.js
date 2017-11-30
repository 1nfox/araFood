const INITIAL_STATE = {
  events: [],
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case 'EVENT_REQUEST_START':
            return { ...state, ...INITIAL_STATE, loading: true };
        case 'EVENT_REQUEST_SUCCESS':
            return { ...state, ...INITIAL_STATE, events: action.payload, loading: false };
        case 'EVENT_REQUEST_ERROR':
            return { ...state, ...INITIAL_STATE, error: action.payload };
        case 'EVENT_ADDED':
            return { ...state, ...INITIAL_STATE, loading: true };
        case 'EVENT_REMOVED':
            return { ...state, ...INITIAL_STATE, user: action.payload };
        default:
            return state;
  }
};

export default reducer;