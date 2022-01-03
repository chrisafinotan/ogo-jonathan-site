import Navbar from "./navbar";

export default function Layout({ children }) {
    return (
        <div style={{ position: "relative" }}>
            <Navbar></Navbar>
            <div className="siteContent">{children}</div>
        </div>
    );
}
