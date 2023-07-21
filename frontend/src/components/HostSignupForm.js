import React, { useState } from 'react';

const HostSignupForm = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password || ''} onChange={handleChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="text" name="profile_picture" value={formData.profile_picture || ''} onChange={handleChange} />
      </div>
      <div>
        <label>About:</label>
        <textarea name="about" value={formData.about || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Hosting Since:</label>
        <input type="date" name="hosting_since" value={formData.hosting_since || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Host Status:</label>
        <input
          type="checkbox"
          name="host_status"
          checked={formData.host_status || false}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default HostSignupForm;