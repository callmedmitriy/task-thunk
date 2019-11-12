import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE_REQUEST,
  REMOVE_SERVICE_FAILTURE,
  REMOVE_SERVICE_SUCCESS,
  GET_SERVICE_REQUEST,
  GET_SERVICE_FAILTURE,
  GET_SERVICE_SUCCESS,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_FAILTURE,
  UPDATE_SERVICE_SUCCESS,
} from './actionTypes';

export const updateServiceRequest = () => ({
  type: UPDATE_SERVICE_REQUEST,

})
export const updateServiceFailture = error => ({
  type: UPDATE_SERVICE_FAILTURE,
  payload: {
    error,
  }

})
export const updateServiceSuccess = () => ({
  type: UPDATE_SERVICE_SUCCESS,

})

export const getServiceRequest = () => ({
  type: GET_SERVICE_REQUEST,
});

export const getServiceFailture = error => ({
  type: GET_SERVICE_FAILTURE,
  payload: {
    error,
  }
});

export const getServiceSuccess = (id, name, price, content) => ({
  type: GET_SERVICE_SUCCESS,
  payload: {
    id,
    name,
    price,
    content
  }
})

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
})

export const addServiceFailure = message => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    message,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeServiceRequest = () => ({
  type: REMOVE_SERVICE_REQUEST,
});
export const removeServiceFailture = error => ({
  type: REMOVE_SERVICE_FAILTURE,
  payload: {
    error,
  },
});
export const removeServiceSuccess = id => ({
  type: REMOVE_SERVICE_SUCCESS,
  payload: {
    id,
  },
});

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {serviceAdd: {item: {name, price}}} = getState();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, price}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }

  dispatch(fetchServices());
};

export const updateService = item => async (dispatch, getState) => {
  console.log('update')
  console.log(item)
  dispatch(updateServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(getService(item.id));
  } catch (e) {
    dispatch(updateServiceFailture(e.message));
  }

  dispatch(fetchServices());
};

export const removeService = id => async (dispatch, getState) => {
  dispatch(removeServiceRequest());
  try {
    const response = await fetch(`http://localhost:7070/api/services/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    dispatch(fetchServices())
  } catch (e) {
    dispatch(removeServiceFailture(e.message))
  }
};

export const getService = id => async (dispatch) => {
  dispatch(getServiceRequest());
  try {
    const response = await fetch(`http://localhost:7070/api/services/${id}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data)
    dispatch(getServiceSuccess(data.id,data.name,data.price,data.content))

  } catch (e) {
    dispatch(getServiceFailture(e.message))
  }
}

