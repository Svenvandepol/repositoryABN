class Item {
    constructor(name, description, parent = "") {
      this.name = name;
      this.description = description;
      this.parent = parent;
    }
    getDetails() {
      return `Name: ${this.name}, Description: ${this.description}, Parent: ${this.parent}`;
    }
  }

  module.exports = Item;
  
  