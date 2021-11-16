import {makeAutoObservable} from "mobx"



class canvasState{
    canvas!: HTMLCanvasElement;
    undoList?: any = [];
    redoList?: any = [];
    username?: string = "";
    socket?: any = null;
    sessionid: any = null;

    constructor (){
        makeAutoObservable(this);
    }

    setSocket(socket: any){
        this.socket = socket
    }
    setSessionid(sessionid: string | null){
        this.sessionid = sessionid
    }
    setCanvas(canvas?: any){
        this.canvas = canvas;
    }
    setUsername(username: string){
        this.username = username;
    }
    //return
    pushToUndo(data: object){
      this.undoList?.push(data);
    }
    undo(){
        let ctx = this.canvas.getContext("2d")
        if(this.undoList.length > 0){
            let dataURL = this.undoList?.pop();
            this.redoList?.push(this.canvas.toDataURL())
            let img = new Image();
            img.src = dataURL;
            img.onload = () => {
                ctx?.clearRect(0,0,this.canvas.width,this.canvas.height)
                ctx?.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            }
        }
         else
            ctx?.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
    //next
    pushToRedo(data: object){
      this.redoList?.push(data);
    }
    redo(){
        let ctx = this.canvas.getContext("2d")
        if(this.redoList.length > 0){
            let dataURL = this.redoList?.pop();
            this.undoList?.push(this.canvas.toDataURL())
            let img = new Image();
            img.src = dataURL;
            img.onload = () => {
                ctx?.clearRect(0,0,this.canvas.width,this.canvas.height)
                ctx?.drawImage(img,0,0,this.canvas.width,this.canvas.height)
            }
        }
    }
    clearAll(){
        let ctx = this.canvas.getContext('2d');
        ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.redoList = [];
        this.undoList = [];
    }

}

export default new canvasState();