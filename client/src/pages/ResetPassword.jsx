import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                // We'll add a simple verify route or just use the reset route with no password
                await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/verify-token/${token}`);
                setIsValid(true);
            } catch (error) {
                toast.error('Invalid or expired reset link');
                setIsValid(false);
            } finally {
                setVerifying(false);
            }
        };
        verifyToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/reset-password/${token}`, { password });
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    if (verifying) return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Verifying reset link...</p>
        </div>
    );

    if (!isValid) return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 text-center">
                <div className="alert alert-danger shadow-sm">
                    <h4 className="alert-heading">Invalid Link</h4>
                    <p>This password reset link is invalid or has expired.</p>
                    <hr />
                    <button className="btn btn-outline-danger btn-sm" onClick={() => navigate('/forgot-password')}>
                        Request New Link
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-5">
                        <h3 className="card-title text-center mb-4 fw-bold text-primary">Reset Password</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label text-secondary small fw-bold">NEW PASSWORD</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg bg-light border-0"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-secondary small fw-bold">CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg bg-light border-0"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 mb-3 shadow-sm rounded-3"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

