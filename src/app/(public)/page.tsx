'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchUsers, User } from '@/services'
import { UserCard } from '@/components/UserCard'
import { Status, StatusIndicator } from '@/components/StatusIndicator'

export default function Users() {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  async function loadUsers() {

    try {
      const usersData = await fetchUsers()
      if (usersData?.length > 0) {
        localStorage.setItem('users', JSON.stringify(usersData))
        setUsers(usersData)
      }
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {

    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
      setLoading(false)
    } else {
      loadUsers()
    }

  }, [])


  if (loading) {
    return (
      <StatusIndicator
        label='Carregando usuários...'
        status={Status.Loading}
      />
    )

  }

  if (error) {
    return (
      <StatusIndicator
        label='Erro ao buscar usuários! Tente novamente mais tarde!'
        status={Status.Error}
      />
    )
  }

  if (!loading && !error && users?.length === 0) {
    return (
      <StatusIndicator
        label='Nenhum usuário encontrado.'
        status={Status.Empty}
      />
    )
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-2'>filter</div>
      <div className="mt-2">
        {
          users.map((user, key) => (
            <Link href={`/users/${user.id}`} key={key}>
              <UserCard key={key} {...user} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}
