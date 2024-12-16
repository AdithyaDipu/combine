import React, { useState } from 'react';

function Temp() {
  const [formData, setFormData] = useState({
    Nitrogen: '',
    Phosporus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    Ph: '',
    Rainfall: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data.top_5_crops);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div>
      <h1>Crop Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <input name="Nitrogen" placeholder="Nitrogen" value={formData.Nitrogen} onChange={handleChange} />
        <input name="Phosporus" placeholder="Phosphorus" value={formData.Phosporus} onChange={handleChange} />
        <input name="Potassium" placeholder="Potassium" value={formData.Potassium} onChange={handleChange} />
        <input name="Temperature" placeholder="Temperature" value={formData.Temperature} onChange={handleChange} />
        <input name="Humidity" placeholder="Humidity" value={formData.Humidity} onChange={handleChange} />
        <input name="Ph" placeholder="pH" value={formData.Ph} onChange={handleChange} />
        <input name="Rainfall" placeholder="Rainfall" value={formData.Rainfall} onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>
      {result && (
        <div>
          <h2>Recommended Crops</h2>
          <ul>
            {result.map((item, index) => (
              <li key={index}>
                {item.crop} (Probability: {item.probability.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Temp;
