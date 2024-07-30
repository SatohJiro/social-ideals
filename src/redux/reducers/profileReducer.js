import {
  RECEIVE_USER_CONTENTS,
  REQUEST_USER_CONTENTS,
  UNSAVE_CONTENT_FAILURE,
  UNSAVE_CONTENT_SUCCESS,
} from "@/constants";

const initialState = {
  contents: [],
  loading: false,
  error: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_CONTENTS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_USER_CONTENTS:
      return {
        ...state,
        loading: false,
        contents: action.payload,
      };
    case UNSAVE_CONTENT_SUCCESS:
      return {
        ...state,
        contents: state.contents.filter(
          (content) => content.id !== action.payload
        ),
      };
    case UNSAVE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contentReducer;
