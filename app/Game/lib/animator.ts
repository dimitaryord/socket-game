export class Animator {
    animation: Array<string>
    frame: number

    constructor(animation: Array<string>){
        this.animation = animation
        this.frame = 0
    }

    play(){
        const currentFrame = this.animation[this.frame]

        if(this.animation.length-1 === this.frame) this.frame = 0
        else this.frame++

        const image = new Image()
        image.src = currentFrame
        return image

    }
}