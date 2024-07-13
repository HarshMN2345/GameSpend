import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGameForm: React.FC = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    genreId: '',
    price: '',
    releaseDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5239/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          GenreId: parseInt(formData.genreId), // Assuming GenreId should be an integer
          price: parseFloat(formData.price), // Parse price as float
          releaseDate: formData.releaseDate
        })
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Game added successfully');
        navigate('/');

      } else {
        // Handle error (e.g., show an error message)
        console.error('Failed to add game');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='m-5'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter game name" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Genre</label>
          <select className="form-control" id="exampleFormControlSelect1" name="genreId" value={formData.genreId} onChange={handleInputChange} required>
            <option value="">Select genre</option>
            <option value="1">Fighting</option>
            <option value="2">RolePlaying</option>
            <option value="3">Strategy</option>
            <option value="4">Action</option>
            <option value="5">Simulation</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Price</label>
          <input type="number" className="form-control" id="exampleFormControlInput2" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Release Date</label>
          <input type="date" className="form-control" id="exampleFormControlTextarea1" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default AddGameForm;
