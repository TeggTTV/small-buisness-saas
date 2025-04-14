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
		<nav className="flex justify-between items-center px-6 py-4 border-b bg-white text-gray-900">
			<div className="text-xl font-bold">MySaaS</div>
			<div className="flex items-center gap-6">
				<Link href="/" className="hover:text-blue-600">
					Home
				</Link>
				<a
					href="#features"
					onClick={(e) => handleSmoothScroll(e, 'features')}
					className="hover:text-blue-600"
				>
					Features
				</a>
				<Link href="/about" className="hover:text-blue-600">
					About
				</Link>
				<Link href="/contact" className="hover:text-blue-600">
					Contact
				</Link>

				<div className="relative" ref={menuRef}>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="flex items-center space-x-2"
					>
						{isSignedIn ? (
							<Image
								src={userImage || '/default-avatar.jpg'}
								className="w-8 h-8 rounded-full"
								alt="User"
								width={32}
								height={32}
							/>
						) : (
							<Image
								src={'/default-avatar.jpg'}
								className="w-8 h-8 rounded-full"
								alt="User"
								width={32}
								height={32}
							/>
							// <UserCircle className="w-8 h-8" />
						)}
						<ChevronDown className="w-4 h-4" />
					</button>
					{menuOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white shadow rounded p-2 space-y-1 z-10">
							<Link
								href="/profile"
								className="block hover:bg-gray-100 px-2 py-1"
							>
								Profile
							</Link>
							<Link
								href="/dashboard"
								className="block hover:bg-gray-100 px-2 py-1"
							>
								Dashboard
							</Link>
							<Link
								href="/settings"
								className="block hover:bg-gray-100 px-2 py-1"
							>
								Settings
							</Link>
							<Link
								href="/privacy"
								className="block hover:bg-gray-100 px-2 py-1"
							>
								Privacy Policy
							</Link>
							<Link
								href="/help"
								className="block hover:bg-gray-100 px-2 py-1"
							>
								Help
							</Link>
							<button className="block w-full text-left hover:bg-gray-100 px-2 py-1">
								Sign Out
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
