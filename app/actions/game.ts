export async function getPlayers(token: string){
    const res = await fetch('http://localhost:4000/game/players',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },

    })
    const data = await res.json()
    return data.players
}

export async function getPlayerImage(){
  const response = await fetch('http://localhost:4000/assets/skeleton.png')
  
  if(response.ok){
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return url
  }
}