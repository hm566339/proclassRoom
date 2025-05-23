const initialState = {
  students: [],
  loading: false,
  error: null,
};

export const enrollstudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ENROLLED_STUDENTS":
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: null,
      };
    case "SET_ENROLLED_STUDENTS_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
