export default function TreeOfLife({ highlight, letter }) {
    const h = (sef) =>
        `${highlight.toLowerCase() === sef ? "highlight " : ""}${sef}`;
    return (
        <div className="tol">
            <div className={`sef ${h("kether")} center`}>1</div>
            <div className={`sef ${h("chokmah")} top-row right-side`}>2</div>
            <div className={`sef ${h("binah")} top-row left-side`}>3</div>
            <div className={`sef ${h("chesed")} middle-row right-side`}>4</div>
            <div className={`sef ${h("geburah")} middle-row left-side`}>5</div>
            <div className={`sef ${h("tiphareth")} center`}>6</div>
            <div className={`sef ${h("netzach")} bottom-row right-side`}>7</div>
            <div className={`sef ${h("hod")} bottom-row left-side`}>8</div>
            <div className={`sef ${h("yesod")} center`}>9</div>
            <div className={`sef ${h("malkuth")} center`}>10</div>

            <div className={`path ${h("aleph")} horizontal`}>
                <span>א</span>
            </div>
            <div className={`path ${h("beth")} vertical`}>
                <span>ב</span>
            </div>
            <div className={`path ${h("gimmel")} vertical`}>
                <span>ג</span>
            </div>
            <div className={`path ${h("daleth")} vertical middle`}>
                <span>ד</span>
            </div>
            <div className={`path ${h("heh")} diag trans-left`}>
                <span>ה</span>
            </div>
            <div className={`path ${h("vav")} diag trans-right`}>
                <span>ו</span>
            </div>
            <div className={`path ${h("zayn")} extra-long-diag`}>
                <span>ז</span>
            </div>
            <div className={`path ${h("chet")} diag trans-right`}>
                <span>ח</span>
            </div>
            <div className={`path ${h("teth")} long-diag`}>
                <span>ט</span>
            </div>
            <div className={`path ${h("yod")} diag trans-left`}>
                <span>י</span>
            </div>
            <div className={`path ${h("kaph")} vertical`}>
                <span>כ</span>
            </div>
            <div className={`path ${h("lamed")} diag trans-left`}>
                <span>ל</span>
            </div>
            <div className={`path ${h("mem")} horizontal`}>
                <span>מ</span>
            </div>
            <div className={`path ${h("nun")} diag trans-right`}>
                <span>נ</span>
            </div>
            <div className={`path ${h("samekh")} diag trans-right`}>
                <span>ס</span>
            </div>
            <div className={`path ${h("ayin")} long-diag`}>
                <span>ע</span>
            </div>
            <div className={`path ${h("peh")} vertical`}>
                <span>פ</span>
            </div>
            <div className={`path ${h("tzaddi")} diag trans-left`}>
                <span>צ</span>
            </div>
            <div className={`path ${h("koph")} extra-long-diag`}>
                <span>ק</span>
            </div>
            <div className={`path ${h("rosh")} vertical middle`}>
                <span>ר</span>
            </div>
            <div className={`path ${h("shin")} horizontal`}>
                <span>ש</span>
            </div>
            <div className={`path ${h("tav")} vertical middle`}>
                <span>ת</span>
            </div>
        </div>
    );
}
