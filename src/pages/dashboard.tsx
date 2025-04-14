import Navbar from '@/components/Navbar';
import '@/app/globals.css';
import { useState } from 'react';
import {
	BarChart,
	FileText,
	Users,
	Settings,
	HelpCircle,
	LogOut,
	ChevronDown,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Invoice {
	id: number;
	client: string;
	number: string;
	status: string;
	amount: number;
	cost: number; // New field for cost
	dueDate: string;
	details: string;
	avatar: string;
}

export default function Dashboard() {
	const [invoices, setInvoices] = useState(
		Array.from({ length: 20 }, (_, index) => {
			const id = index + 1;
			const clientNames = [
				'John Doe',
				'Jane Smith',
				'Alice Johnson',
				'Bob Lee',
				'Charlie Brown',
			];
			const statuses = ['Paid', 'Overdue', 'Draft'];
			const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
			const randomAmount = Math.floor(Math.random() * 500) + 50; // Random amount between $50 and $550
			const randomCost = Math.floor(randomAmount * 0.6); // Cost is 60% of the amount
			const randomDay = Math.floor(Math.random() * 28) + 1;
			const avatars = [
				'/avatars/avatar1.png',
				'/avatars/avatar2.png',
				'/avatars/avatar3.png',
				'/avatars/avatar4.png',
				'/avatars/avatar5.png',
			];
			const client = clientNames[index % clientNames.length];
			return {
				id,
				client,
				number: `INV-${id.toString().padStart(3, '0')}`,
				status: randomStatus,
				amount: randomAmount,
				cost: randomCost,
					dueDate: `2023-${(index % 12 + 1).toString().padStart(2, '0')}-${randomDay
					.toString()
					.padStart(2, '0')}`,
				details:
					id % 2 === 0
						? 'Payment received via bank transfer.'
						: 'Awaiting payment confirmation.',
				avatar: avatars[index % avatars.length],
			};
		})
	);

	const [expandedSections, setExpandedSections] = useState<string[]>([]);

	const toggleSection = (section: string) => {
		setExpandedSections((prev) =>
			prev.includes(section)
				? prev.filter((s) => s !== section)
				: [...prev, section]
		);
	};

	// Calculate widget data
	const totalInvoices = invoices.length;
	const outstandingAmounts = invoices
		.filter((invoice) => invoice.status !== 'Paid')
		.reduce((sum, invoice) => sum + invoice.amount, 0);
	const paidThisMonth = invoices
		.filter((invoice) => invoice.status === 'Paid')
		.reduce((sum, invoice) => sum + invoice.amount, 0);
	const totalProfit = invoices.reduce((sum, invoice) => sum + (invoice.amount - invoice.cost), 0);

	// Prepare data for the graph
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const graphData = {
		labels: invoices.map((invoice) => months[parseInt(invoice.dueDate.split('-')[1], 10) - 1]),
		datasets: [
			{
				label: 'Profit',
				data: invoices.map((invoice) => invoice.amount - invoice.cost),
				borderColor: '#3b82f6', // Blue color
				backgroundColor: 'rgba(59, 130, 246, 0.2)',
				tension: 0.4,
				fill: true,
			},
		],
	};

	const graphOptions = {
		responsive: true,
		maintainAspectRatio: false, // Prevent the graph from overflowing
		plugins: {
			legend: {
				display: true,
				position: 'top',
				labels: {
					color: '#374151', // Dark gray
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Month',
					color: '#6b7280', // Gray color
				},
				grid: {
					display: false,
				},
			},
			y: {
				title: {
					display: true,
					text: 'Profit ($)',
					color: '#6b7280', // Gray color
				},
				grid: {
					color: '#e5e7eb', // Light gray grid lines
				},
			},
		},
	};

	return (
		<>
			<Navbar />
			<div className="flex min-h-screen bg-gray-50">
				{/* Sidebar */}
				<aside className="w-64 bg-white shadow-lg">
					<div className="p-3">
												</div>
					<nav className="px-6">
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className="flex items-center gap-4 text-gray-700 hover:text-green-600"
																	>
									<BarChart className="w-5 h-5" />
									Dashboard
								</a>
							</li>
							<li>
								<div
									className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-green-600"
									onClick={() => toggleSection('sales')}
								>
									<div className="flex items-center gap-4">
										<FileText className="w-5 h-5" />
										Sales & Payments
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform ${
											expandedSections.includes('sales')
												? 'rotate-180'
												: ''
										}`}
									/>
								</div>
								{expandedSections.includes('sales') && (
									<ul className="pl-8 mt-2 space-y-2">
										<li>
											<a
												href="#"
												className="text-gray-600 hover:text-green-600"
																							>
												Invoices
											</a>
										</li>
										<li>
											<a
												href="#"
												className="text-gray-600 hover:text-green-600"
																							>
												Payments
											</a>
										</li>
									</ul>
								)}
							</li>
							<li>
								<div
									className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-green-600"
									onClick={() => toggleSection('clients')}
								>
									<div className="flex items-center gap-4">
										<Users className="w-5 h-5" />
										Clients
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform ${
											expandedSections.includes(
												'clients'
											)
												? 'rotate-180'
												: ''
										}`}
									/>
								</div>
								{expandedSections.includes('clients') && (
									<ul className="pl-8 mt-2 space-y-2">
										<li>
											<a
												href="#"
												className="text-gray-600 hover:text-green-600"
																							>
												Client List
											</a>
										</li>
										<li>
											<a
												href="#"
												className="text-gray-600 hover:text-green-600"
																							>
												Add New Client
											</a>
										</li>
									</ul>
								)}
							</li>
							<li>
								<a
									href="#"
									className="flex items-center gap-4 text-gray-700 hover:text-green-600"
																	>
									<Settings className="w-5 h-5" />
									Settings
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center gap-4 text-gray-700 hover:text-green-600"
									onClick={() => alert('Opening Help')}
								>
									<HelpCircle className="w-5 h-5" />
									Help
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center gap-4 text-gray-700 hover:text-red-600"
																	>
									<LogOut className="w-5 h-5" />
									Logout
								</a>
							</li>
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6">
					{/* Widgets */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
						<div className="p-4 bg-white rounded-lg shadow">
							<h3 className="text-lg font-bold text-gray-700">
								Total Invoices
							</h3>
							<p className="text-2xl font-bold text-green-600">
								{totalInvoices}
							</p>
						</div>
						<div className="p-4 bg-white rounded-lg shadow">
							<h3 className="text-lg font-bold text-gray-700">
								Outstanding Amounts
							</h3>
							<p className="text-2xl font-bold text-red-600">
								${outstandingAmounts.toFixed(2)}
							</p>
						</div>
						<div className="p-4 bg-white rounded-lg shadow">
							<h3 className="text-lg font-bold text-gray-700">
								Paid This Month
							</h3>
							<p className="text-2xl font-bold text-blue-600">
								${paidThisMonth.toFixed(2)}
							</p>
						</div>
						<div className="p-4 bg-white rounded-lg shadow">
							<h3 className="text-lg font-bold text-gray-700">
								Total Profit
							</h3>
							<p className="text-2xl font-bold text-purple-600">
								${totalProfit.toFixed(2)}
							</p>
						</div>
					</div>

					{/* Graph */}
					<div className="bg-white p-6 rounded-lg shadow mb-6">
						<h3 className="text-lg font-bold text-gray-700 mb-4">
							Profit Overview
						</h3>
						<p className="text-sm text-gray-500 mb-4">
							Monthly profit trends based on invoices.
						</p>
						<div className="relative h-96">
							<Line data={graphData} options={graphOptions} />
						</div>
					</div>

					{/* Invoices Table */}
					<div className="bg-white shadow rounded-lg overflow-hidden">
						<h3 className="text-lg font-bold text-gray-700 px-6 py-4 border-b">
							Invoice List
						</h3>
						<div className="overflow-y-auto max-h-96">
							<table className="min-w-full table-auto">
								<thead className="bg-gray-100 border-b">
									<tr>
										<th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
											Number
										</th>
										<th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
											Date
										</th>
										<th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
											Customer
										</th>
										<th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
											Total
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{invoices.map((invoice) => (
										<tr key={invoice.id}>
											<td className="px-6 py-4 text-sm text-gray-800">
												{invoice.number}
											</td>
											<td className="px-6 py-4 text-sm">
												<span
													className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
														invoice.status === 'Paid'
															? 'bg-green-100 text-green-800'
															: invoice.status ===
															  'Overdue'
															? 'bg-red-100 text-red-800'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													{invoice.status}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-800">
												{invoice.dueDate}
											</td>
											<td className="px-6 py-4 text-sm flex items-center gap-2">
												<img
													src={invoice.avatar}
													alt={invoice.client}
													className="w-8 h-8 rounded-full"
												/>
												<span>{invoice.client}</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-800">
												${invoice.amount}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
