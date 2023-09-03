"use client"

import { MutableRefObject, useRef } from "react"

export function useCustomRef<T> () {
    return useRef<T | null>(null) as MutableRefObject<T>;
}