import {makeAutoObservable} from "mobx";

class ToolState {
    tool: any = null;
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: any): void {
        this.tool = tool
    }
    setFillColor(color: any): void {
        this.tool.fillColor = color;
    }
    setStrokeColor(color: any): void {
        this.tool.strokeColor = color;
    }
    setLineWidth(width: number): void {
        this.tool.lineWidth = width
    }
    
}

export default new ToolState()