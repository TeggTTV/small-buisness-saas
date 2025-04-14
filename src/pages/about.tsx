import Navbar from '@/components/Navbar';
import '@/app/globals.css';

export default function About() {
	return (
		<>
			<Navbar />
			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
					<p className="text-lg text-gray-600 text-center">
						MySaaS is dedicated to empowering small businesses with tools to streamline operations and grow efficiently.
					</p>
				</div>
			</section>
		</>
	);
}
