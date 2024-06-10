import React, { useState, useEffect } from 'react';
import { ref, get, set, push } from 'firebase/database';
import { PlusIcon } from "@heroicons/react/24/outline";
import { db } from '../../firebase.config';
import EmptyState from '../components/EmptyState';

export default function AllActions() {
    const [people, setPeople] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newPerson, setNewPerson] = useState({ name: '', title: '', email: '', role: '' });

    useEffect(() => {
        const fetchData = async () => {
            const dataRef = ref(db, 'people');
            const snapshot = await get(dataRef);
            if (snapshot.exists()) {
                setPeople(Object.values(snapshot.val()));
            }
        };

        fetchData();
    }, []);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPerson((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async () => {
        const newPersonRef = push(ref(db, 'people'));
        await set(newPersonRef, newPerson);
        setPeople((prev) => [...prev, newPerson]);
        setNewPerson({ name: '', title: '', email: '', role: '' });
        setIsAdding(false);
    };

    return (
        <>
        <div className="px-4 sm:px-6 py-4 lg:px-8 lg:py-6">
            {people.length === 0 && <EmptyState />}
            {people.length > 0 && (
            <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl leading-6 text-gray-900">Tüm Aksiyonlar</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex space-x-2">
                    <button
                        type="button"
                        className="block bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline"
                    >
                        Verileri İndir
                    </button>
                    <button
                        type="button"
                        className="bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Başlıkları Düzenle
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Role
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {people.map((person, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                            {person.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                            <a href="#" className="text-blue-600 hover:text-blue-900">
                                                Edit<span className="sr-only">, {person.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {isAdding && (
                                    <tr className="even:bg-gray-50">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                            <input
                                                type="text"
                                                name="name"
                                                value={newPerson.name}
                                                onChange={handleInputChange}
                                                className="w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <input
                                                type="text"
                                                name="title"
                                                value={newPerson.title}
                                                onChange={handleInputChange}
                                                className="w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <input
                                                type="email"
                                                name="email"
                                                value={newPerson.email}
                                                onChange={handleInputChange}
                                                className="w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <input
                                                type="text"
                                                name="role"
                                                value={newPerson.role}
                                                onChange={handleInputChange}
                                                className="w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                            <button
                                                onClick={handleSaveClick}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Save
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div
                            className="flex items-center justify-end text-sm text-gray-800 font-semibold py-4 hover:text-gray-600 cursor-pointer"
                            onClick={handleAddClick}
                        >
                            <PlusIcon className="h-4 w-4 mr-1 text-gray-800" />
                            Yeni Aksiyon Ekle
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
        </>
    );
}
