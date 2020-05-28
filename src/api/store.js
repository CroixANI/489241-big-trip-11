export default class Store {
  constructor(storeName, storage) {
    this._storeName = storeName;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeName)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._storeName,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storeName,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storeName,
        JSON.stringify(store)
    );
  }
}
