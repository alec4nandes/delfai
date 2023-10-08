const fetcher = async (fileName) =>
        await (await fetch(`/kabbalah/json/${fileName}.json`)).json(),
    kabbalahMajors = await fetcher("majors"),
    sefirot = await fetcher("sefirot"),
    worlds = await fetcher("worlds"),
    getObject = (name, arr) => ({ name, ...arr[name] }),
    getSefira = (name) => getObject(name, sefirot),
    getWorld = (name) => getObject(name, worlds);

const kabbalahRanks = {
    Ace: { sefira: getSefira("Kether") },
    2: { sefira: getSefira("Chokmah") },
    3: { sefira: getSefira("Binah") },
    4: { sefira: getSefira("Chesed") },
    5: { sefira: getSefira("Geburah") },
    6: { sefira: getSefira("Tiphareth") },
    7: { sefira: getSefira("Netzach") },
    8: { sefira: getSefira("Hod") },
    9: { sefira: getSefira("Yesod") },
    10: { sefira: getSefira("Malkuth") },
    Page: { world: getWorld("Assiah") },
    Knight: { world: getWorld("Yetzirah") },
    Queen: { world: getWorld("Briah") },
    King: { world: getWorld("Atziluth") },
};

const kabbalahSuits = {
    Pentacles: { element: "Earth", world: getWorld("Assiah") },
    Swords: { element: "Air", world: getWorld("Yetzirah") },
    Cups: { element: "Water", world: getWorld("Briah") },
    Wands: { element: "Fire", world: getWorld("Atziluth") },
};

export { kabbalahMajors, kabbalahRanks, kabbalahSuits };
