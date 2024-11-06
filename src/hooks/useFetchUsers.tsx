import React from 'react'
import { useUserStore } from '../store/userStore'

const useFetchUsers = () => {
  const { users, setUsers } = useUserStore()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (users.length > 0) {
      setLoading(false)
      setError(null)
      return
    }

    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch('https://api.github.com/users')
        const data = await res.json()

        const formattedUsers = data.map(
          (user: { id: number; login: string }) => ({
            id: user.id.toString(),
            name: user.login,
            email: `${user.login}@email.com`,
            age: Math.round(Math.random() * (50 - 18)) + 18,
            memberStatus: Math.random() < 0.5 ? 'Active' : 'Inactive',
          })
        )

        setUsers(formattedUsers)
      } catch (err) {
        setError('Failed to fetch users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}

export default useFetchUsers
