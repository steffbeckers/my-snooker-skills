export default class Database {
  indexedDB
  IDBTransaction
  IDBKeyRange

  connection

  constructor() {
    // IndexedDB
    this.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB

    if (!this.indexedDB) {
      alert(`Your browser doesn't support a stable version of IndexedDB.`)
      return
    }

    // Transaction
    this.IDBTransaction =
      window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.msIDBTransaction

    // KeyRange
    this.IDBKeyRange =
      window.IDBKeyRange ||
      window.webkitIDBKeyRange ||
      window.msIDBKeyRange
  }

  connect(name = 'MySnookerSkills', version = 1) {
    let req = indexedDB.open(name, version)
    req.onerror = function () {
      alert(`Why didn't you allow my web app to use IndexedDB?`);
    }
    req.onsuccess = function (event) {
      this.connection = event.target.result
    }
    req.onupgradeneeded = function(event) {
      // Save the IDBDatabase interface
      let db = event.target.result;

      // Matches
      let objectStore = db.createObjectStore('matches', { keyPath: 'id', autoIncrement: true })
      objectStore.createIndex('startDateTime', 'startDateTime', { unique: false })
      objectStore.createIndex('endDateTime', 'endDateTime', { unique: false })
    }
  }
}
