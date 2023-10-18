import React, { useState } from 'react';
import { createData, updateData } from '../services/apiService';

const FormComponent = ({ data, onClose, id, getData }) => {
  const [formData, setFormData] = useState({
    name: data ? data.name : '',
    phoneNumber: data ? data.phoneNumber : '',
    email: data ? data.email : '',
    hobbies: data ? data.hobbies : '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let res;

      if (id) {
        res = await updateData(id, formData)
      } else {
        res = await createData(formData)
      }

      const { data } = res
      if (data.error) return

      getData()
      onClose()

    } catch (error) {}
  };

  return (
    <form className='bg-dark text-light' onSubmit={handleSubmit}>
      <div className="form-group mx-auto my-2">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name}
          onChange={handleInputChange} required />
      </div>
      <div className="form-group mx-auto my-2">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" className="form-control" id="phoneNumber" name="phoneNumber"
          value={formData.phoneNumber} onChange={handleInputChange} required maxLength={10}/>
      </div>
      <div className="form-group mx-auto my-2">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email}
          onChange={handleInputChange} required />
      </div>
      <div className="form-group mx-auto my-2">
        <label htmlFor="hobbies">Hobbies</label>
        <input type="text" className="form-control" id="hobbies" name="hobbies" value={formData.hobbies}
          onChange={handleInputChange} required />
      </div>
      <div className="btn-group mx-auto my-2 text-center w-100">
        <button type="submit" className="btn btn-primary">Save</button>
        <button onClick={onClose} className="btn btn-danger">Cancel</button>
      </div>
    </form>
  );
};

export default FormComponent;