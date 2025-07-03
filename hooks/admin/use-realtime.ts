"use client"

import { useEffect, useState, useCallback } from "react"
import { getSupabaseClient } from "@/lib/admin/supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

export function useRealtimeSubscription<T>(table: string, callback: (payload: any) => void, filter?: string) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const supabase = getSupabaseClient()

  const memoizedCallback = useCallback(callback, [callback])

  useEffect(() => {
    const channelName = `realtime:${table}:${Date.now()}`
    let subscription = supabase.channel(channelName)

    if (filter) {
      subscription = subscription.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: filter,
        },
        memoizedCallback,
      )
    } else {
      subscription = subscription.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        memoizedCallback,
      )
    }

    subscription.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log(`Subscribed to ${table} changes`)
      }
    })

    setChannel(subscription)

    return () => {
      if (subscription) {
        subscription.unsubscribe()
        console.log(`Unsubscribed from ${table} changes`)
      }
    }
  }, [table, memoizedCallback, filter, supabase])

  return channel
}

// Hook for real-time dashboard updates
export function useDashboardRealtime() {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const handleUpdate = useCallback(() => {
    setLastUpdate(new Date())
  }, [])

  // Subscribe to all relevant table changes
  useRealtimeSubscription("clients", handleUpdate)
  useRealtimeSubscription("servers", handleUpdate)
  useRealtimeSubscription("security_alerts", handleUpdate)
  useRealtimeSubscription("tasks", handleUpdate)

  return { lastUpdate }
}
