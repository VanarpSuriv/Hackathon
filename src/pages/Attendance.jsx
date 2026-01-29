import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, User } from 'lucide-react';

const ATTENDANCE_DATA = [
    { id: 1, name: 'Pranav A', roll: '2025IT1070', time: '08:45 AM', location: 'Library', status: 'In' },
    { id: 2, name: 'Modhini V', roll: '2025IT1089', time: '09:02 AM', location: 'MPH', status: 'In' },
    { id: 3, name: 'Rishe S', roll: '2025IT1030', time: '09:15 AM', location: 'Cafeteria', status: 'In' },
    { id: 4, name: 'Shivvani T', roll: '2025IT0186', time: '10:30 AM', location: 'Block 1', status: 'Out' },
    { id: 5, name: 'Suresh Krishna G', roll: '2025IT0130', time: '10:45 AM', location: 'Library', status: 'In' },
    { id: 6, name: 'Srivatsan S', roll: '2025IT1058', time: '11:00 AM', location: 'Block 3', status: 'In' },
];

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = ATTENDANCE_DATA.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Attendance Dashboard</h1>
                    <p className="text-gray-400">Track student movement and check-ins today</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="btn btn-outline flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="btn btn-primary flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto">
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="glass-panel p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or roll number..."
                            className="input-field pl-10 mb-0 bg-black/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400 text-sm whitespace-nowrap">
                                <th className="py-4 px-6 font-medium" style={{ width: '25%' }}>Student Info</th>
                                <th className="py-4 px-6 font-medium text-center" style={{ width: '15%' }}>Roll Number</th>
                                <th className="py-4 px-6 font-medium text-center" style={{ width: '15%' }}>Time</th>
                                <th className="py-4 px-6 font-medium" style={{ width: '25%' }}>Location</th>
                                <th className="py-4 px-6 font-medium text-center" style={{ width: '10%' }}>Status</th>
                                <th className="py-4 px-6 font-medium text-right" style={{ width: '10%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 whitespace-nowrap text-sm">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-white/5 transition-colors group" style={{ verticalAlign: 'middle' }}>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                                <User size={16} />
                                            </div>
                                            <span className="font-medium truncate">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-400 font-mono text-center">{item.roll}</td>
                                    <td className="py-4 px-6 text-gray-300 text-center">{item.time}</td>
                                    <td className="py-4 px-6">
                                        <span className="px-2 py-1 rounded text-xs bg-white/10">{item.location}</span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex justify-center">
                                            <span className={`px-2 py-1 rounded-full text-xs border ${item.status === 'In'
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal size={18} className="text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No records found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
