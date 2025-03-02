'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Button, Spinner } from '@radix-ui/themes'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { EmptyState } from './EmptyState'
import { fetchUsers, User } from '@/services'
import { UserCard } from '@/components/UserCard'

export default function Users() {

  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')
  const [queryValue] = useDebounce(query, 1000)
  const [loading, setLoading] = useState(true)

  async function loadUsers() {
    try {
      const usersData = await fetchUsers()
      if (usersData?.length > 0) {
        localStorage.setItem('users', JSON.stringify(usersData))
        setUsers(usersData)
      }
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao carregar usuários!')
    } finally {
      setLoading(false)
    }
  }

  function handleDelete(id: string) {
    const newUsers = users.filter((user) => user.id !== id)
    localStorage.setItem('users', JSON.stringify(newUsers))
    setUsers(newUsers)
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  function handleFilter() {
    if (queryValue.length > 0) {
      return users.filter((user) => user.name.toLowerCase().includes(queryValue.toLowerCase()))
    }
    return users
  }

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : []

    if (parsedUsers.length > 0) {
      setUsers(parsedUsers)
      setLoading(false)
    } else {
      loadUsers()
    }
  }, [])


  if (loading) {
    return (
      <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center bg-violet-100 pt-4 pb-4">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner size="3" />
          <div className="pt-4 font-bold">Loading</div>
        </div>
      </div>
    )
  }


  if (users?.length === 0) {
    return (
      <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center bg-violet-100 pt-4 pb-4">
        <EmptyState />
      </div>
    )
  }

  const filteredUsers = handleFilter()

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center bg-violet-100 pt-4 pb-4">
      <div className="w-[302px] sm:w-[608px] md:w-[608px] lg:w-[916px] mt-2 mb-2 flex items-center justify-between">
        <div className="text-2xl font-bold text-violet-800">Users</div>
        <Link href={'/register'}>
          <Button className='mb-2'>
            New User
            <PlusCircledIcon />
          </Button>
        </Link>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleOnChange}
        placeholder="Filter by name"
        className="w-[302px] sm:w-[608px] md:w-[608px] lg:w-[914px] p-2 mt-1 mb-2 focus:outline-none font-light italic rounded-lg border border-gray-300"
      />

      {
        filteredUsers.length > 0 ? (
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={() => handleDelete(user?.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )
      }
    </div>
  )
}