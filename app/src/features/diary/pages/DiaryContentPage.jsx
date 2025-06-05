import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"; // ganti sesuai routing kamu
import { getDiaryContentById } from "../../../../api/cms";
import ReactMarkdown from "react-markdown";

import DiaryRenderer from "../components/DiaryRender";
import ShareMenu from "../components/ShareMenu";
import Navbar from "../components/Navbar";
import { renderDiaryContent } from "../../../../utils/cms";

export default function DiaryContentPage() {
    const { id } = useParams(); // pastikan routing-nya /diary/:id
    console.log(id);

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetail() {
            try {
                const result = await getDiaryContentById(id);
                setArticle(result);
            } catch (error) {
                console.error("Failed to fetch article", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!article) return <p className="text-center mt-10 text-red-500">Article not found.</p>;

    const content = renderDiaryContent(article.content[0].content);
    // console.log(article);
    console.log(content);

    return (
        <>
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-8">
                <Link
                    to="/"
                    className="text-sm text-blue-600 hover:bg-blue-200 rounded-2xl px-4 py-2 w-fit flex items-center mb-6 transition-colors duration-300"
                >
                    ← Back to Home
                </Link>

                <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-snug">{article.content[0].meta.title}</h1>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Wisata Diary</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="text-xs sm:text-sm">
                            {new Date(article.content[0].created_dt).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex justify-end sm:justify-start">
                        <ShareMenu url={`https://app-wisata-57b86.web.app/${id}`} />
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <DiaryRenderer content={content} />
                </div>
            </div>
        </>
    );
}
