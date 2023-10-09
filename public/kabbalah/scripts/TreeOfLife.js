export default function TreeOfLife({ highlight }) {
    const h = (sef) =>
        `${highlight?.toLowerCase() === sef ? "highlight " : ""}${sef}`;
    return `
        <div class="tol">
            <div class="sef ${h("kether")} center">1</div>
            <div class="sef ${h("chokmah")} top-row right-side">2</div>
            <div class="sef ${h("binah")} top-row left-side">3</div>
            <div class="sef ${h("chesed")} middle-row right-side">4</div>
            <div class="sef ${h("geburah")} middle-row left-side">5</div>
            <div class="sef ${h("tiphareth")} center">6</div>
            <div class="sef ${h("netzach")} bottom-row right-side">7</div>
            <div class="sef ${h("hod")} bottom-row left-side">8</div>
            <div class="sef ${h("yesod")} center">9</div>
            <div class="sef ${h("malkuth")} center">10</div>

            <div class="path ${h("aleph")} horizontal">
                <span>א</span>
            </div>
            <div class="path ${h("beth")} vertical">
                <span>ב</span>
            </div>
            <div class="path ${h("gimmel")} vertical">
                <span>ג</span>
            </div>
            <div class="path ${h("daleth")} vertical middle">
                <span>ד</span>
            </div>
            <div class="path ${h("heh")} diag trans-left">
                <span>ה</span>
            </div>
            <div class="path ${h("vav")} diag trans-right">
                <span>ו</span>
            </div>
            <div class="path ${h("zayn")} extra-long-diag">
                <span>ז</span>
            </div>
            <div class="path ${h("chet")} diag trans-right">
                <span>ח</span>
            </div>
            <div class="path ${h("teth")} long-diag">
                <span>ט</span>
            </div>
            <div class="path ${h("yod")} diag trans-left">
                <span>י</span>
            </div>
            <div class="path ${h("kaph")} vertical">
                <span>כ</span>
            </div>
            <div class="path ${h("lamed")} diag trans-left">
                <span>ל</span>
            </div>
            <div class="path ${h("mem")} horizontal">
                <span>מ</span>
            </div>
            <div class="path ${h("nun")} diag trans-right">
                <span>נ</span>
            </div>
            <div class="path ${h("samekh")} diag trans-right">
                <span>ס</span>
            </div>
            <div class="path ${h("ayin")} long-diag">
                <span>ע</span>
            </div>
            <div class="path ${h("peh")} vertical">
                <span>פ</span>
            </div>
            <div class="path ${h("tzaddi")} diag trans-left">
                <span>צ</span>
            </div>
            <div class="path ${h("koph")} extra-long-diag">
                <span>ק</span>
            </div>
            <div class="path ${h("rosh")} vertical middle">
                <span>ר</span>
            </div>
            <div class="path ${h("shin")} horizontal">
                <span>ש</span>
            </div>
            <div class="path ${h("tav")} vertical middle">
                <span>ת</span>
            </div>
        </div>
    `;
}
