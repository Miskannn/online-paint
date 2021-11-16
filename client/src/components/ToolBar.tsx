import { observer } from 'mobx-react-lite';
import '../styles/toolbar.scss';
import Brush from "../tools/Brush";
import canvasState from '../store/canvasState';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import React from 'react';
import {BsFillXCircleFill} from "react-icons/bs";
import toolState from '../store/toolState';

const ToolBar = observer(() => {

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    const clearCanvas = (e: any) => {
      e.preventDefault();
      canvasState.clearAll();
    }
    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = canvasState.sessionid + ".jpg"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }
    return (
        <div className = "toolbar">
            <button className = "toolbar__btn brush" onClick = {() => toolState.setTool(new Brush(canvasState.canvas,canvasState.socket,canvasState.sessionid))}/>
            <button className = "toolbar__btn rect" onClick = {() => toolState.setTool(new Rect(canvasState.canvas,canvasState.socket,canvasState.sessionid))}/>
            <button className = "toolbar__btn circle" onClick = {() => toolState.setTool(new Circle(canvasState.canvas,canvasState.socket,canvasState.sessionid))}/>
            <button className = "toolbar__btn eraser" onClick = {() => toolState.setTool(new Eraser(canvasState.canvas,canvasState.socket,canvasState.sessionid))}/>
            <button className = "toolbar__btn line" onClick = {() => toolState.setTool(new Line(canvasState.canvas,canvasState.socket,canvasState.sessionid))}/>
            <button className="toolbar__btn clear" onClick = {(e: any) => clearCanvas(e)}><BsFillXCircleFill /></button>
            <label style = {{marginLeft: "10px"}} htmlFor="zal">Fill color  <span>={'>'}</span></label>
            <input id = "zal" onChange = {(e: React.ChangeEvent<HTMLInputElement>) => changeColor(e)} type= "color" style = {{marginLeft: 10}} />
            <button className = "toolbar__btn undo" onClick = {() => canvasState.undo()} />
            <button className = "toolbar__btn redo" onClick = {() => canvasState.redo()}/>
            <button className = "toolbar__btn save" onClick = {() => download()}/>
        </div>
    )
})

export default ToolBar
