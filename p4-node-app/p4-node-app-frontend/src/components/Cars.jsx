import axios from 'axios';
import { useEffect, useState } from 'react'

const Cars = () => {
    const [carInfo, setCarInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/cars')
            .then((res) => {
                console.log('Response data:', res.data);
                setCarInfo(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching cars:', err);
            });
    }, []);

    return (
        <>
            <h2>Hello</h2>
            {carInfo.length > 0 ? (
                carInfo.map((car) => (
                    <div key={car._id}>
                        <h3>Chassis Name: {car.chassis_name}</h3>
                        <p>Power Unit: {car.power_unit}</p>
                        <p>Fuel Brand: {car.fuel_brand}</p>
                        <p>Lead Designer: {car.lead_designer}</p>
                    </div>
                ))
            ) : (
                <p>No car data available</p>
            )}
        </>
    );
};

export default Cars;