// src/components/TiktokEmbed.jsx
export default function TiktokEmbed({ url }) {
    return (
        <div className="my-4">
            <iframe
                src={`https://www.tiktok.com/embed/${url.split("/").pop()}`}
                className="w-full h-[500px] rounded-md"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
}
