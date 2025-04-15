'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const isSignedIn = false;
	const userImage = ''; // Replace with real image if signed in

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
		e.preventDefault();
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<nav className="flex justify-between items-center px-8 py-4 border-b bg-gray-50 shadow-md text-gray-900">
			<div className="text-2xl font-extrabold text-blue-600">MySaaS</div>
			<div className="flex items-center gap-8">
				<Link href="/" className="hover:text-blue-600 font-medium">
					Home
				</Link>
				<Link href="/about" className="hover:text-blue-600 font-medium">
					About
				</Link>
				<Link href="/contact" className="hover:text-blue-600 font-medium">
					Contact
				</Link>
				<div className="relative" ref={menuRef}>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="flex items-center space-x-2 focus:outline-none"
					>
						{isSignedIn ? (
							<Image
								src={userImage || '/default-avatar.jpg'}
								className="w-8 h-8 rounded-full border border-gray-300"
								alt="User"
								width={32}
								height={32}
							/>
						) : (
							<Image
								src={'/default-avatar.jpg'}
								className="w-8 h-8 rounded-full border border-gray-300"
								alt="User"
								width={32}
								height={32}
							/>
						)}
						<ChevronDown className="w-4 h-4 text-gray-600" />
					</button>
					{menuOpen && (
						<div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 space-y-2 z-10">
							<Link
								href="/profile"
								className="block hover:bg-gray-100 px-3 py-2 rounded-md font-medium"
							>
								Profile
							</Link>
							<Link
								href="/dashboard"
								className="block hover:bg-gray-100 px-3 py-2 rounded-md font-medium"
							>
								Dashboard
							</Link>
							<Link
								href="/settings"
								className="block hover:bg-gray-100 px-3 py-2 rounded-md font-medium"
							>
								Settings
							</Link>
							<Link
								href="/privacy"
								className="block hover:bg-gray-100 px-3 py-2 rounded-md font-medium"
							>
								Privacy Policy
							</Link>
							<Link
								href="/help"
								className="block hover:bg-gray-100 px-3 py-2 rounded-md font-medium"
							>
								Help
							</Link>
							<button className="block w-full text-left hover:bg-gray-100 px-3 py-2 rounded-md font-medium text-red-600">
								Sign Out
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
