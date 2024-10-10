let players:any = {}

const inputs:any = {
  'w': false,
  's': false,
  'a': false,
  'd': false,
}

function draw(this: any, canvas: HTMLCanvasElement, drawer: CanvasRenderingContext2D){
    //clear
    drawer.clearRect(0, 0, canvas.width, canvas.height)

    //draw
    Object.values(players).forEach((player:any) => {
      drawer.drawImage(this, player.x, player.y)
    })

    requestAnimationFrame(draw.bind(this, canvas, drawer))
}
export default function main(canvas: any, socket: any){

    document.addEventListener('keydown', event => {
      inputs[event.key] = true
      socket.emit('player-move', inputs)
    })

    document.addEventListener('keyup', event => {
      inputs[event.key] = false
      socket.emit('player-move', inputs)
    })

    socket.on('new-player', (_players: any) => {
      players = _players
    })

    socket.on('player-moved', (id: string, position: any) => {
      players[id] = position
    })
    const image = new Image()
    image.src = '/skeleton.png'
    image.onload = () => {
      draw.call(image, canvas.current, canvas.current.getContext('2d'))
    }
}