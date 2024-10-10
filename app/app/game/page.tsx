'use client'

import { getAuth } from "@/store/cookies"
import { io } from "socket.io-client"
import { usePathname } from "next/navigation"
import main from "@/Game/main"
import { useEffect, useRef, useState } from "react"

export default function Game() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const path = usePathname()

  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(600)

  useEffect(() => {
    const user = getAuth()
    const socket = io('ws://localhost:4000',{auth:{
      user,
      canvas:{
        width,
        height
      }
    }})

    main(canvas, socket)

    window.addEventListener("beforeunload", () => socket.disconnect())

    return () => {
      socket.disconnect()
      window.removeEventListener('beforeunload', () => socket.disconnect())
    }
  }, [path])  

    return (
      <div>
        <canvas 
        width={600}
        height={600}
        ref={canvas}
        className="bg-green-600 rounded-xl shadow-xl border-2" ></canvas>
      </div>
    )
  }
  