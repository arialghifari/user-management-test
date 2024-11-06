import AddUserModal from './components/AddUserModal'
import FilterDropdown from './components/FilterDropdown'
import SortDropdown from './components/SortDropdown'
import UserList from './components/UserList'
import { useFilterStore } from './store/filterStore'

function App() {
  const { searchUsers, clearFilteredUsers } = useFilterStore()

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex flex-col relative p-4 md:p-10 w-full md:w-[600px]">
          <h1 className="text-center text-2xl font-bold">USER MANAGEMENT</h1>

          <div className="mt-10 flex flex-col gap-4">
            <input
              onChange={(e) => {
                clearFilteredUsers()
                searchUsers(e.target.value)
              }}
              type="text"
              placeholder="Search user.."
              className="w-full border border-gray-300 px-2 py-2 rounded"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
              <FilterDropdown />
              <SortDropdown />
            </div>
          </div>
        </div>

        <div className="pb-10 px-4 md:px-10 w-full md:w-[600px]">
          <UserList />
        </div>
      </div>

      <div className="sticky bottom-0 right-0 flex justify-center pointer-events-none">
        <div
          className="px-4 pb-4 flex justify-end w-full md:w-[700px]"
          style={{ bottom: 20 }}
        >
          <AddUserModal />
        </div>
      </div>
    </div>
  )
}

export default App
