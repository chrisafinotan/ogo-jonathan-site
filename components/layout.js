import Navbar from './navbar'

export default function Layout({ children }) {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main>{children}</main>
        </div>
    )
}