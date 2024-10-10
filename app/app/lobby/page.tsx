'use client'

import Link from "next/link"

import { useEffect, useState } from "react"
import { getAuth } from "@/store/cookies"
import { getPlayers } from "@/actions/game"

export default function Lobby() {
  
  const [players, setPlayers] = useState<Array<string>>([])

  useEffect(() => {
    async function fetchPlayers(token: string) {
        const result = await getPlayers(token)
        if(result)
          setPlayers(result)
    }


    const user = getAuth()
    fetchPlayers(user.token).catch(console.error)
    
  }, [])
    
    return (
      <div>
        <ul className="mb-5 space-y-2">
          <li>Players: </li>
          {players.map((player, index) => {
            return <li key={index}>{player}</li>
          })}
        </ul>
        <Link href="/game" className="border-2 border-current rounded-md px-2 py-1">Connect</Link>
      </div>
    )
  }
  