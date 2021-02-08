'use strict';
(function () {
    const canvas = document.getElementsByClassName('whiteboard')[0]
    const context = canvas.getContext('2d')
    const current = {
        color: 'blue'
    }
    let drawing = false

    canvas.addEventListener('mousedown', onMouseDown, false)
    canvas.addEventListener('mouseup', onMouseUp, false)
    canvas.addEventListener('mouseout', onMouseUp, false)
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false)

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false)
    canvas.addEventListener('touchend', onMouseUp, false)
    canvas.addEventListener('touchcancel', onMouseUp, false)
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false)

    document.getElementsByClassName('colors')[0].addEventListener('click', (event) => {
        if (event.target.className.includes('colors')) {
            return
        }

        current.color = event.target.className.split(' ')[1]
    }, false)

    window.addEventListener('resize', setCanvas, false)
    setCanvas()

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

        drawLine(data)
    }

    const drawLine = ({
        from,
        to,
        color
    }, emit = false) => {
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.lineTo(to.x, to.y)
        context.strokeStyle = color
        context.lineWidth = 2
        context.stroke()
        context.closePath()

        if (!emit) {
            return
        }

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        socket.send(JSON.stringify({
            name: 'drawing',
            data: {
                from: {
                    x: from.x / canvasWidth,
                    y: from.y / canvasHeight
                },
                to: {
                    x: to.x / canvasWidth,
                    y: to.y / canvasHeight
                },
                color
            }
        }))
    }

    function onMouseDown(e) {
        drawing = true
        current.x = e.clientX || e.touches[0].clientX
        current.y = e.clientY || e.touches[0].clientY
    }

    function onMouseUp(e) {
        if (!drawing) {
            return
        }

        drawing = false

        const data = {
            from: current,
            to: {
                x: e.clientX || e.touches[0].clientX,
                y: e.clientY || e.touches[0].clientY
            },
            color: current.color
        }

        drawLine(data, true);
    }

    function onMouseMove(e) {
        if (!drawing) {
            return
        }

        const data = {
            from: current,
            to: {
                x: e.clientX || e.touches[0].clientX,
                y: e.clientY || e.touches[0].clientY
            },
            color: current.color
        }

        drawLine(data, true)

        current.x = e.clientX || e.touches[0].clientX
        current.y = e.clientY || e.touches[0].clientY
    }

    // Limit the number of events per second
    function throttle(callback, delay) {
        let previousCall = new Date().getTime()

        return function () {
            const time = new Date().getTime()

            if ((time - previousCall) >= delay) {
                previousCall = time
                callback.apply(null, arguments)
            }
        }
    }

    // Resize canvas
    function setCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
})()