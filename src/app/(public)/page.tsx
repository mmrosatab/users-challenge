'use client'

import { ChangeEvent } from 'react'
import Link from 'next/link'
import { AlertDialog, Button, Spinner, IconButton } from '@radix-ui/themes'
import { PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons'
import { EmptyState } from './EmptyState'
import { Dialog, UserCard } from '@/components'
import { User } from '@/services'
import { useUsers } from '@/hooks'

export default function Users() {

  const {
    users,
    query,
    setQuery,
    loading,
    openDialog,
    setOpenDialog,
    userToDelete,
    setUserToDelete,
    deleteUser
  } = useUsers()

  function handleClickDelete(user: User) {
    setUserToDelete(user)
    setOpenDialog(true)
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

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
        users.length > 0 ? (
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            {users.map((user: User) => (
              <UserCard
                key={user.id}
                user={user}
                actionsNode={(
                  <>
                    <IconButton data-testid="usercard-delete-btn" onClick={() => handleClickDelete(user)}>
                      <TrashIcon width="18" height="18" />
                    </IconButton>
                  </>
                )}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )
      }

      <Dialog
        contentNode={
          <>
            <label className="">Click confirm to delete user</label>
            <label className="font-bold pl-1">{userToDelete?.name}</label>
          </>

        }
        actionNode={
          <AlertDialog.Action>
            <Button data-testid="confirm-action-btn" className='hover:cursor-pointer hover:text-violet-800' onClick={deleteUser}>Confirm</Button>
          </AlertDialog.Action>
        }
        open={openDialog}
        setOpen={setOpenDialog}
        title='Delete User'
      />
    </div>
  )
}