import { create } from 'zustand'
import { User } from '../type/userTypes'
import { useUserStore } from './userStore'

// Define filterStore shape and actions
type FilterState = {
  filteredUsers: User[]
  searchUsers: (searchTerm: string) => void
  clearFilteredUsers: () => void
  curentFilter: string
  filterUsers: (filter: string) => void
  currentSort: string
  sortUsers: (sort: string) => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
  // Initializes with the users from the main user store
  filteredUsers: useUserStore.getState().users,
  
  // Filters users based on name or email
  searchUsers: (searchTerm) => {
    const users = useUserStore.getState().users
    set({
      filteredUsers: users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })
  },

  curentFilter: 'All',

  // Applies filter based on membership status
  filterUsers: (filter) => {
    const users = useUserStore.getState().users

    set({ filteredUsers: users, curentFilter: filter })
    if (filter === 'All') {
      set({ filteredUsers: users })
    } else if (filter === 'Active Members') {
      set({
        filteredUsers: users.filter((user) => user.memberStatus === 'Active'),
      })
    } else if (filter === 'Inactive Members') {
      set({
        filteredUsers: users.filter((user) => user.memberStatus === 'Inactive'),
      })
    }
  },

  currentSort: 'All',

  // Sorts users based on criteria such as name, age and membership status
  sortUsers: (sort) => {
    const users = get().filteredUsers

    if (sort === 'Name (A-Z)') {
      set({
        filteredUsers: users.sort((a, b) => a.name.localeCompare(b.name)),
      })
    } else if (sort === 'Name (Z-A)') {
      set({
        filteredUsers: users.sort((a, b) => b.name.localeCompare(a.name)),
      })
    } else if (sort === 'Age (Young)') {
      set({
        filteredUsers: users.sort((a, b) => a.age - b.age),
      })
    } else if (sort === 'Age (Old)') {
      set({
        filteredUsers: users.sort((a, b) => b.age - a.age),
      })
    } else if (sort === 'Active Members') {
      set({
        filteredUsers: users.sort((a, b) =>
          a.memberStatus.localeCompare(b.memberStatus)
        ),
      })
    } else if (sort === 'Inactive Members') {
      set({
        filteredUsers: users.sort((a, b) =>
          b.memberStatus.localeCompare(a.memberStatus)
        ),
      })
    }

    set({ currentSort: sort })
  },

  // Resets filters and sorting to their default state
  clearFilteredUsers: () =>
    set({
      filteredUsers: useUserStore.getState().users,
      curentFilter: 'All',
      currentSort: 'All',
    }),
}))
