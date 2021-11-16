import Tool from "./Tool";


export default class Brush extends Tool{
   mouseDown?: boolean;
   constructor(canvas: HTMLCanvasElement,socket: any,id: string){
       super(canvas,socket,id);
       this.listen();
   }

   listen(){
       this.canvas.onmousemove  = this.mouseMoveHandler.bind(this);
       this.canvas.onmousedown = this.mouseDownHandler.bind(this);
       this.canvas.onmouseup = this.mouseUpHandler.bind(this);
   };

   mouseUpHandler(e: any) {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
            type: 'finish',
        }
    }))
}
   mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
   }
   mouseMoveHandler(e: any) {
    if (this.mouseDown) {
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'eraser',
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
            }
        }))
    }
}
   static draw(ctx: any,x: number,y: number){
     ctx.strokeStyle = "white";
     ctx.lineTo(x,y)
     ctx.stroke();
   }

   
};