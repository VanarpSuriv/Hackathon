import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locations = [
    { name: 'Library', count: 45, capacity: 100 },
    { name: 'MPH', count: 12, capacity: 200 },
    { name: 'Cafeteria', count: 89, capacity: 150 },
    { name: 'Block 1', count: 34, capacity: 60 },
    { name: 'Block 2', count: 28, capacity: 60 },
    { name: 'Block 3', count: 56, capacity: 60 },
    { name: 'Block 4', count: 41, capacity: 60 },
    { name: 'Block 5', count: 19, capacity: 60 },
];

const data = locations.map(loc => ({
    name: loc.name,
    users: loc.count,
}));

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-6 md:p-8">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-1">System Overview</h1>
                <p className="text-gray-400">Real-time student movement tracking</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-8 mb-10">
                {locations.map((loc) => (
                    <div
                        key={loc.name}
                        className="glass-panel p-8 md:p-10 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group"
                        style={{ minHeight: '220px' }}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <p className="text-gray-400 text-2xl font-medium mb-3">{loc.name}</p>
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-6xl font-bold">{loc.count}</h3>
                                    <span className="text-2xl text-gray-500">/ {loc.capacity}</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                                <MapPin className="text-emerald-400" size={56} />
                            </div>
                        </div>

                        <div className="w-full bg-white/20 rounded-full h-5 overflow-hidden">
                            <div
                                className="bg-emerald-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(52,211,153,0.7)]"
                                style={{
                                    width: `${Math.min(100, (loc.count / loc.capacity) * 100)}%`
                                }}
                            />
                        </div>
                        <p className="text-lg text-emerald-400 mt-4 flex items-center gap-3">
                            <span className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse"></span>
                            Live Occupancy
                        </p>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="glass-panel p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Users className="text-emerald-400" />
                    Student Distribution Logs
                </h2>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="#a0a0b0" dy={10} />
                            <YAxis stroke="#fff" />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#0f1020', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                itemStyle={{ color: '#00e6b8' }}
                            />
                            <Bar dataKey="users" radius={[4, 4, 0, 0]} barSize={50}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={'var(--accent-primary)'} fillOpacity={0.8 + (index * 0.02)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
