function playVids(video_before){
    // Get the after video
    var video_after = document.getElementById(video_before.id + "After");
    // Get the canvas
    var canvas = document.getElementById(video_before.id + "Merge");
    // Get the outtermost box
    var box = document.getElementById(video_before.id + "Compare");

    var position = 0.5,
        bcr = box.getBoundingClientRect();
    
    canvas.width = bcr.width;
    canvas.height = bcr.height;
    video_before.style.position = "absolute";
    video_after.style.position = "absolute";
    canvas.style.position = "absolute";

    canvas.onmousemove = function(event){
        var x = event.clientX;
        var bcr = canvas.getBoundingClientRect();
        if (x >= bcr.x && x < bcr.x + bcr.width){
            position = (x - bcr.x) / bcr.width;
        }
        canvas.width = bcr.width;
        canvas.height = bcr.height;
    }

    function drawLoop(){
        // Get the canvas and context
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the top/down video
        // before
        ctx.drawImage(video_before,
            0, 0, position * video_before.videoWidth, video_before.videoHeight,
            0, 0, position * canvas.width, canvas.height);
        // after
        ctx.drawImage(video_after,
            position * video_after.videoWidth, 0, (1 - position) * video_after.videoWidth, video_after.videoHeight,
            position * canvas.width, 0, (1 - position) * canvas.width, canvas.height);

        // Draw the slider line
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.moveTo(position * canvas.width, 0);
        ctx.lineTo(position * canvas.width, canvas.height);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Draw the upper circle
        ctx.save();
        ctx.fillStyle = "pink";
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(position * canvas.width + 25, 50);
        ctx.arc(position * canvas.width, 50, 25, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Define the draw arrow function
        function drawArrow(x, y, dx){
            ctx.save();
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + dx, y);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + dx + 0.4 * dx, y);
            ctx.lineTo(x + dx, y + 0.4 * dx);
            ctx.lineTo(x + dx, y - 0.4 * dx);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // Right arrow, left arrow
        drawArrow(position * canvas.width, 50, 15);
        drawArrow(position * canvas.width, 50, -15);

        requestAnimationFrame(drawLoop);
    }

    requestAnimationFrame(drawLoop);
}