import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { fetchUsers, User } from '@/services'

export function useUsers() {

    const [users, setUsers] = useState<User[]>([])
    const [query, setQuery] = useState('')
    const [queryValue] = useDebounce(query, 1000)
    const [loading, setLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)

    const loadUsers = useCallback(async () => {
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
    }, [])

    function deleteUser() {
        if (!userToDelete) return

        const { id } = userToDelete
        const newUsers = users.filter((user) => user.id !== id)
        localStorage.setItem('users', JSON.stringify(newUsers))
        setUsers(newUsers)
        setOpenDialog(false)
        setUserToDelete(null)
    }

    const filteredUsers = useMemo(() => {
        if (queryValue.length > 0) {
            return users.filter((user) => user.name.toLowerCase().includes(queryValue.toLowerCase()))
        }
        return users
    }, [queryValue, users])

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


    return {
        users: filteredUsers,
        query,
        setQuery,
        loading,
        openDialog,
        setOpenDialog,
        userToDelete,
        setUserToDelete,
        deleteUser
    }
}