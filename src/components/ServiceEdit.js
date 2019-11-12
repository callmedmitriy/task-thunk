import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeServiceField, updateService, getService} from '../actions/actionCreators';
import { NavLink } from 'react-router-dom';

export default function ServiceEdit({match}) {
  const {item, loading, error} = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  const id = Number(match.params.id)

  useEffect(() => {
    dispatch(getService(id))
  }, [dispatch])


  const handleChange = evt => {
    const {name, value} = evt.target
    dispatch(changeServiceField(name,value))
  }

  const handleUpdate = evt => {
    evt.preventDefault()
    dispatch(updateService(item))
  }

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
       loading
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
       Something went wrong try again
      </div>
    )
  }

  return (
    <form>
        <div className="form-group">
          <label >ID</label>
          <input className="form-control" name='id' disabled value={item.id} />
        </div>
        <div className="form-group">
          <label >Name</label>
          <input className="form-control" name='name' onChange={handleChange} value={item.name} />
        </div>
        <div className="form-group">
          <label >Price</label>
          <input className="form-control" name='price' onChange={handleChange} value={item.price} />
        </div>
        <div className="form-group">
          <label >Content</label>
          <input className="form-control" name='content' onChange={handleChange} value={item.content} />
        </div>
        <div className="form-group">
          <button className="btn btn-primary mb-2" onClick={handleUpdate}>Update</button>
        </div>
        <div className="form-group">
          <NavLink to="/services" className="btn btn-primary mb-2">Back</NavLink>
        </div>
    </form>
  )
}