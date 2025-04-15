import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export default function Help() {
    const faqs = [
        {
            question: 'How do I create an invoice?',
            answer: 'Go to the Invoices section in the dashboard and click on the Create Invoice button.',
        },
        {
            question: 'Can I track my expenses?',
            answer: 'Yes, you can track your expenses in the Expenses section of the dashboard.',
        },
        {
            question: 'How do I reset my password?',
            answer: 'Click on Forgot Password on the login page and follow the instructions.',
        },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">Help & FAQ</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-lg font-bold text-gray-700 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}