import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { bookCar } from '../../../api'; // <-- fixed import path

const BookingForm = ({ car, onClose }) => {
    const [formData, setFormData] = useState({
        cus_id: '',
        car_id: car ? car.id || car.car_id : '',
        start_date: '',
        end_date: '',
        status: 'Pending',
        admin_id: '',
        payment_status: 'Pending',
        total_price: car ? car.price_per_day : ''
    });

    useEffect(() => {
        if (car) {
            setFormData((prev) => ({
                ...prev,
                car_id: car.id || car.car_id,
                total_price: car.price_per_day
            }));
        }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await bookCar(formData);
            alert('Booking successful!');
            if (onClose) onClose();
        } catch (error) {
            console.error('Error booking car:', error);
            alert('Failed to book car. Please try again.');
        }
    };

    return (
        <div className="booking-form">
            <h2>Book a Car</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer ID:</label>
                    <input type="text" name="cus_id" value={formData.cus_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>Car ID:</label>
                    <input type="text" name="car_id" value={formData.car_id} onChange={handleChange} required readOnly={!!car} />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Total Price:</label>
                    <input type="number" name="total_price" value={formData.total_price} onChange={handleChange} required />
                </div>
                <button type="submit">Book Now</button>
                {onClose && <button type="button" onClick={onClose}>Cancel</button>}
            </form>
        </div>
    );
};

export default BookingForm;