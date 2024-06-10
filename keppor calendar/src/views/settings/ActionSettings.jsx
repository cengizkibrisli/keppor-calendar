import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

const actions = [
    {
        id: 1,
        name: 'Eczane',
        status: 'Active',
        role: 'Owner',
        badge: {
            color: 'bg-green-500',
            name: 'Admin',
        },
    },
    {
        id: 1,
        name: 'Ürün',
        status: 'Active',
        role: 'Owner',
        badge: {
            color: 'bg-green-500',
            name: 'Admin',
        },
    },

]
export default function ActionSettings() {
    return (
        <div className="mt-10 divide-y divide-gray-200">
            <div className="mt-6">
               
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Aksiyon Başlıkları</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>

                        <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                             {actions.map((action, index) => (
                             <li className="flex justify-between gap-x-6 py-6">
                                <div className="font-medium text-gray-900">{action.name}</div>
                                <div className="flex items-center space-x-1">
                                <button className="text-red-700 hover:text-red-500">
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                </div>
                                
                            </li>
                             ))}
                        </ul>

                        <div className="flex border-t border-gray-100 pt-6">
                            <button type="button" className="flex items-center text-sm leading-6 text-blue-600 hover:text-blue-500">
                                <PlusIcon className="h-4 w-4 mr-1" aria-hidden="true" />  
                                 Yeni bir başlık ekle
                            </button>
                        </div>
                    </div>
               
            </div>
        </div>
    )
}