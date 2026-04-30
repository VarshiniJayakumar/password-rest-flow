import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, { email, password });
            toast.success(response.data.message);
            // In a real app, you'd store the token here
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow border-0">
                    <div className="card-body p-4 text-center">
                        <h3 className="mb-4">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="mt-3">
                            <Link to="/forgot-password" title="Go to forgot password page">Forgot Password?</Link>
                        </div>
                        <div className="mt-2 text-muted small">
                            New user? <Link to="/register">Register here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
