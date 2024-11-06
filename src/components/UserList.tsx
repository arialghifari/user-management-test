import React from 'react'
import { useFilterStore } from '../store/filterStore'
import { useUserStore } from '../store/userStore'
import EmptyState from './EmptyState'
import User from './User'
import useFetchUsers from '../hooks/useFetchUsers'

export default function UserList() {
  const { loading, error } = useFetchUsers()
  const { users } = useUserStore()
  const { filteredUsers, clearFilteredUsers } = useFilterStore()

  React.useEffect(() => {
    clearFilteredUsers()
  }, [users, clearFilteredUsers])

  if (loading) {
    return <EmptyState text="Loading ⏳..." animate />
  }

  if (error) {
    return <EmptyState text="Something went wrong.." />
  }

  if (users.length === 0) {
    return <EmptyState text="Empty.." />
  }

  if (filteredUsers.length === 0) {
    return <EmptyState text="Nothing found.." />
  }

  return (
    <ul className="space-y-2 md:space-y-3 w-full">
      {filteredUsers.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  )
}
