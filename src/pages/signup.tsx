import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import { useState } from 'react';

export default function Signup() {
	const [isSignup, setIsSignup] = useState(true);

	return (
		<>
			<Navbar />
			<section className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
					{/* Form Section */}
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
						<h1 className="text-3xl font-bold mb-4 text-center">
							{isSignup ? 'Create an Account' : 'Welcome Back'}
						</h1>
						<p className="text-gray-600 text-center mb-6">
							{isSignup
								? 'Sign up to start managing your business with ease.'
								: 'Log in to access your account.'}
						</p>
						<form>
							{isSignup && (
								<div className="mb-4">
									<label className="block text-gray-700 font-bold mb-2">
										Full Name
									</label>
									<input
										type="text"
										className="w-full p-2 border rounded"
										placeholder="Your Full Name"
									/>
								</div>
							)}
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">
									Email
								</label>
								<input
									type="email"
									className="w-full p-2 border rounded"
									placeholder="Your Email"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">
									Password
								</label>
								<input
									type="password"
									className="w-full p-2 border rounded"
									placeholder="Your Password"
								/>
							</div>
							<button
								type="submit"
								className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
							>
								{isSignup ? 'Sign Up' : 'Log In'}
							</button>
						</form>
						<div className="flex justify-center items-center mt-6">
							<span
								className={`cursor-pointer text-sm font-bold ${
									isSignup ? 'text-gray-900' : 'text-gray-400'
								}`}
								onClick={() => setIsSignup(true)}
							>
								Sign Up
							</span>
							<span className="mx-4 text-gray-400">|</span>
							<span
								className={`cursor-pointer text-sm font-bold ${
									!isSignup ? 'text-gray-900' : 'text-gray-400'
								}`}
								onClick={() => setIsSignup(false)}
							>
								Log In
							</span>
						</div>
						<div className="flex justify-center mt-4">
							<div
								className={`h-1 w-16 rounded-full ${
									isSignup ? 'bg-blue-600' : 'bg-gray-300'
								}`}
							></div>
							<div
								className={`h-1 w-16 rounded-full ${
									!isSignup ? 'bg-blue-600' : 'bg-gray-300'
								}`}
							></div>
						</div>
					</div>

					{/* Image Section */}
					<div className="md:w-1/2 hidden md:flex justify-center">
						<img
							src="/signup-image.jpg"
							alt="Signup Illustration"
							className="w-full h-auto object-cover rounded-lg shadow-md"
						/>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
