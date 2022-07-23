const notes = [];
const STORAGE_KEY = 'notes';

function isStorageExist() {
    if (typeof(Storage) === "undefined") {
        return false;
    }
    return true;
}

if (isStorageExist()) {
    if (localStorage.getItem(STORAGE_KEY) !== null) {
        notes.push(...JSON.parse(localStorage.getItem(STORAGE_KEY)));
    }
    else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
}

export default notes;