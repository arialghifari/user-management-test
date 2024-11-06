import React from 'react'

type CheckboxFieldProps = {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  id,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id={id}
        className="w-4 h-4"
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  )
}

export default CheckboxField
