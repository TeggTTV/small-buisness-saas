import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import {
	FileText,
	DollarSign,
	Users,
	Calendar,
	BarChart,
	CreditCard,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
	{
		title: 'Invoicing',
		description:
			'Create and send professional invoices to your clients with ease.',
		icon: <FileText className="w-12 h-12 text-blue-600" />,
	},
	{
		title: 'Expense Tracking',
		description:
			'Track your business expenses effortlessly and stay organized.',
		icon: <DollarSign className="w-12 h-12 text-green-600" />,
	},
	{
		title: 'Client Database',
		description: 'Manage all your client information in one secure place.',
		icon: <Users className="w-12 h-12 text-purple-600" />,
	},
	{
		title: 'Task Scheduler',
		description:
			'Schedule tasks and appointments with ease and efficiency.',
		icon: <Calendar className="w-12 h-12 text-yellow-600" />,
	},
	{
		title: 'Dashboard',
		description: 'Get real-time insights into your income and expenses.',
		icon: <BarChart className="w-12 h-12 text-red-600" />,
	},
	{
		title: 'Payment Tracking',
		description: 'Keep track of all your payments and dues in one place.',
		icon: <CreditCard className="w-12 h-12 text-teal-600" />,
	},
];

export default function Home() {
	return (
		<>
			<Navbar />
			{/* Hero Section */}
			<section className="pt-20">
				<div className="container mx-8 px-6 gap-4 flex flex-col md:flex-row items-center">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<h1 className="text-5xl font-extrabold mb-6 text-center md:text-left">
							Empower Your Business with MySaaS
						</h1>
						<p className="text-lg text-gray-600 mb-8 text-center md:text-left">
							Streamline your operations and grow your business
							with our all-in-one toolkit.
						</p>
						<div className="flex justify-center md:justify-start gap-4">
							<Link
								href="/signup"
								className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
							>
								Get Started
							</Link>
							<a
								href="#features"
								className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg text-lg hover:bg-gray-300 transition"
							>
								Learn More
							</a>
						</div>
					</div>
					<div className="md:w-1/2 flex justify-center">
						<Image
							src="/5451235.jpg"
							alt="Hero"
							className="w-full h-auto object-cover rounded-lg"
							width={500}
							height={500}
							quality={50}
						/>
					</div>
				</div>
			</section>

			{/* Feature Highlights */}
			<section id="features" className="bg-gray-50 py-16">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-12">
						Key Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
							>
								<div className="flex items-center justify-center mb-4">
									{feature.icon}
								</div>
								<h3 className="text-xl font-bold text-center mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-600 text-center">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-12">
						What Our Clients Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="p-6 bg-white rounded-lg shadow">
							<p className="text-gray-600 mb-4">
								&quot;This toolkit has transformed the way I
								manage my business. Highly recommend!&quot;
							</p>
							<h4 className="text-lg font-bold">
								- Alex, Freelancer
							</h4>
						</div>
						<div className="p-6 bg-white rounded-lg shadow">
							<p className="text-gray-600 mb-4">
								&quot;The invoicing feature alone is worth it.
								So easy to use!&quot;
							</p>
							<h4 className="text-lg font-bold">
								- Jamie, Small Business Owner
							</h4>
						</div>
						<div className="p-6 bg-white rounded-lg shadow">
							<p className="text-gray-600 mb-4">
								&quot;I love the dashboard insights. It helps me
								stay on top of my finances.&quot;
							</p>
							<h4 className="text-lg font-bold">
								- Taylor, Entrepreneur
							</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Plans Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-12">
						Choose Your Plan
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="p-6 bg-gray-50 rounded-lg shadow">
							<h3 className="text-xl font-bold text-center mb-4">
								Free Plan
							</h3>
							<p className="text-gray-600 text-center mb-6">
								Basic features to get started.
							</p>
							<ul className="text-gray-600 mb-6">
								<li>- Invoicing</li>
								<li>- Expense Tracking</li>
								<li>- Client Database</li>
							</ul>
							<div className="text-center">
								<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
									Sign Up
								</button>
							</div>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg shadow">
							<h3 className="text-xl font-bold text-center mb-4">
								One-Time Upgrade
							</h3>
							<p className="text-gray-600 text-center mb-6">
								Full access to all features.
							</p>
							<ul className="text-gray-600 mb-6">
								<li>- Everything in Free Plan</li>
								<li>- Task Scheduler</li>
								<li>- Business Analytics</li>
							</ul>
							<div className="text-center">
								<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
									Upgrade
								</button>
							</div>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg shadow">
							<h3 className="text-xl font-bold text-center mb-4">
								Team Plan
							</h3>
							<p className="text-gray-600 text-center mb-6">
								For growing teams and businesses.
							</p>
							<ul className="text-gray-600 mb-6">
								<li>- Everything in Upgrade Plan</li>
								<li>- Role Management</li>
								<li>- Recurring Billing</li>
							</ul>
							<div className="text-center">
								<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
									Get Started
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-16 bg-blue-600 text-white text-center">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold mb-6">
						Ready to Get Started?
					</h2>
					<p className="text-lg mb-8">
						Sign up today and take your business to the next level
						with MySaaS.
					</p>
					<Link
						href="/signup"
						className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg hover:bg-gray-100 transition"
					>
						Sign Up Now
					</Link>
				</div>
			</section>

			<Footer />
		</>
	);
}
