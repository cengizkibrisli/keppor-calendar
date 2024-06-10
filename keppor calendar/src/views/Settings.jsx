import { Fragment, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import ActionSettings from './settings/ActionSettings' 
import classNames from '../components/utils.mjs'

const tabs = [
  { name: 'Genel', href: '/dashboard/settings', current: true },
  { name: 'Aksiyonlar', href: '/dashboard/settings/actions', current: false },
  { name: 'Faturalandırma', href: '#', current: false },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState(tabs[0].href)
  const navigate = useNavigate()
  const location = useLocation()

  // Update active tab based on current location
  useState(() => {
    const currentTab = tabs.find(tab => tab.href === location.pathname)
    if (currentTab) {
      setActiveTab(currentTab.href)
    }
  }, [location.pathname])

  const handleTabClick = (href) => {
    setActiveTab(href)
    navigate(href)
  }

  return (
    <>
      <div className='h-screen overflow-auto'>
        <div className="mx-auto flex flex-col lg:max-w-6xl">
          <main className="flex-1">
            <div className="relative mx-auto max-w-5xl px-4">
              <div className="pb-16 pt-7">
                <div className="px-4 sm:px-6 lg:px-0">
                  <h1 className="text-xl tracking-tight text-gray-900">Ayarlar</h1>
                </div>
                <div className="px-4 sm:px-6 lg:px-0">
                  <div className="py-6">
                    {/* Tabs */}
                    <div className="lg:hidden">
                      <label htmlFor="selected-tab" className="sr-only">
                        Select a tab
                      </label>
                      <select
                        id="selected-tab"
                        name="selected-tab"
                        className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                        value={activeTab}
                        onChange={(e) => handleTabClick(e.target.value)}
                      >
                        {tabs.map((tab) => (
                          <option key={tab.name} value={tab.href}>{tab.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="hidden lg:block">
                      <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              href={tab.href}
                              onClick={(e) => {
                                e.preventDefault()
                                handleTabClick(tab.href)
                              }}
                              className={classNames(
                                tab.href === activeTab
                                  ? 'border-blue-500 text-blue-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                              )}
                            >
                              {tab.name}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <Routes>
                      <Route path="/" element={<>general</>} />
                      <Route path="/actions" element={<ActionSettings />} />
                      {/* <Route path="/billing" element={<Billing />} /> */}
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
