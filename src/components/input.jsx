import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='block text-gray-700 font-medium mb-2' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input