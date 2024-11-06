import { create } from 'zustand'
import { User } from '../type/userTypes'
import { persist } from 'zustand/middleware'

// Define userStore shape and actions
type State = {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  deleteUser: (id: string) => void
  updateUser: (id: string, updatedUser: User) => void
}

// Zustand store with persistence middleware
export const useUserStore = create<State>()(
  persist(
    (set) => ({
      users: [], // Initial users state

      // Replace the entire users list on initial fetch
      setUsers: (users) => set({ users }),

      // Add a new user to the beginning of the array
      addUser: (user) => set((state) => ({ users: [user, ...state.users] })),

      // Delete a user by filtering out the matching ID
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),

      // Update a user's details by mapping over users array
      updateUser: (id, updatedUser) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? updatedUser : user
          ),
        })),
    }),
    {
      name: 'user-list', // Key name for localStorage
      getStorage: () => localStorage, // Persist to localStorage
    }
  )
)
