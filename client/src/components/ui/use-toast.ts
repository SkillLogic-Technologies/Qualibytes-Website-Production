"use client"

import * as React from "react"
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast"

const TOAST_TIMEOUT = 3000

export type Toast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  function toast({ ...props }: Omit<Toast, "id">) {
    const id = Math.random().toString(36).slice(2)

    setToasts((current) => [
      ...current,
      {
        id,
        ...props,
      },
    ])

    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, TOAST_TIMEOUT)

    return {
      id,
      dismiss: () =>
        setToasts((current) => current.filter((t) => t.id !== id)),
    }
  }

  return {
    toast,
    toasts,
  }
}
