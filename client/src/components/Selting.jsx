import React, { useState } from 'react';
import {
    User,
    Bell,
    Lock,
    Globe,
    Database,
    Monitor,
    Moon,
    Sun,
    Check,
    Save,
    Shield,
    Mail,
    FileText,
    Clock,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

export const SettingsPage = () => {
    // States for various settings
    const [activeTab, setActiveTab] = useState('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState({
        orderCreated: true,
        orderUpdated: true,
        newCustomer: false,
        systemAlerts: true
    });
    const [timezone, setTimezone] = useState('UTC-5 (Eastern Time)');
    const [language, setLanguage] = useState('English');
    const [autoBackup, setAutoBackup] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [activeAuthMethod, setActiveAuthMethod] = useState('app');
    // Profile form state
    const [profileForm, setProfileForm] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        jobTitle: 'Administrator',
        company: 'Tech Solutions Inc.'
    });

    // Handle profile form changes
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Toggle switch component
    const ToggleSwitch = ({ enabled, onChange, label }) => {
        return (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">{label}</span>
                <button
                    className={`w-12 h-6 rounded-full flex items-center ${enabled ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'} p-1 transition-colors duration-300`}
                    onClick={() => onChange(!enabled)}
                >
                    <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                </button>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Sidebar Navigation */}
                <div className="md:w-64 bg-gray-50 border-r border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
                    </div>

                    <div className="p-2">
                        <button
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </button>

                        <button
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell className="w-5 h-5" />
                            <span>Notifications</span>
                        </button>

                        <button
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 ${activeTab === 'appearance' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            <Monitor className="w-5 h-5" />
                            <span>Appearance</span>
                        </button>

                        <button
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 ${activeTab === 'localization' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('localization')}
                        >
                            <Globe className="w-5 h-5" />
                            <span>Localization</span>
                        </button>

                        <button
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock className="w-5 h-5" />
                            <span>Security</span>
                        </button>

                        <button
                            className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 ${activeTab === 'system' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                            onClick={() => setActiveTab('system')}
                        >
                            <Database className="w-5 h-5" />
                            <span>System</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Profile Picture */}
                                <div className="md:w-1/3">
                                    <div className="flex flex-col items-center">
                                        <div className="relative mb-4">
                                            <img
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt="John Doe"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                                            />
                                            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                                <User className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <h4 className="text-lg font-medium">John Doe</h4>
                                        <p className="text-gray-500 text-sm">Administrator</p>

                                        <div className="mt-6 w-full bg-blue-50 p-4 rounded-lg">
                                            <h5 className="font-medium mb-2 text-gray-700">Account Status</h5>
                                            <div className="flex items-center text-green-600 mb-3">
                                                <Check className="w-4 h-4 mr-2" />
                                                <span className="text-sm">Email Verified</span>
                                            </div>
                                            <p className="text-sm text-gray-600">Member since March 2022</p>
                                        </div>
                                    </div>
                                </div>
                                

                                {/* Profile Form */}
                                <div className="md:w-2/3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profileForm.firstName}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profileForm.lastName}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profileForm.email}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profileForm.phone}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                name="jobTitle"
                                                value={profileForm.jobTitle}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={profileForm.company}
                                                onChange={handleProfileChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                            <textarea
                                                rows="4"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Tell us about yourself..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <div className="animate-fade-in">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>
                                <p className="text-sm text-gray-500 mt-1">Configure how you receive notifications</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Email Notifications */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex items-center mb-4">
                                        <Mail className="w-5 h-5 text-blue-600 mr-2" />
                                        <h4 className="text-md font-medium">Email Notifications</h4>
                                    </div>

                                    <ToggleSwitch
                                        enabled={emailNotifications.orderCreated}
                                        onChange={(val) => setEmailNotifications({ ...emailNotifications, orderCreated: val })}
                                        label="New Order Created"
                                    />

                                    <ToggleSwitch
                                        enabled={emailNotifications.orderUpdated}
                                        onChange={(val) => setEmailNotifications({ ...emailNotifications, orderUpdated: val })}
                                        label="Order Status Updates"
                                    />

                                    <ToggleSwitch
                                        enabled={emailNotifications.newCustomer}
                                        onChange={(val) => setEmailNotifications({ ...emailNotifications, newCustomer: val })}
                                        label="New Customer Registration"
                                    />

                                    <ToggleSwitch
                                        enabled={emailNotifications.systemAlerts}
                                        onChange={(val) => setEmailNotifications({ ...emailNotifications, systemAlerts: val })}
                                        label="System Alerts"
                                    />
                                </div>

                                {/* In-App Notifications */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex items-center mb-4">
                                        <Bell className="w-5 h-5 text-blue-600 mr-2" />
                                        <h4 className="text-md font-medium">In-App Notifications</h4>
                                    </div>

                                    <ToggleSwitch
                                        enabled={true}
                                        onChange={() => { }}
                                        label="Real-time Notifications"
                                    />

                                    <div className="py-3 border-b border-gray-100">
                                        <label className="block text-sm text-gray-700 mb-1">Notification Sound</label>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option>Default</option>
                                            <option>None</option>
                                            <option>Soft Bell</option>
                                            <option>Chime</option>
                                        </select>
                                    </div>

                                    <div className="py-3 border-b border-gray-100">
                                        <label className="block text-sm text-gray-700 mb-1">Clear Notifications</label>
                                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                                            Clear All
                                        </button>
                                    </div>
                                </div>

                                {/* Summary Settings */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200 md:col-span-2">
                                    <div className="flex items-center mb-4">
                                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                                        <h4 className="text-md font-medium">Summary Reports</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-1">Daily Summary</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>Disabled</option>
                                                <option>Morning (9:00 AM)</option>
                                                <option>Evening (5:00 PM)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 mb-1">Weekly Summary</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>Monday Morning</option>
                                                <option>Friday Evening</option>
                                                <option>Sunday Evening</option>
                                                <option>Disabled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                        <div className="animate-fade-in">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Appearance Settings</h3>
                                <p className="text-sm text-gray-500 mt-1">Customize how the application looks</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Theme Selection */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium mb-4">Theme Mode</h4>

                                    <div className="flex space-x-4 mb-6">
                                        <button
                                            className={`flex-1 p-4 rounded-lg border ${!darkMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} text-center`}
                                            onClick={() => setDarkMode(false)}
                                        >
                                            <Sun className="mx-auto mb-2 text-yellow-500" />
                                            <span className="block text-sm font-medium">Light Mode</span>
                                        </button>

                                        <button
                                            className={`flex-1 p-4 rounded-lg border ${darkMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} text-center`}
                                            onClick={() => setDarkMode(true)}
                                        >
                                            <Moon className="mx-auto mb-2 text-blue-700" />
                                            <span className="block text-sm font-medium">Dark Mode</span>
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sidebar Color</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            <button className="w-full aspect-square rounded-full bg-blue-600 border-2 border-white shadow-sm"></button>
                                            <button className="w-full aspect-square rounded-full bg-purple-600 border-2 border-white shadow-sm"></button>
                                            <button className="w-full aspect-square rounded-full bg-green-600 border-2 border-white shadow-sm"></button>
                                            <button className="w-full aspect-square rounded-full bg-red-600 border-2 border-white shadow-sm"></button>
                                            <button className="w-full aspect-square rounded-full bg-gray-700 border-2 border-white shadow-sm"></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Display Settings */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium mb-4">Display Settings</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>Small</option>
                                                <option selected>Medium</option>
                                                <option>Large</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Table Density</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>Compact</option>
                                                <option selected>Regular</option>
                                                <option>Comfortable</option>
                                            </select>
                                        </div>

                                        <ToggleSwitch
                                            enabled={true}
                                            onChange={() => { }}
                                            label="Show Welcome Screen"
                                        />

                                        <ToggleSwitch
                                            enabled={false}
                                            onChange={() => { }}
                                            label="Reduce Animations"
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="md:col-span-2 border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center">
                                        <h4 className="text-sm font-medium text-gray-700">Preview</h4>
                                        <span className="text-xs text-gray-500">Settings are applied in real-time</span>
                                    </div>
                                    <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                                        <div className="flex mb-4">
                                            <div className="w-40 h-8 rounded-md bg-blue-600 mr-4"></div>
                                            <div className="flex-1 h-8 rounded-md bg-gray-200"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="h-20 rounded-md bg-gray-200"></div>
                                            <div className="h-20 rounded-md bg-gray-200"></div>
                                        </div>
                                        <div className="h-32 rounded-md bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Localization Settings */}
                    {activeTab === 'localization' && (
                        <div className="animate-fade-in">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Localization Settings</h3>
                                <p className="text-sm text-gray-500 mt-1">Configure language and regional preferences</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Language & Region */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium mb-4">Language & Region</h4>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                            >
                                                <option>English</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                                <option>Japanese</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>United Kingdom</option>
                                                <option>European Union</option>
                                                <option>Japan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Time & Date */}
                                <div className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="flex items-center mb-4">
                                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                                        <h4 className="text-md font-medium">Time & Date</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                                value={timezone}
                                                onChange={(e) => setTimezone(e.target.value)}
                                            >
                                                <option>UTC (GMT+0)</option>
                                                <option>UTC-8 (Pacific Time)</option>
                                                <option>UTC-5 (Eastern Time)</option>
                                                <option>UTC+1 (Central European Time)</option>
                                                <option>UTC+9 (Japan Standard Time)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>MM/DD/YYYY</option>
                                                <option>DD/MM/YYYY</option>
                                                <option>YYYY-MM-DD</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                                            <select className="w-full p-2 border border-gray-300 rounded-md">
                                                <option>12-hour (AM/PM)</option>
                                                <option>24-hour</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Display Example */}
                                <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                                    <h4 className="text-md font-medium mb-4">Preview</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">Date Format</h5>
                                            <p className="text-lg">03/18/2025</p>
                                        </div>

                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">Time Format</h5>
                                            <p className="text-lg">2:30 PM</p>
                                        </div>

                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">Number Format</h5>
                                            <p className="text-lg">1,234.56</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
  <div className="animate-fade-in">
    <div className="border-b border-gray-200 pb-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
      <p className="text-sm text-gray-500 mt-1">Manage your account security and authentication</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Password */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <Lock className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-md font-medium">Password</h4>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="button" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Change Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-md font-medium">Two-Factor Authentication (2FA)</h4>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-700">Enable Two-Factor Authentication</span>
          <button
            className={`w-12 h-6 rounded-full flex items-center ${twoFactorAuth ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'} p-1 transition-colors duration-300`}
            onClick={() => setTwoFactorAuth(!twoFactorAuth)}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </div>

        {twoFactorAuth && (
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Method</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  className={`p-4 rounded-lg border text-center ${activeAuthMethod === 'app' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setActiveAuthMethod('app')}
                >
                  <Clock className="mx-auto mb-2 text-blue-600" />
                  <span className="block text-sm font-medium">Authenticator App</span>
                </button>

                <button
                  className={`p-4 rounded-lg border text-center ${activeAuthMethod === 'sms' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setActiveAuthMethod('sms')}
                >
                  <Mail className="mx-auto mb-2 text-green-600" />
                  <span className="block text-sm font-medium">SMS</span>
                </button>

                <button
                  className={`p-4 rounded-lg border text-center ${activeAuthMethod === 'backup' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setActiveAuthMethod('backup')}
                >
                  <FileText className="mx-auto mb-2 text-red-600" />
                  <span className="block text-sm font-medium">Backup Codes</span>
                </button>
              </div>
            </div>
            

            {activeAuthMethod === 'app' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-blue-800">Setup Authenticator App</h5>
                <p className="text-sm text-blue-700 mb-4">
                  Scan the QR code with your authenticator app (Google Authenticator, Authy)
                </p>
                <div className="bg-white p-4 rounded-lg text-center">
                  {/* Placeholder for QR Code */}
                  <div className="w-32 h-32 bg-gray-200 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">Unable to scan? Enter code manually</p>
                </div>
              </div>
            )}

            {activeAuthMethod === 'sms' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-blue-800">SMS Authentication</h5>
                <div className="space-y-3">
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Send Verification Code
                  </button>
                </div>
              </div>
            )}

            {activeAuthMethod === 'backup' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-blue-800">Backup Codes</h5>
                <p className="text-sm text-blue-700 mb-4">
                  Generate and safely store these one-time use codes
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345'].map((code, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 text-center font-mono rounded-md text-sm"
                    >
                      {code}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-red-600 mb-2">
                  ⚠️ Save these codes securely. They can only be used once.
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Generate New Codes
                </button>
              </div>
            )}
          </div>
        )}
        </div>
        
      </div>
    </div>


)}
</div>
</div>
</div>
)}