import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export default function Privacy() {
	return (
		<>
			<Navbar />
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
					<p className="text-lg text-gray-600 mb-6">
						Your privacy is important to us. This page outlines how we handle your data and protect your information.
					</p>
					<h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
					<p className="text-gray-600 mb-4">
						We collect information you provide directly to us, such as when you create an account, fill out a form, or contact support.
					</p>
					<h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
					<p className="text-gray-600 mb-4">
						We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.
					</p>
					<h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
					<p className="text-gray-600 mb-4">
						We do not share your personal information with third parties except as necessary to provide our services or comply with legal obligations.
					</p>
					<h2 className="text-2xl font-bold mb-4">Your Rights</h2>
					<p className="text-gray-600 mb-4">
						You have the right to access, update, or delete your personal information. Contact us at support@mysaas.com for assistance.
					</p>
				</div>
			</section>
			<Footer />
		</>
	);
}
