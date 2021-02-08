'use strict';

(function () {
    const canvas = document.getElementsByClassName('whiteboard')[0]
    const context = canvas.getContext('2d')
    const state = {
        color: 'blue',
        drawing: false,
        from: {},
        to: {}
    }
    const socket = new WebSocket('ws://0.0.0.0:3000')

    socket.onopen = function (e) {
        console.log("[open] Connection established")
    }

    socket.onmessage = function (event) {
        const message = JSON.parse(event.data)

        if (message.name !== 'drawing') {
            return
        }

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const data = {
            from: {
                x: message.data.from.x * canvasWidth,
                y: message.data.from.y * canvasHeight
            },
            to: {
                x: message.data.to.x * canvasWidth,
                y: message.data.to.y * canvasHeight
            },
            color: message.data.color
        }

        drawLine(data.from, data.to, data.color)
    }

    const drawLine = (from, to, color) => {
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.lineTo(to.x, to.y)
        context.strokeStyle = color
        context.lineWidth = 2
        context.stroke()
        context.closePath()
    }

    const draw = (emit = false) => {
        drawLine(state.from, state.to, state.color)

        if (!emit) {
            return
        }

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        socket.send(JSON.stringify({
            name: 'drawing',
            data: {
                from: {
                    x: state.from.x / canvasWidth,
                    y: state.from.y / canvasHeight
                },
                to: {
                    x: state.to.x / canvasWidth,
                    y: state.to.y / canvasHeight
                },
                color: state.color
            }
        }))
    }

    const onMouseDown = (event) => {
        state.drawing = true

        state.from.x = event.clientX || event.touches[0].clientX
        state.from.y = event.clientY || event.touches[0].clientY
    }

    const onMouseMove = (event) => {
        if (!state.drawing) {
            return
        }

        state.to.x = event.clientX || event.touches[0].clientX
        state.to.y = event.clientY || event.touches[0].clientY

        draw(true)

        state.from.x = event.clientX || event.touches[0].clientX
        state.from.y = event.clientY || event.touches[0].clientY
    }

    const onMouseUp = (event) => {
        if (!state.drawing) {
            return
        }

        state.drawing = false
        state.to.x = event.clientX || event.touches[0].clientX
        state.to.y = event.clientY || event.touches[0].clientY

        draw(true);
    }

    // Resize canvas
    const setCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    canvas.addEventListener('mousedown', onMouseDown, false)
    canvas.addEventListener('mouseup', onMouseUp, false)
    canvas.addEventListener('mouseout', onMouseUp, false)
    canvas.addEventListener('mousemove', onMouseMove, false)

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false)
    canvas.addEventListener('touchend', onMouseUp, false)
    canvas.addEventListener('touchcancel', onMouseUp, false)
    canvas.addEventListener('touchmove', onMouseMove, false)


    document.getElementsByClassName('colors')[0].addEventListener('click', (event) => {
        if (event.target.className.includes('colors')) {
            return
        }

        document.getElementsByClassName('active')[0].classList.remove('active')

        state.color = event.target.getAttribute('data-color');
        event.target.classList.add('active')
    }, false)

    window.addEventListener('resize', setCanvas, false)
    setCanvas()

    document.getElementsByClassName('color')[0].classList.add('active')
})()