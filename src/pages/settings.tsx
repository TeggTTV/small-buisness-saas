import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import { useState } from 'react';

export default function Settings() {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
    });

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSettings((prevSettings) => ({ ...prevSettings, [name]: checked }));
    };

    const handleSave = () => {
        console.log('Settings updated:', settings);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
                    <form>
                        <div className="mb-4 flex items-center justify-between">
                            <label htmlFor="notifications" className="text-sm font-medium text-gray-700">Enable Notifications</label>
                            <input
                                type="checkbox"
                                id="notifications"
                                name="notifications"
                                checked={settings.notifications}
                                onChange={handleToggle}
                                className="toggle-checkbox"
                            />
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <label htmlFor="darkMode" className="text-sm font-medium text-gray-700">Dark Mode</label>
                            <input
                                type="checkbox"
                                id="darkMode"
                                name="darkMode"
                                checked={settings.darkMode}
                                onChange={handleToggle}
                                className="toggle-checkbox"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}