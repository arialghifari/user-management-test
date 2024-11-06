import { User as UserType } from '../type/userTypes'
import DeleteDialog from './DeleteDialog'
import EditUserModal from './EditUserModal'

export default function User({ user }: { user: UserType }) {
  return (
    <li className="flex items-center hover:bg-slate-100 rounded px-2 py-2 border">
      <div className="flex flex-1 flex-col sm:flex-row w-full">
        <div className="flex flex-col flex-1 px-2 py-1 h-full">
          <p className="truncate font-semibold">
            {user.name}{' '}
            <span className="font-light text-sm">({user.age} y.o)</span>
          </p>
          <p className="text-sm text-gray-400 truncate ...">{user.email}</p>
        </div>

        <div className="px-2 py-1 flex items-center">
          <p
            className={`text-xs font-medium py-1 px-3 rounded-full ${
              user.memberStatus === 'Active'
                ? 'bg-green-100 text-green-500'
                : 'bg-red-100 text-red-500'
            } truncate`}
          >
            {user.memberStatus} Member
          </p>
        </div>
      </div>

      <div className="space-x-1 flex flex-none py-2 px-1">
        <EditUserModal user={user} />
        <DeleteDialog user={user} />
      </div>
    </li>
  )
}
