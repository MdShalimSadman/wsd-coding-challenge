const express = require('express');
const { db } = require('./config/firebase');
const textAnalyzer = require('./utils/textAnalyzer');
const { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const app = express();
const port = 3000;

app.use(express.json());

// Create a new text entry
app.post('/texts', async (req, res) => {
    const { text } = req.body;
    try {
        const docRef = await addDoc(collection(db, 'texts'), { text });
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send({ error: 'Error adding document' });
    }
});

// Read text entry and perform analysis
app.get('/texts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = doc(db, 'texts', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            res.status(404).send({ error: 'Document not found' });
        } else {
            const text = docSnap.data().text;
            const analysis = textAnalyzer.analyzeText(text);
            res.send(analysis);
        }
    } catch (error) {
        res.status(500).send({ error: 'Error reading document' });
    }
});

// Update a text entry
app.put('/texts/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const docRef = doc(db, 'texts', id);
        await updateDoc(docRef, { text });
        res.send({ message: 'Document updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating document' });
    }
});

// Delete a text entry
app.delete('/texts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = doc(db, 'texts', id);
        await deleteDoc(docRef);
        res.send({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting document' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
