import Link from "next/link";

export default function Footer() {
	return (
		<footer className="py-8 bg-gray-800 text-white">
			<div className="container mx-auto px-6 text-center">
				<p className="mb-4">© 2025 MySaaS. All rights reserved.</p>
				<div className="flex justify-center gap-4">
					<Link href="/about" className="hover:underline">
						About
					</Link>
					<Link href="/contact" className="hover:underline">
						Contact
					</Link>
					<Link href="/privacy" className="hover:underline">
						Privacy Policy
					</Link>
				</div>
			</div>
		</footer>
	);
}
