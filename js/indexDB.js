// indexDB.js

let db = {version: 1, objectStoreName: 'task', instance: {}}

window.app = window.app || {}

window.app.db = db

db.upgrade = (e) => {
	let
	_db = e.target.result,
	names = _db.objectStoreNames,
	name = db.objectStoreName;

	if (!names.contains(name)) {
		_db.createObjectStore(name, {
			keyPath: 'id',
			autoIncrement: true
		})
	}
}

db.errorHandler = (err) => {
	throw 'error: '+err.target.code
}

db.open = (callback) => {
	let request = window.indexedDB.open(db.objectStoreName, db.version);
	request.onupgradeneeded = db.upgrade;
	request.onerror = db.errorHandler;

	request.onsuccess = (e) => {
		db.instance = request.result;
		db.instance.onerror = db.errorHandler;
		callback();
	}
}

db.getObjectStore = (mode) => {
	let store, txn;
	mode = mode || 'readonly';
	txn = db.instance.transaction([db.objectStoreName], mode);
	store = txn.objectStore(db.objectStoreName);
	return store;
}

db.save = (data, callback) => {
	db.open(() => {
		let store, request, mode = 'readwrite';
		store = db.getObjectStore(mode);
		request = data.id ? store.put(data) : store.add(data);
		request.onsuccess = callback;
	})
}

db.get = (id, callback) => {
	db.open(() => {
		let store, request;
		store = db.getObjectStore();
		request = store.get(id);
		request.onsuccess = (e) => callback(e.target.result)
	})
}

db.getAll = (callback) => {
	db.open(() => {
		let
			store, request, data = [];

		store = db.getObjectStore();
		request = store.openCursor();

		request.onsuccess = e => {

			let
				result = e.target.result;

			if (result &&
				result !== null) {

				data.push(result.value);
				result.continue();

			} else {

				callback(data)

			}

		}
	})
}

db.remove = (id, callback) => {
	db.open(() => {
		let store, request, mode = 'readwrite';
		store = db.getObjectStore(mode);
		request = store.delete(id);
		request.onsuccess = callback;
	})
}

db.removeAll = (callback) => {
	db.open(() => {
		let store, request, mode = 'readwrite';
		store = db.getObjectStore(mode);
		request = store.clear(id);
		request.onsuccess = callback;
	})
}

module.exports = app;








