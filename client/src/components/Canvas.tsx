import React, {useEffect, useRef, useState} from 'react';
import "../styles/canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import  {Modal, Button} from "react-bootstrap";
import {useParams} from "react-router-dom"
import Rect from "../tools/Rect";
import axios from 'axios'
import {PostParams} from "../pages/MainPage"
import Line from "../tools/Line"
import Eraser from "../tools/Eraser"
import Circle from "../tools/Circle"

const Canvas = observer(() => {
    const canvasRef: React.MutableRefObject<any> = useRef();
    const usernameRef: React.MutableRefObject<any> = useRef();
    const [modal,setModal] = useState(true);
    const params: PostParams = useParams<PostParams>();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket)
            canvasState.setSessionid(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id:params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg: any) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y);
                break;
            case "circle":
                Circle.staticDraw(ctx,figure.x,figure.y,figure.r)
                break;
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color,figure.strokeColor,figure.lineWidth)
                break;
            case "line":
                Line.staticDraw(ctx, figure.x, figure.y,figure.strokeColor,figure.lineWidth);
                break;
            case "eraser":
                Eraser.draw(ctx,figure.x,figure.y);
                break;
            case "finish":
                ctx.beginPath();
                break;
        }
    }


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header >
                    <Modal.Title>Input your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectHandler()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;