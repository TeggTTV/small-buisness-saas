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
	Check,
	RefreshCcw,
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
	Filler,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
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
	const handleEditInvoice = (id: number): void => {};

	const [showStats, setShowStats] = useState(true);
	const [selectedView, setSelectedView] = useState('Monthly'); // Updated for Monthly/Daily/Weekly toggle
	const [filterPopupOpen, setFilterPopupOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState({
		client: '',
		date: '',
	});

	const handleFilterChange = (field: string, value: string) => {
		setSelectedFilters((prev) => ({ ...prev, [field]: value }));
	};
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState('Number');
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

	const filterRef = useRef<HTMLDivElement>(null);

	const toggleFilterPopup = () => {
		setFilterPopupOpen((prev) => !prev);
	};

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

	const handleCreateInvoice = () => {};

	const handleRefresh = () => {
		setLastUpdated(new Date());
	};

	const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

	const toggleCustomerSelection = (customer: string) => {
		setSelectedCustomers((prev) =>
			prev.includes(customer)
				? prev.filter((c) => c !== customer)
				: [...prev, customer]
		);
	};

	const filteredInvoices = invoices
		.filter((invoice) =>
			selectedCustomers.length > 0
				? selectedCustomers.includes(invoice.client)
				: true
		)
		.filter((invoice) =>
			selectedFilters.date
				? invoice.dueDate.includes(selectedFilters.date)
				: true
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
					className="w-64 bg-white shadow-lg flex flex-col"
					style={{ height: `calc(100vh - ${navbarHeight}px)` }}
				>
					<div className="p-3"></div>
					<nav className="px-6">
						<ul className="space-y-4">
							{/* Dashboard */}
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

							{/* Sales & Payments */}
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

							{/* Business Management */}
							<li>
								<div
									className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-[#3b82f6]"
									onClick={() =>
										toggleSection('business-management')
									}
								>
									<div className="flex items-center gap-4">
										<Users className="w-5 h-5" />
										Business Management
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform ${
											expandedSections.includes(
												'business-management'
											)
												? 'rotate-180'
												: ''
										}`}
									/>
								</div>
								{expandedSections.includes(
									'business-management'
								) && (
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
												Clients
											</a>
										</li>
										<li>
											<a
												href="#"
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'expense-tracking'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'expense-tracking'
													)
												}
											>
												Expense Tracking
											</a>
										</li>
										<li>
											<a
												href="#"
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'task-manager'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'task-manager'
													)
												}
											>
												Task Manager
											</a>
										</li>
									</ul>
								)}
							</li>

							{/* Advanced Features */}
							<li>
								<div
									className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-[#3b82f6]"
									onClick={() =>
										toggleSection('advanced-features')
									}
								>
									<div className="flex items-center gap-4">
										<Settings className="w-5 h-5" />
										Advanced Features
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform ${
											expandedSections.includes(
												'advanced-features'
											)
												? 'rotate-180'
												: ''
										}`}
									/>
								</div>
								{expandedSections.includes(
									'advanced-features'
								) && (
									<ul className="pl-8 mt-2 space-y-2">
										<li>
											<a
												href="#"
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'role-management'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'role-management'
													)
												}
											>
												Role Management
											</a>
										</li>
										<li>
											<a
												href="#"
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'recurring-billing'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'recurring-billing'
													)
												}
											>
												Recurring Billing
											</a>
										</li>
										<li>
											<a
												href="#"
												className={`hover:text-[#3b82f6] ${
													selectedSection ===
													'document-uploads'
														? 'font-bold text-[#3b82f6]'
														: 'text-gray-600'
												}`}
												onClick={() =>
													setSelectedSection(
														'document-uploads'
													)
												}
											>
												Document Uploads
											</a>
										</li>
									</ul>
								)}
							</li>

							{/* Notifications */}
							<li>
								<a
									href="#"
									className={`flex items-center gap-4 hover:text-[#3b82f6] ${
										selectedSection === 'notifications'
											? 'font-bold text-[#3b82f6]'
											: 'text-gray-700'
									}`}
									onClick={() =>
										setSelectedSection('notifications')
									}
								>
									<HelpCircle className="w-5 h-5" />
									Notifications
								</a>
							</li>

							{/* Logout */}
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
							<div className="flex justify-between items-center mb-6">
								<h3 className="text-xl font-semibold text-gray-800">
									Invoices
								</h3>
								<button
									onClick={handleCreateInvoice}
									className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
								>
									+ New Invoice
								</button>
							</div>

							{/* Filters and Search */}
							<div className="flex flex-wrap justify-between items-center mb-6 gap-4">
								<div className="relative">
									<button
										onClick={toggleFilterPopup}
										className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
									>
										Filter
									</button>
									{filterPopupOpen && (
										<div
											className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10"
											ref={filterRef}
										>
											<div className="mb-4">
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Select Customers
												</label>
												<div className="max-h-40 overflow-y-auto border-b border-gray-300 rounded-lg">
													{clients.map((client) => (
														<div
															key={client.id}
															className={`flex items-center justify-between px-3 py-2 mb-1 rounded-lg cursor-pointer ${
																selectedCustomers.includes(
																	client.name
																)
																	? 'bg-blue-500 text-white'
																	: 'bg-white text-gray-700'
															}`}
															onClick={() =>
																toggleCustomerSelection(
																	client.name
																)
															}
														>
															<span className="text-sm">
																{client.name}
															</span>
															{/* { && ( */}
															<span
																className={`text-white font-bold ${!selectedCustomers.includes(
																	client.name &&
																		'hidden'
																)}`}
															>
																<Check />
															</span>
															{/* )} */}
														</div>
													))}
												</div>
											</div>
											<div className="mb-4">
												<label className="block text-sm font-medium text-gray-700 mb-1">
													Date
												</label>
												<input
													type="date"
													value={selectedFilters.date}
													onChange={(e) =>
														handleFilterChange(
															'date',
															e.target.value
														)
													}
													className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
												/>
											</div>
											<div className="flex justify-end">
												<button
													onClick={() =>
														setFilterPopupOpen(
															false
														)
													}
													className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
												>
													Apply
												</button>
											</div>
										</div>
									)}
								</div>
								<button
									onClick={handleRefresh}
									className="text-blue-600 hover:underline text-sm flex gap-1 justify-between"
								>
									Refresh <RefreshCcw className="w-5 h-5" />
								</button>
							</div>

							{/* Table */}
							<div className="overflow-x-auto">
								<table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg shadow-sm">
									<thead className="bg-gray-100">
										<tr>
											{[
												'Invoice ID',
												'Client',
												'Email',
												'Date',
												'Amount',
												'Status',
											].map((header) => (
												<th
													key={header}
													className="px-4 py-3 text-left text-sm font-medium text-gray-600 border border-gray-200"
												>
													{header}
												</th>
											))}
											<th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border border-gray-200">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{displayedInvoices.map((invoice) => (
											<tr
												key={invoice.id}
												className="hover:bg-gray-50"
											>
												<td className="px-4 py-3 text-sm border border-gray-200">
													{invoice.number}
												</td>
												<td className="px-4 py-3 text-sm border border-gray-200">
													{invoice.client}
												</td>
												<td className="px-4 py-3 text-sm border border-gray-200">
													{invoice.email}
												</td>
												<td className="px-4 py-3 text-sm border border-gray-200">
													{invoice.dueDate}
												</td>
												<td className="px-4 py-3 text-sm border border-gray-200">
													${invoice.amount}
												</td>
												<td className="px-4 py-3 text-sm border border-gray-200">
													<span
														className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
															invoice.status ===
															'Paid'
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
												<td className="px-4 py-3 text-sm border border-gray-200">
													<button
														onClick={() =>
															handleEditInvoice(
																invoice.id
															)
														}
														className="text-blue-600 hover:underline text-sm mr-2"
													>
														Edit
													</button>
													<button
														onClick={() =>
															handleDeleteInvoice(
																invoice.id
															)
														}
														className="text-red-600 hover:underline text-sm"
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Pagination */}
							<div className="flex justify-between items-center mt-6">
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

					{selectedSection === 'role-management' && (
						<section aria-labelledby="role-management-section">
							<h2
								id="role-management-section"
								className="text-lg font-bold text-gray-700 mb-4"
							>
								Role Management
							</h2>
							<p>
								Feature under development: Add team members,
								assign permissions, and view history/logs.
							</p>
						</section>
					)}

					{selectedSection === 'recurring-billing' && (
						<section aria-labelledby="recurring-billing-section">
							<h2
								id="recurring-billing-section"
								className="text-lg font-bold text-gray-700 mb-4"
							>
								Recurring Billing
							</h2>
							<p>
								Feature under development: Auto-generate
								invoices, manage subscriptions, and pause/cancel
								cycles.
							</p>
						</section>
					)}

					{selectedSection === 'document-uploads' && (
						<section aria-labelledby="document-uploads-section">
							<h2
								id="document-uploads-section"
								className="text-lg font-bold text-gray-700 mb-4"
							>
								Document Uploads
							</h2>
							<p>
								Feature under development: Store receipts,
								invoices, and contracts with thumbnail previews.
							</p>
						</section>
					)}

					{selectedSection === 'expense-tracking' && (
						<section aria-labelledby="expense-tracking-section">
							<h2
								id="expense-tracking-section"
								className="text-lg font-bold text-gray-700 mb-4"
							>
								Expense Tracking
							</h2>
							<p>
								Feature under development: Track recurring and
								one-time expenses, assign categories, and export
								monthly reports.
							</p>
						</section>
					)}

					{selectedSection === 'task-manager' && (
						<section aria-labelledby="task-manager-section">
							<h2
								id="task-manager-section"
								className="text-lg font-bold text-gray-700 mb-4"
							>
								Task Manager
							</h2>
							<p>
								Feature under development: Create tasks with due
								dates, manage recurring tasks, and archive
								completed tasks.
							</p>
						</section>
					)}

					{selectedSection === 'notifications' && (
						<section aria-labelledby="notifications-section">
							<h2
								id="notifications-section"
								className="text-lg font-bold text-gray-700 mb-4"
							>
								Notifications & Reminders
							</h2>
							<p>
								Feature under development: Receive reminders for
								invoice due dates, overdue tasks, and client
								birthdays.
							</p>
						</section>
					)}
				</main>
			</div>
		</>
	);
}
