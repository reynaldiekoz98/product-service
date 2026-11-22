class ProductStore {
  constructor() {
    this.items = [{ id: 1, name: 'Laptop', price: 1200 }, { id: 2, name: 'Mouse', price: 25 }];
    this.nextId = 3;
  }
  list() { return this.items; }
  get(id) { return this.items.find(p => p.id === id); }
  create({ name, price }) { const p = { id: this.nextId++, name, price }; this.items.push(p); return p; }
  update(id, { name, price }) { const p = this.get(id); if (p) { p.name = name; p.price = price; } return p; }
  remove(id) { const p = this.get(id); this.items = this.items.filter(x => x.id !== id); return p; }
}
module.exports = ProductStore;
