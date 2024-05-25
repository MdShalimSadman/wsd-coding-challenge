const analyzeText = (text) => {
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const characters = text.replace(/\s+/g, '');
    const characterCount = characters.length;

    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const sentenceCount = sentences.length;

    const paragraphs = text.split(/\n+/).filter(Boolean);
    const paragraphCount = paragraphs.length;

    const longestWord = words.reduce((longest, current) => current.length > longest.length ? current : longest, '');

    return {
        wordCount,
        characterCount,
        sentenceCount,
        paragraphCount,
        longestWord
    };
};

module.exports = {
    analyzeText
};
