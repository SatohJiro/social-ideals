import {
  REQUEST_POST_CAPTION,
  REQUEST_POST_CAPTION_SUCCESS,
  REQUEST_POST_CAPTION_FAILURE,
  REQUEST_SAVE_CAPTION,
  SAVE_CAPTION_SUCCESS,
  SAVE_CAPTION_FAILURE,
  RESET_POST_CAPTION_AND_IDEA,
  GENERATE_POST_IDEAS_REQUEST,
  GENERATE_CAPTIONS_FROM_IDEA_REQUEST,
  GENERATE_POST_IDEAS_SUCCESS,
  GENERATE_CAPTIONS_FROM_IDEA_SUCCESS,
  GENERATE_POST_IDEAS_FAILURE,
  GENERATE_CAPTIONS_FROM_IDEA_FAILURE,
} from "@/constants";

const initialState = {
  loading: false,
  saving: false,
  ideadGenerating: false,
  ideas: [],
  captions: [],
  error: null,
};

const postCaptionReducer = (state = initialState, action) => {
  switch (action.type) {
    //REQUEST
    case REQUEST_POST_CAPTION:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_POST_CAPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        captions: action.payload,
        error: null,
      };
    case REQUEST_POST_CAPTION_FAILURE:
      return {
        ...state,
        loading: false,
        captions: [],
        error: action.payload,
      };
    //SAVE
    case REQUEST_SAVE_CAPTION:
      return {
        ...state,
        saving: true,
        error: null,
      };
    case SAVE_CAPTION_SUCCESS:
      return {
        ...state,
        saving: false,
      };
    case SAVE_CAPTION_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload,
      };
    //RESET
    case RESET_POST_CAPTION_AND_IDEA:
      return { ...state, captions: [], ideas: [], error: null };
    //IDEAL
    case GENERATE_POST_IDEAS_REQUEST:
    case GENERATE_CAPTIONS_FROM_IDEA_REQUEST:
      return {
        ...state,
        ideadGenerating: true,
      };
    case GENERATE_POST_IDEAS_SUCCESS:
      return {
        ...state,
        ideadGenerating: false,
        ideas: action.payload,
      };
    case GENERATE_CAPTIONS_FROM_IDEA_SUCCESS:
      return {
        ...state,
        ideadGenerating: false,
        captions: action.payload,
      };
    case GENERATE_POST_IDEAS_FAILURE:
    case GENERATE_CAPTIONS_FROM_IDEA_FAILURE:
      return {
        ...state,
        ideadGenerating: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postCaptionReducer;
