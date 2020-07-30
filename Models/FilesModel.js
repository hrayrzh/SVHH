// File class
class FilesModel {
    constructor(root) {
        this.root = root;
    }
    
    /*findItemById(parent, id) {
        if (parent.listOfChildren.length === 0)
            return 
        for (let i = 0; i < parent.listOfChildren.length; ++i) {
            let curr = parent.listOfChildren[i];
            if (curr.id === id) {
                return curr;
            }
        }
    }
    
    addItem(parentId, item) {
        for (let i = 0; i < root.listOfChildren.length; ++i) {
            let curr = root.listOfChildren[i];
            if (curr.id === parentId) {
                curr.addChild(item);
            }
        }
    }*/
    
    
    /*addItem(parentId, item) {
        this.objectsList[item.id] = item;
        this.objectsList[parentId].addChild(item);
    }*/
    
    findItemById(id) {
        if (id === 0)
            return this.root;
        
        if (!id)
            return undefined;
        
        return this.find(this.root, id);
    }
    
    find(root, id) {
        if (root.id === id) {
            return root;
        }
        
        if (root.listOfChildren) {
            for (let i = 0; i < root.listOfChildren.length; ++i)
            {
                let curr = this.find(root.listOfChildren[i], id);
                if (curr) {
                    return curr;
                } 
            }
        }
        
        return undefined;

    }
    
}

class File {
  constructor(name, id) {
    this.name = name;
    this.id = id;
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
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.listOfChildren = [];
    }
    
    /*addChild(name, type) {
        let newItem = new Folder(name);
        this.listOfChildren.push(newItem);
        return newItem;
    }*/
    addChild(newItem) {
        this.listOfChildren.push(newItem);
    }
    
    removeChild(childId) {
        for (let i = 0; i < this.listOfChildren.length; ++i)
        {
            if (this.listOfChildren[i].id === childId) {
                this.listOfChildren.splice(i, 1);
            } 
        }
    }
}