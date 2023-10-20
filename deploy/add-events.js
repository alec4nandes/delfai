const IS_DEVELOPMENT = false,
    addEvents = (className, suffix) =>
        [...document.querySelectorAll(`.${className}`)].forEach((elem) => {
            const url = `${
                IS_DEVELOPMENT ? "http://localhost:3000" : ""
            }/${suffix}`;
            elem.href
                ? (elem.href = url)
                : (elem.onclick = () => (window.location.href = url));
        });

addEvents("log-in-btn", "home");
addEvents("subscribe-btn", "home/?page=subscribe");
