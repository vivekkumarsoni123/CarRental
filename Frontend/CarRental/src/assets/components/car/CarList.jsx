import React, { useEffect, useState } from 'react';
import { fetchCars } from '../../../api';
import BookingForm from '../booking/BookingForm'; // Import BookingForm
import './car.css';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await fetchCars();
                console.log('Cars response:', response);
                setCars(response.data || []);
            } catch (err) {
                console.error('Error fetching cars:', err);
                setError(err.message || 'Failed to load cars');
            } finally {
                setLoading(false);
            }
        };
        getCars();
    }, []);

    const handleBookNow = (car) => {
        setSelectedCar(car);
        setShowBooking(true);
    };

    const handleCloseBooking = () => {
        setShowBooking(false);
        setSelectedCar(null);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading cars...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <h3>Error loading cars</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="car-list-container" style={{ background: 'linear-gradient(135deg, #eafaf1 0%, #f6fff7 100%)' }}>
            <div className="car-list-header">
                <h1 style={{ color: '#43e97b' }}>Available Cars</h1>
                <p>Choose from our premium collection of vehicles</p>
            </div>
            {showBooking && selectedCar && (
                <BookingForm car={selectedCar} onClose={handleCloseBooking} />
            )}
            {cars.length === 0 ? (
                <div className="no-cars">
                    <div className="no-cars-icon">🚗</div>
                    <h3>No cars available</h3>
                    <p>Check back later for new additions to our fleet</p>
                </div>
            ) : (
                <div className="car-grid">
                    {cars.map((car, index) => (
                        <div key={index} className="car-card" style={{ border: '1px solid #43e97b', background: '#f6fff7' }}>
                            <div className="car-image">
                                <img
                                    src={car.image_url || 'https://via.placeholder.com/400x250?text=Car+Image'}
                                    alt={car.name}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x250?text=Car+Image';
                                    }}
                                />
                                <div className="car-badge">
                                    {car.available ? 'Available' : 'Not Available'}
                                </div>
                                <div className="car-overlay">
                                    <div className="car-company">
                                        {car.company_name || 'Premium Brand'}
                                    </div>
                                </div>
                            </div>
                            <div className="car-content">
                                <h3 className="car-name">{car.name || 'Car Model'}</h3>
                                <div className="car-details">
                                    <div className="car-spec">
                                        <span className="spec-icon">🎨</span>
                                        <span>{car.color || 'Color'}</span>
                                    </div>
                                    <div className="car-spec">
                                        <span className="spec-icon">💺</span>
                                        <span>{car.seats || 'Seats'} Seats</span>
                                    </div>
                                    <div className="car-spec">
                                        <span className="spec-icon">⛽</span>
                                        <span>{car.fuel_type || 'Fuel Type'}</span>
                                    </div>
                                </div>
                                <div className="car-price">
                                    <span className="price-label">Price per day:</span>
                                    <span className="price-amount">${car.price_per_day || '0'}</span>
                                </div>
                                <div className="car-actions">
                                    <button className="view-details-btn">
                                        View Details
                                    </button>
                                    <button
                                        className="book-now-btn"
                                        disabled={!car.available}
                                        onClick={() => handleBookNow(car)}
                                    >
                                        {car.available ? 'Book Now' : 'Not Available'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarList;