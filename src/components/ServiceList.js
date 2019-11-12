import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices } from '../actions/actionCreators';
import { NavLink } from 'react-router-dom';

function ServiceList(props) {
  console.log('serviceList')
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  const handleRemove = id => {
    dispatch(removeService(id));
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }

  return (
    <ul>
      {items.map(o => (
        <li key={o.id}>
          {o.name} {o.price}
          <NavLink to={`/services/${o.id}`} className="btn btn-primary">Edit</NavLink>
          <button className="btn btn-primary" onClick={() => handleRemove(o.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList
