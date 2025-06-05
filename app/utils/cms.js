const CDN_WISATA_URL = "https://cdn.wisata.app";
const CDN_TWITTER_URL = "https://pbs.twimg.com";
const CDN_WISATA_IMG_SIZE = {
    TH: "th",
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
};

/**
 * TASK: Find available image size for Twitter CDN
 */
const CDN_TWITTER_IMG_SIZE = {
    // ...
    TH: "th",
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
};

/**
 * TASK: Replace original image URL with size-optimized image URL.
 * @example
 * For Wisata CDN URL:
 * ```
 * https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_th.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_lg.jpg
 * ```
 *
 * Note that some images may not have optimized URL variants.
 */
// export function getSizeOptimizedImageUrl(originalUrl, desiredSize) {
//     // ...
// }

export function getSizeOptimizedImageUrl(originalUrl, desiredSize) {
    if (!originalUrl || !desiredSize) return originalUrl;

    try {
        const url = new URL(originalUrl);

        // Handle Wisata CDN
        if (url.hostname === "cdn.wisata.app") {
            const extMatch = url.pathname.match(/\.(jpg|jpeg|png|webp)$/);
            if (extMatch) {
                const ext = extMatch[0];
                const pathWithoutExt = url.pathname.replace(ext, "");
                return `${url.origin}${pathWithoutExt}_${desiredSize}${ext}`;
            }
        }

        // Handle Twitter CDN
        if (url.hostname === "pbs.twimg.com") {
            const validSizes = Object.values(CDN_TWITTER_IMG_SIZE);
            if (validSizes.includes(desiredSize)) {
                url.searchParams.set("name", desiredSize);
            }
            return url.toString();
        }

        // Fallback
        return originalUrl;
    } catch (e) {
        console.log(e);
        return originalUrl;
    }
}

/**
 * TASK: Extracts SEO attributes from diary content
 * @param {string} contentData - The diary content in MDX format
 * @returns {Object} SEO attributes object containing title, description, image and keywords
 */
export function getDiaryContentSEOAttributes(contentData) {
    if (!contentData) {
        return {
            title: "",
            description: "",
            image: null,
            keywords: [],
        };
    }

    const lines = contentData.split("\n");
    let title = "";
    let description = "";
    let image = null;
    const keywords = new Set();

    // Extract first heading as title
    const headingMatch = contentData.match(/^#+\s+(.+)$/m);
    if (headingMatch) {
        title = headingMatch[1].replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
    }

    // Extract first paragraph for description (limited to ~160 chars)
    for (const line of lines) {
        const trimmed = line.trim();
        if (
            trimmed &&
            !trimmed.startsWith("#") &&
            !trimmed.startsWith("!") &&
            !trimmed.startsWith("<") &&
            !trimmed.startsWith("-")
        ) {
            // Clean markdown formatting
            description =
                trimmed
                    .replace(/\\(.)/g, "$1")
                    .replace(/\*\*(.+?)\*\*/g, "$1")
                    .replace(/\*(.+?)\*/g, "$1")
                    .substring(0, 157) + "...";
            break;
        }
    }

    // Extract first image as featured image
    const imageMatch = contentData.match(/!\[(.*?)\]\((.*?)\)/);
    if (imageMatch) {
        image = imageMatch[2];
    }

    // Extract potential keywords from content
    // Using headings and first few paragraphs
    const contentText = contentData.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");

    // Extract words from headings (they're usually important)
    const headings = contentText.match(/^#+\s+(.+)$/gm);
    if (headings) {
        headings.forEach((heading) => {
            const words = heading
                .replace(/^#+\s+/, "")
                .split(/\s+/)
                .filter((word) => word.length > 3)
                .map((word) => word.toLowerCase());
            words.forEach((word) => keywords.add(word));
        });
    }

    // Get potential keywords from first 3 paragraphs
    let paragraphCount = 0;
    for (const line of lines) {
        const trimmed = line.trim();
        if (
            trimmed &&
            !trimmed.startsWith("#") &&
            !trimmed.startsWith("!") &&
            !trimmed.startsWith("<") &&
            !trimmed.startsWith("-")
        ) {
            const words = trimmed
                .split(/\s+/)
                .filter((word) => word.length > 4)
                .map((word) => word.replace(/[,.!?;:'"]/g, "").toLowerCase());

            words.forEach((word) => {
                if (!commonWords.includes(word)) {
                    keywords.add(word);
                }
            });

            paragraphCount++;
            if (paragraphCount >= 3) break;
        }
    }

    return {
        title: title || "Travel Diary", // Default title if none found
        description: description || "Explore this travel diary on Wisata.app", // Default description
        image, // Featured image or null
        keywords: Array.from(keywords).slice(0, 10), // Limit to top 10 keywords
    };
}

// Common words to exclude from keywords
const commonWords = [
    "about",
    "after",
    "again",
    "also",
    "always",
    "another",
    "because",
    "before",
    "being",
    "between",
    "both",
    "could",
    "does",
    "doing",
    "during",
    "each",
    "either",
    "every",
    "from",
    "have",
    "having",
    "here",
    "just",
    "like",
    "more",
    "most",
    "much",
    "need",
    "only",
    "other",
    "some",
    "such",
    "than",
    "that",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "through",
    "very",
    "want",
    "well",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "will",
    "with",
    "without",
    "would",
    "your",
];

/**
 * TASK: Convert diary content to renderable data
 *
 * The content coming from `/cms/diary` is in MDX (Markdown with Embedded Components) format. This function help render that content.
 *
 * Known MDX components are:
 * - \<YoutubeEmbed />
 * - \<Instagra mEmbed />
 * - \<TiktokEmbed />
 * - \<TwitterEmbed />
 */

export function renderDiaryContent(contentData) {
    const lines = contentData.split("\n");
    const result = [];

    const embedRegexMap = {
        TiktokEmbed: /<TiktokEmbed\s+url="(.+?)"\s*\/>/,
        YoutubeEmbed: /<YoutubeEmbed\s+url="(.+?)"\s*\/>/,
        InstagramEmbed: /<InstagramEmbed\s+url="(.+?)"\s*\/>/,
        TwitterEmbed: /<TwitterEmbed\s+url="(.+?)"\s*\/>/,
    };

    function cleanInlineMarkdown(text) {
        return text
            .replace(/\\(.)/g, "$1") // ← hapus karakter \ yang meng-escape karakter seperti titik
            .replace(/\*\*(.+?)\*\*/g, "$1") // bold
            .replace(/\*(.+?)\*/g, "$1"); // italic
    }

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        let matchedEmbed = false;
        for (const [type, regex] of Object.entries(embedRegexMap)) {
            const match = trimmed.match(regex);
            if (match) {
                result.push({ type, url: match[1] });
                matchedEmbed = true;
                break;
            }
        }
        if (matchedEmbed) continue;

        if (trimmed.startsWith("###")) {
            result.push({
                type: "heading",
                level: 3,
                text: cleanInlineMarkdown(trimmed.replace(/^###\s*/, "")),
            });
            continue;
        }

        const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
            result.push({
                type: "image",
                alt: imageMatch[1],
                src: imageMatch[2],
            });
            continue;
        }

        if (trimmed.startsWith("- ")) {
            if (result.length === 0 || result[result.length - 1].type !== "list") {
                result.push({ type: "list", items: [] });
            }
            result[result.length - 1].items.push(cleanInlineMarkdown(trimmed.slice(2).trim()));
            continue;
        }

        result.push({
            type: "paragraph",
            text: cleanInlineMarkdown(trimmed),
        });
    }

    return result;
}
