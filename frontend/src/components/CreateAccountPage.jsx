import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CreateAccountPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { validateInviteToken, createAccountFromInvite, isLoading, error } = useAuth();

  const [step, setStep] = useState(1); // 1: Validate, 2: Verify, 3: Create
  const [tokenData, setTokenData] = useState(null);
  const [formData, setFormData] = useState({
    token: '',
    graduation_year: '',
    password: '',
    confirm_password: ''
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setFormData(prev => ({ ...prev, token }));
      validateToken(token);
    }
  }, [searchParams]);

  const validateToken = async (token) => {
    const result = await validateInviteToken(token);
    if (result.success) {
      setTokenData(result.invite_info);
      setStep(2);
    } else {
      setValidationError(result.error || 'Invalid invitation link');
    }
  };

  const handleVerifyGraduation = async (e) => {
    e.preventDefault();
    
    if (parseInt(formData.graduation_year) !== tokenData.graduation_year) {
      setValidationError('Graduation year does not match our records');
      return;
    }
    
    setValidationError('');
    setStep(3);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirm_password) {
      setValidationError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return;
    }
    
    // Create account
    const result = await createAccountFromInvite({
      token: formData.token,
      password: formData.password,
      graduation_year: formData.graduation_year
    });
    
    if (result.success) {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!searchParams.get('token')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Invalid Invitation
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This page requires a valid invitation token.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome to the Alumni Platform
          </p>
        </div>

        {validationError && (
          <div className="bg-red-50 border border-red-300 rounded-md p-4">
            <p className="text-red-700 text-sm">{validationError}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 rounded-md p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Step 1: Token Validation (Auto-processed) */}
        {step === 1 && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Validating your invitation...</p>
          </div>
        )}

        {/* Step 2: Graduation Year Verification */}
        {step === 2 && tokenData && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyGraduation}>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
              <h3 className="font-medium text-blue-900 mb-2">Invitation Details</h3>
              <p className="text-blue-700 text-sm">Email: {tokenData.email}</p>
              <p className="text-blue-700 text-sm">Department: {tokenData.department}</p>
              <p className="text-blue-700 text-sm">User Type: {tokenData.user_type}</p>
              <p className="text-blue-700 text-sm">Institution: {tokenData.institution_name}</p>
            </div>

            <div>
              <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-700">
                Please confirm your graduation year
              </label>
              <input
                id="graduation_year"
                name="graduation_year"
                type="number"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder="YYYY"
                value={formData.graduation_year}
                onChange={handleInputChange}
                min="1950"
                max="2030"
              />
              <p className="text-xs text-gray-500 mt-1">
                This must match the year in our records
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Graduation Year'}
            </button>
          </form>
        )}

        {/* Step 3: Create Password */}
        {step === 3 && (
          <form className="mt-8 space-y-6" onSubmit={handleCreateAccount}>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <p className="text-green-700 text-sm">
                ✅ Graduation year verified! Now create your password.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength="8"
                />
              </div>

              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  minLength="8"
                />
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <p>Password requirements:</p>
              <ul className="list-disc list-inside mt-1">
                <li>At least 8 characters long</li>
                <li>Use a combination of letters, numbers, and symbols</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact your institution's administrator for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
