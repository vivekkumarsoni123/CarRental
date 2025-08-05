import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../booking/BookingForm';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBooking, setShowBooking] = useState(false);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`/api/cars/${id}`); // Adjust the API endpoint as necessary
                setCar(response.data);
            } catch (err) {
                setError('Error fetching car details');
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="car-details">
            <h2>{car.name}</h2>
            <img src={car.image_url} alt={car.name} />
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Seats:</strong> {car.seats}</p>
            <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
            <p><strong>Price per Day:</strong> ${car.price_per_day}</p>
            <p><strong>Description:</strong> {car.description}</p>
            <button className="book-button" onClick={() => setShowBooking(true)}>Book Now</button>
            {showBooking && <BookingForm car={car} onClose={() => setShowBooking(false)} />}
        </div>
    );
};

export default CarDetails;