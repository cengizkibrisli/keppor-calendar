import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
  } from '@headlessui/react'
  import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
  import { ExclamationTriangleIcon, FolderIcon, LifebuoyIcon } from '@heroicons/react/24/outline'
  import { useEffect, useState } from 'react'
  
  const projects = [
    { id: 1, name: 'Workflow Inc. / Website Redesign', category: 'Projects', url: '#' },
    // More projects...
  ]
  
  const users = [
    {
      id: 1,
      name: 'Leslie Alexander',
      url: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More users...
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Search(props) {
    const [rawQuery, setRawQuery] = useState('')
    const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
  
    const filteredProjects =
      rawQuery === '#'
        ? projects
        : query === '' || rawQuery.startsWith('>')
        ? []
        : projects.filter((project) => project.name.toLowerCase().includes(query))
  
    const filteredUsers =
      rawQuery === '>'
        ? users
        : query === '' || rawQuery.startsWith('#')
        ? []
        : users.filter((user) => user.name.toLowerCase().includes(query))
  
    useEffect(() => {
      function handleKeydown(event) {
        if (event.ctrlKey && event.key === 'k') {
          event.preventDefault()
          props.setOpen(true)
        }
      }
  
      window.addEventListener('keydown', handleKeydown)
      return () => {
        window.removeEventListener('keydown', handleKeydown)
      }
    }, [props])
  
    return (
      <Transition show={props.open} afterLeave={() => setRawQuery('')} appear>
        <Dialog className="relative z-10" onClose={props.setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </TransitionChild>
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                <Combobox onChange={(item) => (window.location = item.url)}>
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <ComboboxInput
                      autoFocus
                      className="h-12 outline-none w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setRawQuery(event.target.value)}
                      onBlur={() => setRawQuery('')}
                    />
                  </div>
  
                  {(filteredProjects.length > 0 || filteredUsers.length > 0) && (
                    <ComboboxOptions
                      static
                      as="ul"
                      className="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                    >
                      {filteredProjects.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">Projects</h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredProjects.map((project) => (
                              <ComboboxOption
                                as="li"
                                key={project.id}
                                value={project}
                                className={({ focus }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2',
                                    focus && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                {({ focus }) => (
                                  <>
                                    <FolderIcon
                                      className={classNames('h-6 w-6 flex-none', focus ? 'text-white' : 'text-gray-400')}
                                      aria-hidden="true"
                                    />
                                    <span className="ml-3 flex-auto truncate">{project.name}</span>
                                  </>
                                )}
                              </ComboboxOption>
                            ))}
                          </ul>
                        </li>
                      )}
                      {filteredUsers.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">Users</h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredUsers.map((user) => (
                              <ComboboxOption
                                as="li"
                                key={user.id}
                                value={user}
                                className={({ focus }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center px-4 py-2',
                                    focus && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                <img src={user.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />
                                <span className="ml-3 flex-auto truncate">{user.name}</span>
                              </ComboboxOption>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ComboboxOptions>
                  )}
  
                  {rawQuery === '?' && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <LifebuoyIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                      <p className="mt-4 font-semibold text-gray-900">Help with searching</p>
                      <p className="mt-2 text-gray-500">
                        Use this tool to quickly search for users and projects across our entire platform. You can also
                        use the search modifiers found in the footer below to limit the results to just users or projects.
                      </p>
                    </div>
                  )}
  
                  {query !== '' && rawQuery !== '?' && filteredProjects.length === 0 && filteredUsers.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                      <p className="mt-4 font-semibold text-gray-900">No results found</p>
                      <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
                    </div>
                  )}
  
                  <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
                    Type{' '}
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('#') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                      )}
                    >
                      #
                    </kbd>{' '}
                    <span className="sm:hidden">for projects,</span>
                    <span className="hidden sm:inline">to access projects,</span>
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('>') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                      )}
                    >
                      &gt;
                    </kbd>{' '}
                    for users, and{' '}
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery === '?' ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                      )}
                    >
                      ?
                    </kbd>{' '}
                    for help.
                  </div>
                </Combobox>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    )
  }
  