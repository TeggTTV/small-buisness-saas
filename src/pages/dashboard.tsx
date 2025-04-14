import Navbar from '@/components/Navbar';
import '@/app/globals.css';
import { useState, useEffect, useRef } from 'react';
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

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function Dashboard() {
	const [selectedSection, setSelectedSection] = useState('dashboard'); // Track selected section
	const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(
		null
	); // Track selected invoice for viewing
	const [clients, setClients] = useState([
		{
			id: 1,
			name: 'John Doe',
			email: 'john@example.com',
			phone: '123-456-7890',
		},
		{
			id: 2,
			name: 'Jane Smith',
			email: 'jane@example.com',
			phone: '987-654-3210',
		},
	]); // Example client list
	const [newClient, setNewClient] = useState({
		name: '',
		email: '',
		phone: '',
	});

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
			const randomStatus =
				statuses[Math.floor(Math.random() * statuses.length)];
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
				dueDate: `2023-${((index % 12) + 1)
					.toString()
					.padStart(2, '0')}-${randomDay
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
	const totalProfit = invoices.reduce(
		(sum, invoice) => sum + (invoice.amount - invoice.cost),
		0
	);

	// Prepare data for the graph (last 6 months)
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const last6Months = invoices.slice(-6); // Get the last 6 invoices
	const graphData = {
		labels: last6Months.map(
			(invoice) => months[parseInt(invoice.dueDate.split('-')[1], 10) - 1]
		),
		datasets: [
			{
				label: 'Profit',
				data: last6Months.map(
					(invoice) => invoice.amount - invoice.cost
				),
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
				position: 'top' as const,
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

	// Sidebar styling to stretch to the bottom
	const sidebarStyle = 'w-64 bg-white shadow-lg flex flex-col';
	const [navbarHeight, setNavbarHeight] = useState(0);
	const navbarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (navbarRef.current) {
			setNavbarHeight(navbarRef.current.offsetHeight);
		}
	}, []);

	// Handle adding a new client
	const handleAddClient = () => {
		if (newClient.name && newClient.email && newClient.phone) {
			setClients([...clients, { id: clients.length + 1, ...newClient }]);
			setNewClient({ name: '', email: '', phone: '' });
		} else {

		}
	};

	// Handle deleting an invoice
	interface Invoice {
		id: number;
		client: string;
		number: string;
		status: string;
		amount: number;
		cost: number;
		dueDate: string;
		details: string;
		avatar: string;
	}

	const handleDeleteInvoice = (id: number): void => {
		setInvoices(invoices.filter((invoice: Invoice) => invoice.id !== id));
	};

	// Handle editing an invoice (placeholder functionality)
	const handleEditInvoice = (id: number): void => {

	};

	const [showStats, setShowStats] = useState(true);
	const [selectedView, setSelectedView] = useState('Monthly'); // Updated for Monthly/Daily/Weekly toggle
	const [filterPopupOpen, setFilterPopupOpen] = useState(false);
	const [filterCustomer, setFilterCustomer] = useState('');
	const [filterDate, setFilterDate] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState('Number');
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

	const filterRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				filterRef.current &&
				!filterRef.current.contains(event.target as Node)
			) {
				setFilterPopupOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		window.history.replaceState(null, '', `?section=${selectedSection}`);
	}, [selectedSection]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const section = params.get('section');
		if (section) setSelectedSection(section);
	}, []);

	const handleCreateInvoice = () => {
	};

	const handleRefresh = () => {
		setLastUpdated(new Date());
	};

	const timeSinceLastUpdate = () => {
		const now = new Date();
		const diffInSeconds = Math.floor(
			(now.getTime() - lastUpdated.getTime()) / 1000
		);
		if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
		const diffInMinutes = Math.floor(diffInSeconds / 60);
		return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
	};

	const filteredInvoices = invoices
		.filter((invoice) =>
			filterCustomer
				? invoice.client
						.toLowerCase()
						.includes(filterCustomer.toLowerCase())
				: true
		)
		.filter((invoice) =>
			filterDate ? invoice.dueDate.includes(filterDate) : true
		)
		.filter((invoice) =>
			searchQuery
				? invoice.client
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
				  invoice.number
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				: true
		)
		.sort((a, b) => {
			if (sortBy === 'Number') return a.number.localeCompare(b.number);
			if (sortBy === 'Status') return a.status.localeCompare(b.status);
			if (sortBy === 'Date') return a.dueDate.localeCompare(b.dueDate);
			if (sortBy === 'Customer') return a.client.localeCompare(b.client);
			if (sortBy === 'Total') return b.amount - a.amount;
			if (sortBy === 'Amount Due') return b.amount - b.cost;
			return 0;
		});

	const displayedInvoices = filteredInvoices.slice(0, itemsPerPage);

	const handleViewChange = (view: string) => {
		setSelectedView(view);
		// Add logic to filter invoices based on view (e.g., Monthly, Weekly, Daily)
	};

	return (
		<>
			<div ref={navbarRef}>
				<Navbar />
			</div>
			<div className="flex h-full bg-gray-50">
				{/* Sidebar */}
				<aside
					className={sidebarStyle}
					style={{ height: `calc(100vh - ${navbarHeight}px)` }}
				>
					<div className="p-3"></div>
					<nav className="px-6">
						<ul className="space-y-4">
							<li>
								<a
									href="#"
									className={`flex items-center gap-4 hover:text-[#3b82f6] ${
										selectedSection === 'dashboard'
											? 'font-bold text-[#3b82f6]'
											: 'text-gray-700'
									}`}
									onClick={() =>
										setSelectedSection('dashboard')
									}
								>
									<BarChart className="w-5 h-5" />
									Dashboard
								</a>
							</li>
							<li>
								<div
									className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-[#3b82f6]"
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
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'invoices'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'invoices'
													)
												}
											>
												Invoices
											</a>
										</li>
										<li>
											<a
												href="#"
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'payments'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'payments'
													)
												}
											>
												Payments
											</a>
										</li>
									</ul>
								)}
							</li>
							<li>
								<div
									className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-[#3b82f6]"
									onClick={() => toggleSection('clients')}
								>
									<div className="flex items-center gap-4">
										<Users className="w-5 h-5" />
										Clients
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform ${
											expandedSections.includes('clients')
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
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'clients'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'clients'
													)
												}
											>
												Client List
											</a>
										</li>
									</ul>
								)}
							</li>
							<li>
								<a
									href="#"
									className="flex items-center gap-4 text-gray-700 hover:text-[#3b82f6]"
								>
									<Settings className="w-5 h-5" />
									Settings
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center gap-4 text-gray-700 hover:text-[#3b82f6]"
									onClick={() => {}}
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
					{selectedSection === 'dashboard' && (
						<div>
							{/* Graph */}
							<div className="bg-white p-6 rounded-lg shadow mb-6">
								<h3 className="text-lg font-bold text-gray-700 mb-4">
									Profit Overview
								</h3>
								<p className="text-sm text-gray-500 mb-4">
									Monthly profit trends based on invoices.
								</p>
								<div className="relative h-96">
									<Line
										data={graphData}
										options={graphOptions}
									/>
								</div>
							</div>
						</div>
					)}

					{selectedSection === 'invoices' && (
						<div className="bg-white shadow rounded-lg p-6">
							{/* Header */}
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-bold text-gray-700">
									Invoices
								</h3>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-600">
											Show Stats
										</label>
										<input
											type="checkbox"
											checked={showStats}
											onChange={() =>
												setShowStats(!showStats)
											}
											className="toggle-checkbox"
										/>
									</div>
									<select
										value={selectedView}
										onChange={(e) =>
											handleViewChange(e.target.value)
										}
										className="border rounded px-2 py-1 text-sm"
									>
										<option value="Monthly">Monthly</option>
										<option value="Weekly">Weekly</option>
										<option value="Daily">Daily</option>
									</select>
									<button
										onClick={handleCreateInvoice}
										className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
									>
										Create an Invoice
									</button>
								</div>
							</div>

							{/* Stats */}
							{showStats && (
								<div className="grid grid-cols-4 gap-4 mb-4 py-4">
									<div>
										<h3 className="text-sm text-gray-600">
											Overdue
										</h3>
										<p className="text-3xl font-bold text-red-600">
											$120.80
										</p>
									</div>
									<div>
										<h3 className="text-sm text-gray-600">
											Due within next 30 days
										</h3>
										<p className="text-3xl font-bold text-gray-800">
											$0.00
										</p>
									</div>
									<div>
										<h3 className="text-sm text-gray-600">
											Average time to get paid
										</h3>
										<p className="text-3xl font-bold text-gray-800">
											24 days
										</p>
									</div>
									<div>
										<h3 className="text-sm text-gray-600">
											Upcoming Payout
										</h3>
										<p className="text-3xl font-bold text-gray-800">
											None
										</p>
									</div>
								</div>
							)}

							{/* Filters and Search */}
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center gap-2">
									<button
										onClick={handleRefresh}
										className="text-blue-600 hover:underline text-sm"
									>
										Last updated {timeSinceLastUpdate()} ↻
									</button>
									<div className="relative" ref={filterRef}>
										<button
											onClick={() =>
												setFilterPopupOpen(
													!filterPopupOpen
												)
											}
											className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
										>
											Filters
										</button>
										{filterPopupOpen && (
											<div className="absolute top-full mt-2 left-0 bg-white shadow rounded-lg p-4 w-96 z-10">
												<h3 className="text-lg font-bold text-gray-700 mb-4">
													Filters
												</h3>
												<div className="mb-4">
													<label className="block text-sm text-gray-600 mb-1">
														Customer
													</label>
													<select
														value={filterCustomer}
														onChange={(e) =>
															setFilterCustomer(
																e.target.value
															)
														}
														className="border rounded px-2 py-1 text-sm w-full"
													>
														<option value="">
															All Customers
														</option>
														{[
															...new Set(
																invoices.map(
																	(invoice) =>
																		invoice.client
																)
															),
														].map((client) => (
															<option
																key={client}
																value={client}
															>
																{client}
															</option>
														))}
													</select>
												</div>
												<div className="mb-4">
													<label className="block text-sm text-gray-600 mb-1">
														Date
													</label>
													<input
														type="date"
														value={filterDate}
														onChange={(e) =>
															setFilterDate(
																e.target.value
															)
														}
														className="border rounded px-2 py-1 text-sm w-full"
													/>
												</div>
											</div>
										)}
									</div>
								</div>
								<input
									type="text"
									placeholder="Search by client or number"
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="border rounded px-4 py-2 text-sm w-64"
								/>
							</div>

							{/* Table */}
							<div className="overflow-x-auto">
								<table className="min-w-full table-auto">
									<thead className="bg-gray-100">
										<tr>
											{[
												'Number',
												'Status',
												'Date',
												'Customer',
												'Total',
												'Amount Due',
											].map((header) => (
												<th
													key={header}
													className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
													onClick={() =>
														setSortBy(header)
													}
												>
													{header}
												</th>
											))}
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{displayedInvoices.map((invoice) => (
											<tr key={invoice.id}>
												<td className="px-4 py-2 text-sm">
													{invoice.number}
												</td>
												<td className="px-4 py-2 text-sm">
													<span
														className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
															invoice.status ===
															'Paid'
																? 'bg-[#3b82f6] text-white'
																: invoice.status ===
																  'Overdue'
																? 'bg-red-100 text-red-800'
																: 'bg-gray-100 text-gray-800'
														}`}
													>
														{invoice.status}
													</span>
												</td>
												<td className="px-4 py-2 text-sm">
													{invoice.dueDate}
												</td>
												<td className="px-4 py-2 text-sm">
													{invoice.client}
												</td>
												<td className="px-4 py-2 text-sm">
													${invoice.amount}
												</td>
												<td className="px-4 py-2 text-sm">
													$
													{invoice.amount -
														invoice.cost}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="flex justify-between items-center mt-4">
								<div className="text-sm text-gray-600">
									Showing{' '}
									{Math.min(
										itemsPerPage,
										filteredInvoices.length
									)}{' '}
									of {filteredInvoices.length} invoices
								</div>
								{itemsPerPage < filteredInvoices.length && (
									<button
										onClick={() =>
											setItemsPerPage(itemsPerPage + 10)
										}
										className="text-blue-600 hover:underline text-sm"
									>
										Show more
									</button>
								)}
							</div>
						</div>
					)}

					{selectedSection === 'payments' && (
						<div className="bg-white shadow rounded-lg p-6">
							<h3 className="text-lg font-bold text-gray-700 mb-4">
								Payments
							</h3>
							<p className="text-gray-600">
								This section will display payment details
								(functionality not implemented yet).
							</p>
						</div>
					)}

					{selectedSection === 'clients' && (
						<div>
							<div className="bg-white shadow rounded-lg p-6 mb-6">
								<h3 className="text-lg font-bold text-gray-700 mb-4">
									Client List
								</h3>
								<ul className="divide-y divide-gray-200">
									{clients.map((client) => (
										<li
											key={client.id}
											className="py-4 flex justify-between items-center"
										>
											<div>
												<p className="text-gray-800 font-bold">
													{client.name}
												</p>
												<p className="text-gray-600 text-sm">
													{client.email}
												</p>
												<p className="text-gray-600 text-sm">
													{client.phone}
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
							<div className="bg-white shadow rounded-lg p-6">
								<h3 className="text-lg font-bold text-gray-700 mb-4">
									Add New Client
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<input
										type="text"
										placeholder="Name"
										value={newClient.name}
										onChange={(e) =>
											setNewClient({
												...newClient,
												name: e.target.value,
											})
										}
										className="p-2 border rounded"
									/>
									<input
										type="email"
										placeholder="Email"
										value={newClient.email}
										onChange={(e) =>
											setNewClient({
												...newClient,
												email: e.target.value,
											})
										}
										className="p-2 border rounded"
									/>
									<input
										type="text"
										placeholder="Phone"
										value={newClient.phone}
										onChange={(e) =>
											setNewClient({
												...newClient,
												phone: e.target.value,
											})
										}
										className="p-2 border rounded"
									/>
								</div>
								<button
									className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
									onClick={handleAddClient}
								>
									Add Client
								</button>
							</div>
						</div>
					)}

					{/* Invoice Details Modal */}
					{selectedInvoice && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-white rounded-lg shadow-lg p-6 w-96">
								<h2 className="text-2xl font-bold mb-4">
									Invoice Details
								</h2>
								<p className="mb-2">
									<strong>Client Name:</strong>{' '}
									{selectedInvoice.client}
								</p>
								<p className="mb-2">
									<strong>Invoice Number:</strong>{' '}
									{selectedInvoice.number}
								</p>
								<p className="mb-2">
									<strong>Status:</strong>{' '}
									<span
										className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
											selectedInvoice.status === 'Paid'
												? 'bg-green-100 text-green-800'
												: selectedInvoice.status ===
												  'Overdue'
												? 'bg-red-100 text-red-800'
												: 'bg-gray-100 text-gray-800'
										}`}
									>
										{selectedInvoice.status}
									</span>
								</p>
								<p className="mb-2">
									<strong>Amount:</strong> $
									{selectedInvoice.amount}
								</p>
								<p className="mb-2">
									<strong>Due Date:</strong>{' '}
									{selectedInvoice.dueDate}
								</p>
								<p className="mb-4">
									<strong>Details:</strong>{' '}
									{selectedInvoice.details}
								</p>
								<button
									className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
									onClick={() => setSelectedInvoice(null)}
								>
									Close
								</button>
							</div>
						</div>
					)}
				</main>
			</div>
		</>
	);
}
