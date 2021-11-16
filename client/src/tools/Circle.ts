import Tool from "./Tool";


export default class Circle extends Tool {
    mouseDown!: boolean;
    startX!: number;
    startY!: number;
    saved: any;
    currentX!: number;
    currentY!: number;

    constructor(canvas: HTMLCanvasElement,socket: any,id: string) {
        super(canvas,socket,id);
        this.listen();
    }
    

    //static radius = (width: number,height: number) => Math.sqrt(width**2 + height**2)

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    };

    mouseDownHandler(e: any) {
        this.mouseDown = true;
        let canvasData = this.canvas.toDataURL();
        this.ctx.beginPath();
        this.startX = e.pageX-e.target.offsetLeft;
        this.startY = e.pageY-e.target.offsetTop;
        this.saved = canvasData;
    };

    mouseUpHandler(e: any) {
        this.mouseDown = false
        
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'circle',
                x: this.startX,
                y: this.startY,
                r: Math.sqrt(this.currentX - this.startX**2 + this.currentY - this.startY**2),
                color: this.ctx.fillStyle
            }
        }))
    };

    mouseMoveHandler(e: any) {
        if(this.mouseDown) {
            let curentX =  e.pageX-e.target.offsetLeft;
            let curentY =  e.pageY-e.target.offsetTop;
            let width = curentX-this.startX;
            let height = curentY-this.startY;
            let radiuss = Math.sqrt(width**2 + height**2);
            this.draw(this.startX, this.startY, radiuss);
        };
    };

    draw(x: number,y: number,r: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = async () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        };
    };
    static staticDraw(ctx: any,x: number,y: number,r: number) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2*Math.PI);
            ctx.fill();
            ctx.stroke();
    };
};