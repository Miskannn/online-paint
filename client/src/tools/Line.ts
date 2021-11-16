import Tool from "./Tool";


export default class Line extends Tool {
    name: string;
    mouseDown!: boolean;
    currentX!: number;
    currentY!: number;
    saved: any;

    constructor(canvas: HTMLCanvasElement,socket: any,id: string) {
        super(canvas,socket,id);
        this.listen()
        this.name = 'Line'
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e: any) {
        this.mouseDown = true
        this.currentX = e.pageX-e.target.offsetLeft
        this.currentY = e.pageY-e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY )
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler() {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                x: this.currentX,
                y: this.currentY,
                color: this.ctx.fillStyle,
                strokeColor: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        }))
    }

    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
        }
    }


    draw(x: number,y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = async() => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY )
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
     
    }
    static staticDraw(ctx: any,x: number, y: number,strokeColor: any,lineWidth: number) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
    }
}
