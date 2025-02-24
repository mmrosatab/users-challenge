'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { fetchUsers, User } from '@/services'
import { UserCard } from '@/components/UserCard'


export default function Users() {

  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState('')
  const [queryValue] = useDebounce(query, 1000)

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
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {
      loadUsers()
    }
  }, [])


  const filteredUsers = handleFilter()

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col items-center bg-violet-300 pt-4 pb-4">
      <div className="pt-1 pb-2 flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleOnChange}
          placeholder="Filtrar por nome"
          className="focus:outline-none"
        />
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
      </div>
    </div>
  )
}