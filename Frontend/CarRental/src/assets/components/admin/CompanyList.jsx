import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addCompany } from '../../../api';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', logo_url: '', created_by: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('/api/admin/allcompanies');
                setCompanies(response.data);
            } catch (err) {
                setError('Failed to fetch companies');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [message]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addCompany(form);
            setMessage(res.data?.message || 'Company added!');
            setForm({ name: '', logo_url: '', created_by: '' });
        } catch (err) {
            setMessage('Failed to add company.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Company List</h2>
            <div className="companies-grid">
                {companies.length === 0 ? (
                    <div>No companies found.</div>
                ) : (
                    companies.map((company, idx) => (
                        <div key={company.company_id || company.id || idx} className="company-card">
                            <img src={company.logo_url || 'https://via.placeholder.com/100x100?text=Logo'} alt={company.name || company.company_name} className="company-logo" />
                            <h3>{company.name || company.company_name}</h3>
                            <p>Created By: {company.created_by}</p>
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Add Company</h3>
                <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} required />
                <input name="logo_url" placeholder="Logo URL" value={form.logo_url} onChange={handleChange} />
                <input name="created_by" placeholder="Created By (Admin ID)" value={form.created_by} onChange={handleChange} required />
                <button type="submit">Add Company</button>
                {message && <div className="form-message">{message}</div>}
            </form>
        </div>
    );
};

export default CompanyList;