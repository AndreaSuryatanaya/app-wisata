// src/components/DiaryRenderer.jsx

import TiktokEmbed from "./TiktotEmbed";

export default function DiaryRenderer({ content }) {
    return (
        <div className="prose max-w-none">
            {content.map((block, idx) => {
                switch (block.type) {
                    case "heading":
                        return (
                            <h3 className="font-semibold text-xl py-4" key={idx}>
                                {block.text}
                            </h3>
                        );
                    case "paragraph":
                        return (
                            <p className="mb-4 text-sm text-justify" key={idx}>
                                {block.text}
                            </p>
                        );
                    case "image":
                        return (
                            <div className="flex justify-center items-center mb-6">
                                <img
                                    key={idx}
                                    src={block.src}
                                    alt={block.alt || "Image"}
                                    className="rounded-2xl w-110"
                                />
                            </div>
                        );
                    case "list":
                        return (
                            <ul key={idx} className="list-disc pl-5 text-justify py-4 text-sm">
                                {block.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        );
                    case "TiktokEmbed":
                        return <TiktokEmbed key={idx} url={block.url} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}
