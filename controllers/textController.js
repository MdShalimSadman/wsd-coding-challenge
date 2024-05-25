const { addText, getTextAnalysis, modifyText, removeText } = require('../services/textService');

const createText = async (req, res) => {
    const { text } = req.body;
    try {
        const id = await addText(text);
        res.status(201).send({ id });
    } catch (error) {
        res.status(500).send({ error: 'Error adding document' });
    }
};

const analyzeTextById = async (req, res) => {
    const { id } = req.params;
    try {
        const analysis = await getTextAnalysis(id);
        res.send(analysis);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

const updateText = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        await modifyText(id, text);
        res.send({ message: 'Document updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating document' });
    }
};

const deleteText = async (req, res) => {
    const { id } = req.params;
    try {
        await removeText(id);
        res.send({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting document' });
    }
};

module.exports = {
    createText,
    analyzeTextById,
    updateText,
    deleteText
};
