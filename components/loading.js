import { LoadingBanner } from "../styles/globalStyles";
import { useGlobalStateContext } from "../context/globalContext";

const Loading = ({ loading }) => {
    const { currentTheme } = useGlobalStateContext();
    let color;
    switch (currentTheme) {
        case "dark":
            color = "var(--main-bg-black)";
            break;
        case "light":
            color = "var(--main-bg-white)";
            break;
        case "ferhat":
            color = "var(--main-bg-brown)";
            break;
    }
    return (
        <LoadingBanner loading={loading ? "loading" : ""} color={color}>
            <div className="row">
                <div className="text">LOADING...</div>
            </div>
        </LoadingBanner>
    );
};

export default Loading;
