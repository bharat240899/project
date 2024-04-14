import React, { useState } from 'react';

const GradeForm = () => {
  const [formData, setFormData] = useState({
    knowledge: '',
    teachingSkills: '',
    communication: '',
    problemSolving: '',
    analyticalSkills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with your form submission logic

    // Logic for form submission success
    // Assuming the form is successfully submitted, reset the form fields
    setFormData({
      knowledge: '',
      teachingSkills: '',
      communication: '',
      problemSolving: '',
      analyticalSkills: ''
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Performance Evaluation Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="knowledge" className="form-label">Knowledge in Subject:</label>
          <input
            type="number"
            className="form-control"
            id="knowledge"
            name="knowledge"
            min="1"
            max="10"
            value={formData.knowledge}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="teachingSkills" className="form-label">Teaching Skills:</label>
          <input
            type="number"
            className="form-control"
            id="teachingSkills"
            name="teachingSkills"
            min="1"
            max="10"
            value={formData.teachingSkills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="communication" className="form-label">Communication:</label>
          <input
            type="number"
            className="form-control"
            id="communication"
            name="communication"
            min="1"
            max="10"
            value={formData.communication}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="problemSolving" className="form-label">Problem Solving Skills:</label>
          <input
            type="number"
            className="form-control"
            id="problemSolving"
            name="problemSolving"
            min="1"
            max="10"
            value={formData.problemSolving}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="analyticalSkills" className="form-label">Analytical Skills:</label>
          <input
            type="number"
            className="form-control"
            id="analyticalSkills"
            name="analyticalSkills"
            min="1"
            max="10"
            value={formData.analyticalSkills}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Evaluation</button>
      </form>
    </div>
  );
};

export default GradeForm;
