import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import { useState } from 'react';
import Image from 'next/image';
import '@/app/animations.css'; // Importing a CSS file for animations
import Link from 'next/link';

export default function Signup() {
	const [isSignup, setIsSignup] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		console.log('Signing up with:', { email, password });
	};

	return (
		<>
			<Navbar />
			<section className="min-h-screen flex items-center justify-between">
				{/* Image Section */}
				<div className=" w-full md:flex justify-center">
					<Image
						src="/signup.jpg"
						alt="Signup Illustration"
						className="w-[80%] h-auto object-cover rounded-lg"
						width={1000}
						height={1000}
						quality={50}
					/>
				</div>
				{/* Form Section */}
				<div className="h-screen flex items-center w-[600px] mx-8 bg-white p-8 rounded-lg">
					<div className="w-full">
						{isSignup ? (
							<div>
								<h1 className="text-3xl font-bold mb-4 text-center">
									Create an Account
								</h1>
								<p className="text-gray-600 text-center mb-6">
									Sign up to start managing your business with
									ease.
								</p>
								<form onSubmit={handleSubmit}>
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
									<div className="mb-4">
										<label className="block text-gray-700 font-bold mb-2">
											Email
										</label>
										<input
											type="email"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											className="w-full p-2 border rounded"
											placeholder="Your Email"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700 font-bold mb-2">
											Password
										</label>
										<input
											type="password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											className="w-full p-2 border rounded"
											placeholder="Your Password"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700 font-bold mb-2">
											Confirm Password
										</label>
										<input
											type="password"
											value={confirmPassword}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value
												)
											}
											className="w-full p-2 border rounded"
											placeholder="Confirm Your Password"
											required
										/>
									</div>
									<button
										type="submit"
										className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
									>
										Sign Up
									</button>
								</form>
							</div>
						) : (
							<div>
								<h1 className="text-3xl font-bold mb-4 text-center">
									Welcome Back
								</h1>
								<p className="text-gray-600 text-center mb-6">
									Log in to access your account.
								</p>
								<form onSubmit={handleSubmit}>
									<div className="mb-4">
										<label className="block text-gray-700 font-bold mb-2">
											Email
										</label>
										<input
											type="email"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											className="w-full p-2 border rounded"
											placeholder="Your Email"
											required
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700 font-bold mb-2">
											Password
										</label>
										<input
											type="password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											className="w-full p-2 border rounded"
											placeholder="Your Password"
											required
										/>
									</div>
									<button
										type="submit"
										className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
									>
										Log In
									</button>
								</form>
								{/* Added a 'Forgot your password?' link */}
								<div className="text-center mt-4">
									<Link
										href="/forgot-password"
										className="text-sm text-blue-600 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>
							</div>
						)}
						<div className="flex justify-center items-center mt-12 space-x-4">
							<span
								className={`w-full text-right cursor-pointer text-sm font-bold ${
									isSignup ? 'text-gray-900' : 'text-gray-400'
								}`}
								onClick={() => setIsSignup(true)}
							>
								Sign Up
							</span>
							<span className="text-gray-400">|</span>    
							<span
								className={`w-full cursor-pointer text-sm font-bold ${
									!isSignup
										? 'text-gray-900'
										: 'text-gray-400'
								}`}
								onClick={() => setIsSignup(false)}
							>
								Log In
							</span>
						</div>
						<div className="flex justify-center gap-2 mt-4 ">
							<div
								className={`h-1 w-16 rounded-full transition-colors duration-300 ${
									isSignup ? 'bg-blue-600' : 'bg-gray-300'
								}`}
							></div>
							<div
								className={`h-1 w-16 rounded-full transition-colors duration-300 ${
									!isSignup ? 'bg-blue-600' : 'bg-gray-300'
								}`}
							></div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
