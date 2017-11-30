const INITIAL_STATE = {
  loading: false,
  user: null,
  error: ''
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return { ...state, ...INITIAL_STATE, loading: true };
    case 'SIGN_IN_SUCCESS':
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case 'SIGN_IN_FAILURE':
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case 'SET_INITIAL_STATE':
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default reducer;