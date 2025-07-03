"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export default function LoadingTransition() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Show loading animation when route changes
    setIsLoading(true)

    // Hide loading animation after a delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="mt-4 text-xl font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              Loading...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
