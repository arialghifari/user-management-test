import { useFilterStore } from '../store/filterStore'
import Dropdown from './Dropdown'

export default function SortDropdown() {
  const SORT_OPTIONS = [
    'Name (A-Z)',
    'Name (Z-A)',
    'Age (Young)',
    'Age (Old)',
    'Active Members',
    'Inactive Members',
  ]
  const { currentSort, sortUsers } = useFilterStore()

  return (
    <Dropdown
      popoverTrigger={
        <button className="flex gap-1.5">
          <span>Sort by</span>
          <span className="font-semibold flex">
            {currentSort} <img src="/chevron-down.svg" alt="" />
          </span>
        </button>
      }
    >
      <>
        {SORT_OPTIONS.map((option) => (
          <div key={option} className="flex w-full gap-1">
            <input
              type="radio"
              name="filter"
              onClick={() => sortUsers(option)}
              id={option}
              defaultChecked={option === currentSort}
            />
            <label htmlFor={option} className="flex-1">
              {option}
            </label>
          </div>
        ))}
      </>
    </Dropdown>
  )
}
