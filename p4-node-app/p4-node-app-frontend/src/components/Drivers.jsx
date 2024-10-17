import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        broadcast_name: '',
        driver_number: '',
        birthday: '',
        zodiac_sign: '',
        country_name: '',
        team_name: '',
        years_driving: '',
        wins_2024: '',
        podiums_2024: '',
        points_2024: '',
    });
    const [editMode, setEditMode] = useState(false);

    const fetchDrivers = async () => {
        console.log('fetchDrivers called');
        try {
            const response = await axios.get('http://localhost:3000/drivers');
            console.log('API Response:', response.data);
    

            if (response.data && Array.isArray(response.data.data)) {
                const activeDrivers = response.data.data.filter(driver => driver._status === "active");
                setDrivers(activeDrivers);
            } else {
                console.error('Expected an array of drivers but got:', response.data);
                setDrivers([]); 
            }
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting driver data:', formData);
            if (editMode) {
                if (!formData.id) {
                    throw new Error('Driver ID is not set for update.');
                }
                const response = await axios.patch(`http://localhost:3000/drivers/${formData.id}`, formData);
                alert('Driver updated successfully!');
            } else {
                const response = await axios.post('http://localhost:3000/drivers/new', formData);
                alert('Driver added successfully!');
            }
        } catch (error) {
            console.error('Error updating or adding driver:', error.response ? error.response.data : error.message);
            alert('Error updating or adding driver: ' + (error.response ? error.response.data.message : error.message));
        } finally {
            fetchDrivers(); 

            setFormData({
                id: '',
                first_name: '',
                last_name: '',
                broadcast_name: '',
                driver_number: '',
                birthday: '',
                zodiac_sign: '',
                country_name: '',
                team_name: '',
                years_driving: '',
                wins_2024: '',
                podiums_2024: '',
                points_2024: '',
            });
            setEditMode(false);
        }
    };

    const handleEdit = (driver) => {
        setFormData({
            id: driver._id,
            first_name: driver.first_name,
            last_name: driver.last_name,
            broadcast_name: driver.broadcast_name,
            driver_number: driver.driver_number,
            birthday: driver.birthday,
            zodiac_sign: driver.zodiac_sign,
            country_name: driver.country_name,
            team_name: driver.team_name,
            years_driving: driver.years_driving,
            wins_2024: driver.wins_2024,
            podiums_2024: driver.podiums_2024,
            points_2024: driver.points_2024,
        });
        setEditMode(true);
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/drivers/${id}`);
            alert('Driver deleted successfully!');
            fetchDrivers(); 
        } catch (error) {
            console.error('Error deleting driver:', error);
            alert('Error deleting driver. Please try again.');
        }
    };

    return (
        <div>
            <h2>Drivers</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name: </label>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required /><br />
                <label htmlFor="last_name">Last Name: </label>
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required /><br />
                <label htmlFor="broadcast_name">Broadcast Name: </label>
                <input type="text" name="broadcast_name" placeholder="Broadcast Name" value={formData.broadcast_name} onChange={handleChange} required /><br />
                <label htmlFor="driver_number">Driver Number: </label>
                <input type="number" name="driver_number" placeholder="Driver Number" value={formData.driver_number} onChange={handleChange} required /><br />
                <label htmlFor="birthday">Birthday: </label>
                <input type="text" name="birthday" placeholder="Birthday (e.g. 1969-04-20)" value={formData.birthday} onChange={handleChange} required /><br />
                <label htmlFor="zodiac_sign">Zodiac Sign: </label>
                <input type="text" name="zodiac_sign" placeholder="Zodiac Sign" value={formData.zodiac_sign} onChange={handleChange} required /><br />
                <label htmlFor="country_name">Country: </label>
                <input type="text" name="country_name" placeholder="Country" value={formData.country_name} onChange={handleChange} required /><br />
                <label htmlFor="team_name">Team: </label>
                <input type="text" name="team_name" placeholder="Team" value={formData.team_name} onChange={handleChange} required /><br />
                <label htmlFor="years_driving">Years Active: </label>
                <input type="number" name="years_driving" placeholder="Years Active" value={formData.years_driving} onChange={handleChange} required /><br />
                <label htmlFor="wins_2024">2024 Wins: </label>
                <input type="number" name="wins_2024" placeholder="2024 Wins" value={formData.wins_2024} onChange={handleChange} required /><br />
                <label htmlFor="podiums_2024">2024 Podiums: </label>
                <input type="number" name="podiums_2024" placeholder="2024 Podiums" value={formData.podiums_2024} onChange={handleChange} required /><br />
                <label htmlFor="points_2024">2024 Points: </label>
                <input type="number" name="points_2024" placeholder="2024 Points" value={formData.points_2024} onChange={handleChange} required /><br />
                <button type="submit">{editMode ? 'Update Driver' : 'Add Driver'}</button>
            </form>
            <ul>
                {drivers.map(driver => (
                    <li key={driver._id}>
                        {driver.first_name} {driver.last_name} 
                        <button onClick={() => handleEdit(driver)}>Edit</button>
                        <button onClick={() => handleDelete(driver._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Drivers;