import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    Name: '',
    StartDate: '',
    EndDate: '',
    ClientID: '',
    Budget: '',
    Status: 'Pending',
    Address: '',
    AmountPaid: '',
  });

  // Fetch all projects on component mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update a project
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ClientID and Budget
    if (!formData.ClientID || isNaN(formData.ClientID)) {
      alert('Please enter a valid ClientID');
      return;
    }

    if (!formData.Budget || isNaN(formData.Budget)) {
      alert('Please enter a valid Budget');
      return;
    }

    // Validate AmountPaid
    if (!formData.AmountPaid || isNaN(formData.AmountPaid)) {
      alert('Please enter a valid Amount Paid');
      return;
    }

    // Convert to appropriate types
    const updatedFormData = {
      ...formData,
      ClientID: parseInt(formData.ClientID),
      Budget: parseFloat(formData.Budget),
      AmountPaid: parseFloat(formData.AmountPaid),
    };

    if (!selectedProject) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/projects/${selectedProject.ProjectID}`,
        updatedFormData
      );
      console.log(response.data);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.ProjectID === selectedProject.ProjectID
            ? { ...project, ...updatedFormData }
            : project
        )
      );
      setSelectedProject(null);
      setFormData({
        id: '',
        Name: '',
        StartDate: '',
        EndDate: '',
        ClientID: '',
        Budget: '',
        Status: 'Pending',
        Address: '',
        AmountPaid: '',
      });
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  // Handle delete project
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios
        .delete(`http://localhost:5000/projects/${id}`)
        .then((response) => {
          console.log(response.data);
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.ProjectID !== id)
          );
        })
        .catch((error) => {
          console.error('Error deleting project:', error);
        });
    }
  };

  // Handle project selection for editing
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setFormData({
      id: project.ProjectID,
      Name: project.Name,
      StartDate: project.StartDate,
      EndDate: project.EndDate,
      ClientID: project.ClientID,
      Budget: project.Budget,
      Status: project.Status,
      Address: project.Address,
      AmountPaid: project.AmountPaid,
    });
  };

  return (
    <div>
      <h2>Projects</h2>

      {/* Displaying Projects in a Table */}
      <div>
        <h3>All Projects</h3>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Client ID</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Address</th>
              <th>Amount Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.ProjectID}>
                <td>{project.ProjectID}</td>
                <td>{project.Name}</td>
                <td>{project.StartDate}</td>
                <td>{project.EndDate}</td>
                <td>{project.ClientID}</td>
                <td>{project.Budget}</td>
                <td>{project.Status}</td>
                <td>{project.Address}</td>
                <td>{project.AmountPaid}</td>
                <td>
                  <button onClick={() => handleSelectProject(project)}>Edit</button>
                  <button onClick={() => handleDelete(project.ProjectID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form to update project */}
      {selectedProject && (
        <div>
          <h3>Edit Project</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Start Date:
              <input
                type="date"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              End Date:
              <input
                type="date"
                name="EndDate"
                value={formData.EndDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Client ID:
              <input
                type="number"
                name="ClientID"
                value={formData.ClientID}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Budget:
              <input
                type="number"
                name="Budget"
                value={formData.Budget}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Status:
              <select
                name="Status"
                value={formData.Status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Amount Paid:
              <input
                type="number"
                name="AmountPaid"
                value={formData.AmountPaid}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Update Project</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Projects;
