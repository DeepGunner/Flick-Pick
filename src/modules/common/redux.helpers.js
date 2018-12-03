// Helper function to enables passing an object with

// the action.type as the key and the reducer function as the value

export const createReducer = (initialState = {}, actionHandlerKeyFuncs = {}) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
};

// Creates a basic action
export const createAction = (type, actionProps) => {
  return {
    type,
    ...actionProps
  };
}

export const createAsyncActionCreator = (actionType, asyncRequestFn, requestParams) => {
  return (dispatch) => {
    dispatch(createAction(`${actionType}_START`, {request: requestParams}));
    return asyncRequestFn(requestParams)
      .then(response => {
        response.json()
          .then(json => dispatch(createAction(`${actionType}_SUCCESS`, { response: json })))
          .catch(error => dispatch(createAction(`${actionType}_ERROR`, { error })));
      });
      
  };
}


const initialAsyncState = { isLoading: false, response: undefined, request: undefined };

export const createAsyncReducer = (actionType, actionHandlerKeyFuncs = {}, initialState = initialAsyncState) => {
  const startReducerOverrideFn = actionHandlerKeyFuncs[`${actionType}_START`];
  const startReducerFn = (state, action) => ({
      ...state,
      isLoading: true,
      request: action.request
  });
  const successReducerOverrideFn = actionHandlerKeyFuncs[`${actionType}_SUCCESS`];
  const successReducerFn = successReducerOverrideFn ? successReducerOverrideFn : (state, action) => ({
      ...state,
      isLoading: false,
      response: action.response
  });
  const errorReducerOverrideFn = actionHandlerKeyFuncs[`${actionType}_ERROR`];
  const errorReducerFn = (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error
  });

  return createReducer(
    initialState,
    {
      [`${actionType}_START`]: startReducerFn,
      [`${actionType}_SUCCESS`]: successReducerFn,
      [`${actionType}_ERROR`]: errorReducerFn
    }
  );
}
