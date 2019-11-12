import {
  CHANGE_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  GET_SERVICE_REQUEST,
  GET_SERVICE_FAILTURE,
  GET_SERVICE_SUCCESS,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_FAILTURE,
} from '../actions/actionTypes'

const initialState = {
  item: { id: 0, name: '', price: '', content: ''},
  loading: false,
  error: null,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SERVICE_REQUEST:
    case GET_SERVICE_REQUEST:
    case ADD_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_SERVICE_FAILTURE:
    case GET_SERVICE_FAILTURE:
    case ADD_SERVICE_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case ADD_SERVICE_SUCCESS:
      return {...initialState};
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const { item } = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        }
      };
    case GET_SERVICE_SUCCESS: {
      const { id, name, price, content } = action.payload
      return {
        ...state,
        loading: false,
        item: {
          id: id,
          name: name,
          price: price,
          content: content
        }
      }
    }
    default:
      return state;
  }
}
