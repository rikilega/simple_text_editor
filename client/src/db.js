import { openDB } from 'idb';

async function createDatabase() {
    const db = await openDB('NotesDB', 1, {
        upgrade(db) {
            db.createObjectStore('notes');
        },
    });

    return db;
}

export async function getNotes() {
    const db = await createDatabase();
    return db.getAll('notes');
}

export async function saveNote(note) {
    const db = await createDatabase();
    db.put('notes', note, Date.now());
}
