import { useEffect, useState } from "react";
import { getDiaryFeed } from "../../../../api/cms";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import ShareMenu from "../components/ShareMenu";

export default function DiaryFeedPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDiary() {
            try {
                const result = await getDiaryFeed();
                setData(result.content);
            } catch (error) {
                console.error("Failed to fetch diary", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDiary();
    }, []);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    console.log(data);

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mt-4 mx-auto px-4 py-6 bg-white">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-8 overflow-hidden"
                    >
                        <div className="px-4 mt-2 mb-2 pt-4 text-sm text-gray-500 flex items-center justify-between gap-1">
                            <span className="font-medium hidden md:inline">Wisata Diary</span>
                            <span className="hidden md:inline">·</span>
                            <span className="hidden md:inline">
                                {new Date(item.created_dt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                })}
                            </span>
                            <span className="text-sm ml-110 text-gray-500 hover:text-gray-800 transition">
                                <ShareMenu url={`https://app-wisata-57b86.web.app/${item.id}`} />
                            </span>
                        </div>

                        <div className="p-4 pt-2">
                            <div className="relative rounded-lg overflow-hidden">
                                <Link to={`/${item.id}`}>
                                    <img
                                        src={item.meta.image}
                                        alt={item.meta.title}
                                        className="w-full h-70 object-cover transform transition-all hover:scale-110 duration-300"
                                    />
                                </Link>

                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    Article
                                </span>
                            </div>
                            <h2 className="text-lg font-semibold mt-3 text-gray-900">{item.meta.title}</h2>
                            <p className="text-gray-700 text-sm mt-1">{item.meta.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
