export default function Footer() {
	return (
		<footer className="py-8 bg-gray-800 text-white">
			<div className="container mx-auto px-6 text-center">
				<p className="mb-4">© 2025 MySaaS. All rights reserved.</p>
				<div className="flex justify-center gap-4">
					<a href="/about" className="hover:underline">
						About
					</a>
					<a href="/contact" className="hover:underline">
						Contact
					</a>
					<a href="/privacy" className="hover:underline">
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	);
}
