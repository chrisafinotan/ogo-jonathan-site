import Navbar from "./navbar";
import Head from "next/head";

import { useState } from "react";

export default function Layout({ children }) {
    return (
        <div style={{ position: "relative" }}>
            <Head>
                <title>Ogo Jonathan</title>
            </Head>
            <Navbar></Navbar>
            <div className="siteContent">{children}</div>
        </div>
    );
}
