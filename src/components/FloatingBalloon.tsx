import { motion } from 'framer-motion'

type FloatingBalloonProps = {
  className?: string
  colorClass: string
  tailClass: string
  delay?: number
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { balloon: 'h-14 w-11', tail: 'border-x-[5px] border-t-[9px]', string: 'h-9' },
  md: { balloon: 'h-20 w-16', tail: 'border-x-[7px] border-t-[12px]', string: 'h-12' },
  lg: { balloon: 'h-28 w-[5.25rem]', tail: 'border-x-[8px] border-t-[14px]', string: 'h-14' },
}

export function FloatingBalloon({ className = '', colorClass, tailClass, delay = 0, size = 'md' }: FloatingBalloonProps) {
  const balloonSize = sizes[size]

  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`pointer-events-none absolute ${className}`}
    >
      <div className={`rounded-[50%] border-2 border-ink shadow-neo ${balloonSize.balloon} ${colorClass}`} />
      <div className={`mx-auto h-0 w-0 border-x-transparent ${balloonSize.tail} ${tailClass}`} />
      <div className={`mx-auto -mt-1 w-px bg-ink ${balloonSize.string}`} />
    </motion.div>
  )
}
