
export default class Tool{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    socket: any;
    id: string;

    constructor (canvas: any,socket: any,id: string){
        this.socket = socket;
        this.id = id;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
    }

    set fillColor(color: any){
        this.ctx.fillStyle = color;
    }
    set strokeColor(color: any){
        this.ctx.strokeStyle = color;
    }
    set lineWidth(width: number){
        this.ctx.lineWidth = width;
    }
    

    destroyEvents(){
       this.canvas.onmousemove  = null;
       this.canvas.onmousedown = null;
       this.canvas.onmouseup = null;
    }
}