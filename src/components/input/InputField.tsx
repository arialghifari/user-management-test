import React from 'react'

type InputFieldProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  id: string
  placeholder?: string
  errorMessage?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  id,
  placeholder = '',
  errorMessage = '',
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {label} *
      </label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-2 py-1 rounded"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  )
}

export default InputField
