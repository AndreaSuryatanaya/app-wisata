import { useState, useRef, useEffect } from "react";

export default function ShareMenu({ url }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const toggle = () => setOpen(!open);

    const shareItems = [
        {
            label: "Facebook",
            icon: (
                <span className="inline-block w-4 h-4 mr-1 align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.84 3.44 8.85 7.94 9.77v-6.91H7.1v-2.86h2.84V9.41c0-2.8 1.67-4.34 4.22-4.34 1.22 0 2.5.22 2.5.22v2.74h-1.41c-1.39 0-1.82.87-1.82 1.76v2.12h3.09l-.49 2.86h-2.6v6.91C18.56 20.92 22 16.91 22 12.07z" />
                    </svg>
                </span>
            ),
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            label: "Twitter",
            icon: (
                <span className="inline-block w-4 h-4 mr-1 align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.36 8.58 8.58 0 0 1-2.7 1.03 4.25 4.25 0 0 0-7.28 3.87A12.05 12.05 0 0 1 3.15 4.6a4.25 4.25 0 0 0 1.32 5.67 4.21 4.21 0 0 1-1.92-.53v.05a4.26 4.26 0 0 0 3.41 4.18 4.28 4.28 0 0 1-1.92.07 4.25 4.25 0 0 0 3.97 2.95A8.53 8.53 0 0 1 2 19.54a12.04 12.04 0 0 0 6.52 1.91c7.84 0 12.13-6.49 12.13-12.12 0-.18-.01-.36-.02-.54A8.65 8.65 0 0 0 24 5.53a8.51 8.51 0 0 1-2.54.7z" />
                    </svg>
                </span>
            ),
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        },
        {
            label: "WhatsApp",
            icon: (
                <span className="inline-block w-4 h-4 mr-1 align-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        className="scale-110"
                    >
                        <path d="M24 4C12.95 4 4 12.95 4 24c0 3.93 1.02 7.72 2.95 11.07L4.1 43.9l9.05-2.86C16.37 42.84 20.12 44 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zM28.7 30.9c-1.3 0-3.6-.4-6.5-2.4-2.5-1.6-4.1-3.9-4.7-4.6-.6-.7-1.1-1.4-1.1-2.4 0-1.2.3-1.7.6-2 .3-.3.6-.4.8-.4.2 0 .4 0 .6 0l.5.2 1.6 3.8-1.1 1.1c.3.6 1.1 1.8 2.3 2.9 1.3 1.2 2.5 1.6 3.1 1.7l.9-1.2 3.7 1.7.3.6c-.4.8-1.5 1.5-3.2 1.5z" />
                    </svg>
                </span>
            ),
            href: `https://wa.me/?text=${encodeURIComponent(url)}`,
        },
    ];

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
        setOpen(false);
    };

    // Close if clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative cursor-pointer  " ref={menuRef}>
            <button onClick={toggle} className="text-sm text-gray-500 hover:text-gray-800 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.05 16.88L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.16C16.5 7.68 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.84C7.5 9.32 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.68 8.04 14.16L15.14 18.35C15.09 18.56 15.06 18.78 15.06 19C15.06 20.66 16.4 22 18.06 22C19.72 22 21.06 20.66 21.06 19C21.06 17.34 19.72 16 18.06 16H18Z" />
                </svg>
                Share
            </button>

            {open && (
                <div className="absolute z-[9999] right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2">
                    <div className="px-4 py-1 text-xs text-gray-500 font-semibold"></div>
                    {shareItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        >
                            {item.icon} {item.label}
                        </a>
                    ))}
                    <button
                        onClick={handleCopy}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        🔗 Copy link
                    </button>
                </div>
            )}
        </div>
    );
}
