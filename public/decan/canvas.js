export default function drawCanvas(canvas, info, previewElem) {
    const { minor, court, ace_and_page: ap } = info,
        context = canvas.getContext("2d"),
        grd = context.createRadialGradient(400, 400, 0, 400, 400, 400),
        randomColors = new Array(3)
            .fill("")
            .map(
                () =>
                    "#" +
                    (((1 << 24) * Math.random()) | 0)
                        .toString(16)
                        .padStart(6, "0")
            );
    grd.addColorStop(0, randomColors[0]);
    grd.addColorStop(0.5, randomColors[1]);
    grd.addColorStop(1, randomColors[2]);
    // Fill with gradient
    context.fillStyle = grd;
    context.fillRect(0, 0, 800, 800);

    drawImage(context, minor.card_name, { top: 60, left: 180 });
    drawImage(context, court.card_name, { top: 60, left: 460 });
    drawImage(context, `Page of ${ap.suit}`, { top: 460, left: 180 });
    drawImage(context, `Ace of ${ap.suit}`, { top: 460, left: 460 });

    context.font = "bold 60px 'Courier New'";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(`${minor.start_date} — ${minor.end_date}`, 400, 420);

    const prev = new Image();
    prev.src = canvas.toDataURL("image/png");
    previewElem.innerHTML = "";
    previewElem.append(prev);
}

function drawImage(context, cardName, position) {
    const image = new Image(),
        { top, left } = position;
    image.src = `/assets/cards/${cardName}.jpg`;
    image.style.height = "300px";
    context.drawImage(image, left, top, 160, 280);
}
