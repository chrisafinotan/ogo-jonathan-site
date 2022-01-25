import Navbar from "./navbar";
import { useState } from "react";

export default function Layout({ children }) {
    return (
        <div style={{ position: "relative" }}>
            <Navbar></Navbar>
            <div className="siteContent">{children}</div>
        </div>
    );
}
