import { useState } from 'react';
import '@/app/globals.css'; // Importing global styles
import Link from 'next/link';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password reset link sent to:', email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <p className="text-gray-600 text-center mb-4">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                            autoComplete='off'
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send Reset Link
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Remembered your password? <Link href="/signup" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}