import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export default function Contact() {
	return (
		<>
			<Navbar />
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
					<p className="text-lg text-gray-600 text-center mb-8">
						Have questions? We&apos;d love to hear from you. Reach out to us anytime.
					</p>
					<div className="max-w-lg mx-auto">
						<div className="mb-6">
							<h2 className="text-xl font-bold mb-2">Email</h2>
							<p className="text-gray-600">support@mysaas.com</p>
						</div>
						<div className="mb-6">
							<h2 className="text-xl font-bold mb-2">Phone</h2>
							<p className="text-gray-600">+1 (555) 123-4567</p>
						</div>
						<div className="mb-6">
							<h2 className="text-xl font-bold mb-2">Address</h2>
							<p className="text-gray-600">
								123 SaaS Street, Suite 100<br />
								Business City, BC 12345
							</p>
						</div>
						<form>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">Name</label>
								<input type="text" className="w-full p-2 border rounded" placeholder="Your Name" />
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">Email</label>
								<input type="email" className="w-full p-2 border rounded" placeholder="Your Email" />
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">Message</label>
								<textarea className="w-full p-2 border rounded" rows={4} placeholder="Your Message"></textarea>
							</div>
							<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
								Send Message
							</button>
						</form>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
