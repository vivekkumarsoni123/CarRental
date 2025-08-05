import React, { useEffect, useState } from 'react';
import { getBookings } from '../../../api'; // Assuming you have a function to fetch bookings from the API

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings(); // Fetch bookings from the API
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="booking-list">
            <h2>Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <p>Car ID: {booking.car_id}</p>
                            <p>Start Date: {booking.start_date}</p>
                            <p>End Date: {booking.end_date}</p>
                            <p>Status: {booking.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingList;