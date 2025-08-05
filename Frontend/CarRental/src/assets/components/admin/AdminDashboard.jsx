import React, { useEffect, useState } from 'react';
import { fetchAllCompanies, addCompany, addCarVariant, fetchAllCarVariants } from '../../../api';

// Example static images for companies and cars
const companiesPhoto = [
    'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
];
const carPhotos = [
    'https://images.unsplash.com/photo-1511391403515-5c1b6c1a1b8b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519643381401-22b62b24e493?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8a0?auto=format&fit=crop&w=400&q=80'
];

const AdminDashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [carVariants, setCarVariants] = useState([]);
    const [companyForm, setCompanyForm] = useState({ name: '', logo_url: '', created_by: '' });
    const [variantForm, setVariantForm] = useState({
        name: '', color: '', seats: '', fuel_type: '', company_id: '', price_per_day: '', available: true, image_url: ''
    });
    const [companyMsg, setCompanyMsg] = useState('');
    const [variantMsg, setVariantMsg] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [loadingVariants, setLoadingVariants] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(true);

    useEffect(() => {
        const getCompanies = async () => {
            setLoadingCompanies(true);
            try {
                const response = await fetchAllCompanies();
                setCompanies(response.data || []);
            } catch (error) {
                setCompanies([]);
            } finally {
                setLoadingCompanies(false);
            }
        };
        getCompanies();
    }, [companyMsg]);

    useEffect(() => {
        const getVariants = async () => {
            setLoadingVariants(true);
            try {
                const response = await fetchAllCarVariants();
                setCarVariants(response.data || []);
            } catch (error) {
                setCarVariants([]);
            } finally {
                setLoadingVariants(false);
            }
        };
        getVariants();
    }, [variantMsg]);

    useEffect(() => {
        const getBookings = async () => {
            setLoadingBookings(true);
            try {
                // Replace with your API for fetching bookings
                const response = await fetch('/api/admin/allbookings');
                const data = await response.json();
                setBookings(data || []);
            } catch (error) {
                setBookings([]);
            } finally {
                setLoadingBookings(false);
            }
        };
        getBookings();
    }, []);

    const handleCompanyChange = (e) => {
        setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
    };

    const handleCompanySubmit = async (e) => {
        e.preventDefault();
        setCompanyMsg('');
        try {
            const res = await addCompany(companyForm);
            setCompanyMsg(res.data?.message || 'Company added!');
            setCompanyForm({ name: '', logo_url: '', created_by: '' });
        } catch (err) {
            setCompanyMsg('Failed to add company.');
        }
    };

    const handleVariantChange = (e) => {
        setVariantForm({ ...variantForm, [e.target.name]: e.target.value });
    };

    const handleVariantSubmit = async (e) => {
        e.preventDefault();
        setVariantMsg('');
        try {
            const res = await addCarVariant({
                ...variantForm,
                seats: Number(variantForm.seats),
                company_id: Number(variantForm.company_id),
                price_per_day: Number(variantForm.price_per_day),
                available: variantForm.available === 'true' || variantForm.available === true
            });
            setVariantMsg(res.data?.message || 'Car variant added!');
            setVariantForm({ name: '', color: '', seats: '', fuel_type: '', company_id: '', price_per_day: '', available: true, image_url: '' });
        } catch (err) {
            setVariantMsg('Failed to add car variant.');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="dashboard-forms">
                <form onSubmit={handleCompanySubmit} className="dashboard-form styled-form">
                    <h3>Add New Company</h3>
                    <input name="name" placeholder="Company Name" value={companyForm.name} onChange={handleCompanyChange} required className="form-input"/>
                    <input name="logo_url" placeholder="Logo URL" value={companyForm.logo_url} onChange={handleCompanyChange} className="form-input"/>
                    <input name="created_by" placeholder="Created By (Admin ID)" value={companyForm.created_by} onChange={handleCompanyChange} required className="form-input"/>
                    <button type="submit" className="form-button">Add Company</button>
                    {companyMsg && <div className="form-message">{companyMsg}</div>}
                </form>
                <form onSubmit={handleVariantSubmit} className="dashboard-form styled-form">
                    <h3>Add Car Variant</h3>
                    <input name="name" placeholder="Car Name" value={variantForm.name} onChange={handleVariantChange} required className="form-input"/>
                    <input name="color" placeholder="Color" value={variantForm.color} onChange={handleVariantChange} required className="form-input"/>
                    <input name="seats" type="number" placeholder="Seats" value={variantForm.seats} onChange={handleVariantChange} required className="form-input"/>
                    <input name="fuel_type" placeholder="Fuel Type" value={variantForm.fuel_type} onChange={handleVariantChange} required className="form-input"/>
                    <input name="company_id" type="number" placeholder="Company ID" value={variantForm.company_id} onChange={handleVariantChange} required className="form-input"/>
                    <input name="price_per_day" type="number" placeholder="Price Per Day" value={variantForm.price_per_day} onChange={handleVariantChange} required className="form-input"/>
                    <select name="available" value={variantForm.available} onChange={handleVariantChange} className="form-input">
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                    <input name="image_url" placeholder="Image URL" value={variantForm.image_url} onChange={handleVariantChange} className="form-input"/>
                    <button type="submit" className="form-button">Add Car Variant</button>
                    {variantMsg && <div className="form-message">{variantMsg}</div>}
                </form>
            </div>
            <hr />
            <h2 className="section-title">Car Companies Available</h2>
            {loadingCompanies ? (
                <div>Loading companies...</div>
            ) : (
                <div className="companies-grid">
                    {companies.length === 0 ? (
                        <div className="no-data">
                            <div className="no-data-icon">🏢</div>
                            <h3>No companies available</h3>
                            <p>Check back later for our partner companies</p>
                        </div>
                    ) : (
                        companies.map((company, idx) => (
                            <div key={company.company_id || company.id || idx} className="company-card">
                                <div className="company-image">
                                    <img
                                        src={companiesPhoto[idx % companiesPhoto.length]}
                                        alt={company.name || company.company_name}
                                        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px' }}
                                    />
                                </div>
                                <div className="company-icon">🏢</div>
                                <h3>{company.name || company.company_name}</h3>
                                <p>{company.description || 'Premium car rental partner'}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
            <hr />
            <h2 className="section-title">Available Car Variants</h2>
            {loadingVariants ? (
                <div>Loading car variants...</div>
            ) : (
                <div className="car-variants-grid">
                    {carVariants.length === 0 ? (
                        <div className="no-data">
                            <div className="no-data-icon">🚗</div>
                            <h3>No car variants available</h3>
                            <p>Check back later for our car collection</p>
                        </div>
                    ) : (
                        carVariants.map((variant, idx) => (
                            <div key={variant.car_id || idx} className="variant-card">
                                <div className="variant-image">
                                    <img
                                        src={carPhotos[idx % carPhotos.length]}
                                        alt={variant.name}
                                        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px' }}
                                    />
                                </div>
                                <div className="variant-info">
                                    <h3>{variant.name || 'Car Model'}</h3>
                                    <div className="variant-details">
                                        <span className="detail-item">
                                            <span className="detail-icon">🎨</span>
                                            {variant.color || 'Color'}
                                        </span>
                                        <span className="detail-item">
                                            <span className="detail-icon">💺</span>
                                            {variant.seats || 'Seats'} Seats
                                        </span>
                                        <span className="detail-item">
                                            <span className="detail-icon">⛽</span>
                                            {variant.fuel_type || 'Fuel Type'}
                                        </span>
                                    </div>
                                    <div className="variant-price">
                                        <span className="price-label">Price per day:</span>
                                        <span className="price-amount">${variant.price_per_day || '0'}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <hr />
            <h2 className="section-title">Bookings</h2>
            {loadingBookings ? (
                <div>Loading bookings...</div>
            ) : (
                <div className="bookings-grid">
                    {bookings.length === 0 ? (
                        <div>No bookings found.</div>
                    ) : (
                        bookings.map((booking, idx) => (
                            <div key={booking.booking_id || idx} className="booking-card">
                                <h3>Booking #{booking.booking_id || idx + 1}</h3>
                                <p>Customer ID: {booking.cus_id}</p>
                                <p>Car ID: {booking.car_id}</p>
                                <p>Start: {booking.start_date}</p>
                                <p>End: {booking.end_date}</p>
                                <p>Status: {booking.status}</p>
                                <p>Payment: {booking.payment_status}</p>
                                <p>Total Price: ${booking.total_price}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;