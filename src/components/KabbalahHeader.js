export default function KabbalahHeader({ isKabbalah }) {
    return (
        isKabbalah && (
            <h3>
                <a href="/kabbalah" target="_blank" rel="noopener">
                    Kabbalah
                </a>{" "}
                Focused
            </h3>
        )
    );
}
