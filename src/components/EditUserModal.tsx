import React from 'react'
import Modal from './Modal'
import { useUserStore } from '../store/userStore'
import { User } from '../type/userTypes'
import InputField from './input/InputField'
import CheckboxField from './input/CheckboxField'

export default function EditUserModal({ user }: { user: User }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { updateUser } = useUserStore()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [age, setAge] = React.useState('')
  const [memberStatus, setMemberStatus] = React.useState(false)
  const [error, setError] = React.useState({
    name: '',
    email: '',
    age: '',
  })

  React.useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setAge(user.age.toString())
    setMemberStatus(user.memberStatus === 'Active')
    setError({ name: '', email: '', age: '' })
  }, [user])

  React.useEffect(() => {
    if (!isOpen) {
      setName(user.name)
      setEmail(user.email)
      setAge(user.age.toString())
      setMemberStatus(user.memberStatus === 'Active')
      setError({ name: '', email: '', age: '' })
    }
  }, [isOpen])

  const validateInputs = () => {
    const errors = {} as { name: string; email: string; age: string }

    if (!name) {
      errors.name = 'Name is required'
    }

    if (!email) {
      errors.email = 'Email is required'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format'
    }

    if (!age) {
      errors.age = 'Age is required'
    }

    if (parseInt(age) < 0) {
      errors.age = 'Age cannot be negative'
    }

    if (Object.keys(errors).length > 0) {
      setError(errors)
      return false
    }

    setError({ name: '', email: '', age: '' })
    return true
  }

  function handleSubmit() {
    if (!validateInputs()) {
      return
    }

    const updatedUser = {
      id: user.id,
      name,
      email,
      age: parseInt(age),
      memberStatus: memberStatus
        ? 'Active'
        : ('Inactive' as 'Active' | 'Inactive'),
    }

    updateUser(user.id, updatedUser)
    setIsOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      title="Edit User"
      dialogTrigger={
        <button>
          <img src="/edit.svg" alt="edit" />
        </button>
      }
    >
      <div className="space-y-4">
        <InputField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError((prev) => ({ ...prev, name: '' }))
          }}
          id="name"
          placeholder="Name"
          errorMessage={error.name}
        />

        <InputField
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError((prev) => ({ ...prev, email: '' }))
          }}
          id="email"
          placeholder="email@example.com"
          errorMessage={error.email}
        />

        <InputField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value)
            setError((prev) => ({ ...prev, age: '' }))
          }}
          id="age"
          placeholder="Age"
          errorMessage={error.age}
        />

        <CheckboxField
          label="Active Member"
          checked={memberStatus}
          onChange={(e) => setMemberStatus(e.target.checked)}
          id="memberStatus"
        />

        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-700 rounded text-white w-full p-2 mt-3"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  )
}
