import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const INITIAL_STUDENTS = [
    { id: 1, name: 'Pranav A', roll: '2025IT1070', department: 'IT', year: '1' },
    { id: 2, name: 'Modhini V', roll: '2025IT1089', department: 'IT', year: '1' },
    { id: 3, name: 'Rishe S', roll: '2025IT1030', department: 'IT', year: '1' },
    { id: 4, name: 'Shivvani T', roll: '2025IT0186', department: 'IT', year: '1' },
    { id: 5, name: 'Suresh Krishna G', roll: '2025IT0130', department: 'IT', year: '1' },
    { id: 6, name: 'Srivatsan S', roll: '2025IT1058', department: 'IT', year: '1' },
];

const StudentManagement = () => {
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this student data?')) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newStudent = {
            id: currentStudent ? currentStudent.id : Date.now(),
            name: formData.get('name'),
            roll: formData.get('roll'),
            department: formData.get('department'),
            year: formData.get('year'),
        };

        if (currentStudent) {
            setStudents(students.map(s => s.id === currentStudent.id ? newStudent : s));
        } else {
            setStudents([...students, newStudent]);
        }
        closeModal();
    };

    const openModal = (student = null) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentStudent(null);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Student Management</h1>
                    <p className="text-gray-400">Add, edit, or remove student recognition data</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Student
                </button>
            </div>

            <div className="glass-panel p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="input-field pl-10 mb-0 bg-black/20"
                        />
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-gray-400 text-sm">
                            <th className="py-4 px-4 font-medium">Name</th>
                            <th className="py-4 px-4 font-medium">Roll Number</th>
                            <th className="py-4 px-4 font-medium">Department</th>
                            <th className="py-4 px-4 font-medium">Year</th>
                            <th className="py-4 px-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4 font-medium">{student.name}</td>
                                <td className="py-4 px-4 text-gray-400 font-mono text-sm">{student.roll}</td>
                                <td className="py-4 px-4">{student.department}</td>
                                <td className="py-4 px-4">{student.year}</td>
                                <td className="py-4 px-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openModal(student)}
                                            className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded transition"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="p-2 hover:bg-red-500/20 text-red-400 rounded transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="glass-panel w-full max-w-lg p-8 relative animate-fade-in-up">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">
                            {currentStudent ? 'Edit Student' : 'Add New Student'}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input
                                    name="name"
                                    defaultValue={currentStudent?.name}
                                    type="text"
                                    className="input-field mb-0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Roll Number</label>
                                <input
                                    name="roll"
                                    defaultValue={currentStudent?.roll}
                                    type="text"
                                    className="input-field mb-0"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                                    <select name="department" defaultValue={currentStudent?.department} className="input-field mb-0">
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="MECH">MECH</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                                    <select name="year" defaultValue={currentStudent?.year} className="input-field mb-0">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="btn btn-outline">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManagement;
