import { create } from 'zustand'
import { User } from '../type/userTypes'
import { persist } from 'zustand/middleware'

type State = {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  deleteUser: (id: string) => void
  updateUser: (id: string, updatedUser: User) => void
}

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
      updateUser: (id, updatedUser) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? updatedUser : user
          ),
        })),
    }),
    {
      name: 'user-list',
      getStorage: () => localStorage,
    }
  )
)
