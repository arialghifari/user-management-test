import React from 'react'
import { useUserStore } from '../store/userStore'

const useFetchUsers = () => {
  // Access `users` and `setUsers` from the global store
  const { users, setUsers } = useUserStore()
  const [loading, setLoading] = React.useState(true) // State to track loading status
  const [error, setError] = React.useState<string | null>(null) // State to store error messages

  React.useEffect(() => {
    // If users are already fetched, skip the fetch and stop loading
    if (users.length > 0) {
      setLoading(false)
      setError(null)
      return
    }

    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch data from GitHub API
        const res = await fetch('https://api.github.com/users')
        const data = await res.json()

        // Format fetched data with custom fields that not available in GitHub API
        const formattedUsers = data.map(
          (user: { id: number; login: string }) => ({
            id: user.id.toString(),
            name: user.login,
            email: `${user.login}@email.com`,
            age: Math.round(Math.random() * (50 - 18)) + 18, // Random age between 18-50
            memberStatus: Math.random() < 0.5 ? 'Active' : 'Inactive', // Random status
          })
        )

        setUsers(formattedUsers) // Update users in the global store
      } catch (err) {
        setError('Failed to fetch users') // Set error message on failure
        console.error(err)
      } finally {
        setLoading(false) // Ensure loading state is cleared after fetch
      }
    }

    fetchUsers() 
  }, [])

  return { users, loading, error } 
}

export default useFetchUsers
