import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-8 py-6 px-4 md:px-0 mt-4 border rounded-2xl border-gray-200">
            <Link to="/">
                <img src="/assets/images/logoWisataApp.png" alt="Logo" className="w-[176px] h-auto ml-8" />
            </Link>

            <div className="md:hidden">
                <button onClick={toggleMenu}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>

            {/* Sign in button (Desktop) */}
            <div className="hidden md:flex items-center gap-3 mr-8">
                <a
                    href="#"
                    className="text-base bg-indigo-950 text-white py-3 px-6 rounded-full font-semibold hover:bg-violet-700"
                >
                    Sign In
                </a>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden z-50 px-4 pb-6">
                    <ul className="flex flex-col gap-4 mt-4">
                        <li className="mt-4 flex items-center justify-between">
                            <div className="bg-white py-3 px-3 rounded-full flex items-center"></div>
                            <a
                                href="#"
                                className="text-base bg-indigo-950 text-white py-3 px-6 rounded-full font-semibold hover:bg-violet-700"
                            >
                                Sign In
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
