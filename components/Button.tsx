import Image from 'next/image';
import { MouseEventHandler } from 'react'

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: 'button' | 'submit';
  bgColor?: string;
  textColor?: string;
}

const Button = ({ title, leftIcon, rightIcon, handleClick, isSubmitting, type, bgColor, textColor}:Props) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}      
      className={`flex items-center justify-between px-5 py-2
      ${textColor || 'text-white'}
      ${isSubmitting ? '' : bgColor || 'bg-violet-500'}  max-md:w-full rounded-sm hover:bg-violet-800 active:bg-violet-300 active:text-black-100
      `}

      // px-10 py-2 bg-violet-500 text-white rounded-sm hover:bg-violet-800 active:bg-violet-300 active:text-black-100
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} className='mr-2' alt='left'/>}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt='right'/>}
    </button>
  )
}

export default Button