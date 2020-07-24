// File class
class File {
  constructor(name) {
    this.name = name;
  }

  // GETTERS

  getName() {}

  getContent() {}

  // SETTERS

  rename() {}

  changeContent() {}
}

// Folder class
class Folder {
    constructor(name) {
        this.name = name;
        this.listOfChildren = [];
    }
    
    addChild(name) {
        let newItem = new Folder(name);
        this.listOfChildren.push(newItem);
        return newItem;
    }
}