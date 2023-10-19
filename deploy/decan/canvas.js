export default function drawCanvas(canvas, info, previewElem) {
    const { minor, zodiac, court, suit } = info,
        context = canvas.getContext("2d"),
        grd = context.createLinearGradient(0, 0, 0, 800),
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

    context.globalAlpha = 0.15;
    const image = new Image();
    image.src = "/assets/wheel.png";
    context.drawImage(image, 0, 0, 800, 800);
    context.globalAlpha = 1;

    drawImage(context, minor.card_name, { top: 90, left: 90 });
    drawImage(context, zodiac.card_name, { top: 90, left: 400 - 80 });
    drawImage(context, minor.astro.card_name, { top: 90, left: 550 });
    drawImage(context, court.card_name, { top: 430, left: 90 });
    drawImage(context, `Page of ${suit.name}`, { top: 430, left: 400 - 80 });
    drawImage(context, `Ace of ${suit.name}`, { top: 430, left: 550 });

    context.globalAlpha = 0.65;
    context.fillStyle = "lightblue";
    context.fillRect(400 - 80, 90, 160, 280);
    context.globalAlpha = 1;

    context.font = "bold 45px 'Georgia'";
    context.textAlign = "center";
    context.fillStyle = "#333";
    context.fillText(minor.start_date, 400, 175);
    context.fillText("—", 400, 245);
    context.fillText(minor.end_date, 400, 310);

    const prev = new Image();
    prev.src = canvas.toDataURL("image/png");
    previewElem.innerHTML = "";
    previewElem.append(prev);
}

function drawImage(context, cardName, position) {
    const image = new Image(),
        { top, left } = position;
    image.src = `/assets/cards/${cardName}.jpg`;
    context.drawImage(image, left, top, 160, 280);
}
