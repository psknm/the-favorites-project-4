import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        team_name: '',
        team_country: '',
        team_color: '',
        driver1_first_name: '',
        driver1_last_name: '',
        driver2_first_name: '',
        driver2_last_name: '',
        points: 0,
        years_active: 0,
    });
    const [editMode, setEditMode] = useState(false);

    const fetchTeams = async () => {
        console.log('fetchTeams called');
        try {
            const response = await axios.get('http://localhost:3000/teams');
            console.log('API Response:', response.data); 

           
            if (response.data && Array.isArray(response.data.data)) {
                const activeTeams = response.data.data.filter(team => team._status === "active");
                setTeams(activeTeams);
            } else {
                console.error('Expected an array of teams but got:', response.data);
                setTeams([]);
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting team data:', formData);
            if (editMode) {
                if (!formData.id) {
                    throw new Error('Team ID is not set for update.');
                }
                const response = await axios.patch(`http://localhost:3000/teams/${formData.id}`, formData);
                alert('Team updated successfully!');
            } else {
                const response = await axios.post('http://localhost:3000/teams/new', formData);
                alert('Team added successfully!');
            }
        } catch (error) {
            console.error('Error updating or adding team:', error.response ? error.response.data : error.message);
            alert('Error updating or adding team: ' + (error.response ? error.response.data.message : error.message));
        } finally {
            fetchTeams();
   
            setFormData({
                id: '',
                team_name: '',
                team_country: '',
                team_color: '',
                driver1_first_name: '',
                driver1_last_name: '',
                driver2_first_name: '',
                driver2_last_name: '',
                points: 0,
                years_active: 0,
            });
            setEditMode(false);
        }
    };

    const handleEdit = (team) => {
        setFormData({
            id: team._id,
            team_name: team.team_name,
            team_country: team.team_country,
            team_color: team.team_color,
            driver1_first_name: team.driver1_first_name,
            driver1_last_name: team.driver1_last_name,
            driver2_first_name: team.driver2_first_name,
            driver2_last_name: team.driver2_last_name,
            points: team.points,
            years_active: team.years_active,
        });
        setEditMode(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/teams/${id}`);
            alert('Team deleted successfully!');
            fetchTeams();
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Error deleting team. Please try again.');
        }
    };

    return (
        <div>
            <h2>Teams</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="team_name">Team Name: </label>
                <input type="text" name="team_name" placeholder="Team Name" value={formData.team_name} onChange={handleChange} required /><br />
                <label htmlFor="team_country">Country: </label>
                <input type="text" name="team_country" placeholder="Country" value={formData.team_country} onChange={handleChange} required /><br />
                <label htmlFor="team_color">Team Color: </label>
                <input type="text" name="team_color" placeholder="Team Color" value={formData.team_color} onChange={handleChange} required /><br />
                <label htmlFor="driver1_first_name">Driver 1 First Name: </label>
                <input type="text" name="driver1_first_name" placeholder="Driver 1 First Name" value={formData.driver1_first_name} onChange={handleChange} required /><br />
                <label htmlFor="driver1_last_name">Driver 1 Last Name: </label>
                <input type="text" name="driver1_last_name" placeholder="Driver 1 Last Name" value={formData.driver1_last_name} onChange={handleChange} required /><br />
                <label htmlFor="driver2_first_name">Driver 2 First Name: </label>
                <input type="text" name="driver2_first_name" placeholder="Driver 2 First Name" value={formData.driver2_first_name} onChange={handleChange} required /><br />
                <label htmlFor="driver2_last_name">Driver 2 Last Name: </label>
                <input type="text" name="driver2_last_name" placeholder="Driver 2 Last Name" value={formData.driver2_last_name} onChange={handleChange} required /><br />
                <label htmlFor="points">Points: </label>
                <input type="number" name="points" placeholder="Points" value={formData.points} onChange={handleChange} required /><br />
                <label htmlFor="years_active">Years Active: </label>
                <input type="number" name="years_active" placeholder="Years Active" value={formData.years_active} onChange={handleChange} required /><br />
                <button type="submit">{editMode ? 'Update Team' : 'Add Team'}</button>
            </form>
            <ul>
                {teams.map(team => (
                    <li key={team._id}>
                        {team.team_name}
                        <button onClick={() => handleEdit(team)}>Edit</button>
                        <button onClick={() => handleDelete(team._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Teams;