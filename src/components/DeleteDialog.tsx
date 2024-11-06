import Dialog from './Dialog'
import { User } from '../type/userTypes'
import { useUserStore } from '../store/userStore'

export default function DeleteDialog({ user }: { user: User }) {
  const { deleteUser } = useUserStore()

  return (
    <Dialog
      title={`Delete user "${user.name}" with email "${user.email}"?`}
      dialogTrigger={
        <button>
          <img src="/trash.svg" alt="delete" />
        </button>
      }
      dialogAction={
        <button
          onClick={() => deleteUser(user.id)}
          className="bg-red-600 rounded px-2 py-1 text-white"
          title="Delete"
        >
          Delete
        </button>
      }
    ></Dialog>
  )
}
