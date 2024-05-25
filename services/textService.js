const { db } = require('../config/firebase');
const { collection, addDoc, getDoc, doc, updateDoc, deleteDoc } = require('firebase/firestore');
const { analyzeText } = require('../utils/textAnalyzer');

const addText = async (text) => {
    try {
        const docRef = await addDoc(collection(db, 'texts'), { text });
        return docRef.id;
    } catch (error) {
        throw new Error('Error adding document');
    }
};

const getTextAnalysis = async (id) => {
    try {
        const docRef = doc(db, 'texts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const text = docSnap.data().text;
            return analyzeText(text);
        } else {
            throw new Error('Document not found');
        }
    } catch (error) {
        throw new Error('Error fetching document');
    }
};

const modifyText = async (id, newText) => {
    try {
        const docRef = doc(db, 'texts', id);
        await updateDoc(docRef, { text: newText });
    } catch (error) {
        throw new Error('Error updating document');
    }
};

const removeText = async (id) => {
    try {
        const docRef = doc(db, 'texts', id);
        await deleteDoc(docRef);
    } catch (error) {
        throw new Error('Error deleting document');
    }
};

module.exports = {
    addText,
    getTextAnalysis,
    modifyText,
    removeText
};
