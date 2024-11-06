import React from 'react'
import Modal from './Modal'
import { useUserStore } from '../store/userStore'
import InputField from './input/InputField'
import CheckboxField from './input/CheckboxField'

export default function AddUserModal() {
  const { addUser } = useUserStore()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [age, setAge] = React.useState('')
  const [memberStatus, setMemberStatus] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [error, setError] = React.useState({
    name: '',
    email: '',
    age: '',
  })

  React.useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setAge('')
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

    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      age: parseInt(age),
      memberStatus: memberStatus
        ? 'Active'
        : ('Inactive' as 'Active' | 'Inactive'),
    }

    addUser(user)
    setName('')
    setEmail('')
    setAge('')
    setMemberStatus(false)
    setIsOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      title="Add User"
      dialogTrigger={
        <button className="bg-blue-700 rounded-full p-2 pointer-events-auto">
          <img src="/plus.svg" alt="" className="" />
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
            Add
          </button>
        </div>
      </div>
    </Modal>
  )
}
