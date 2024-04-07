'use client';

import { useFormStatus } from "react-dom";
import { FaSpinner } from 'react-icons/fa';

type Props = {
  text: string
  icon?: React.ReactNode
  pendingText: string
  disabled?: boolean
  className?: string
}

export default function SubmitButton ({text, icon, pendingText, disabled, className}:Props) {

  const formStatus = useFormStatus();

  return (
    <button className={`${className || 'std-button-lite flex items-center gap-2'}`} disabled={formStatus.pending || disabled}>
      {!formStatus.pending && (
        <>
          {icon && (
            <>
              {icon}
            </>
          )}
          {text}
        </>
      )}
      {formStatus.pending && (
        <>
          <FaSpinner className='animate-spin' />
          {pendingText}
        </>
      )}
    </button>
  )
}