// File class
class FilesModel {
    constructor(root) {
        this.root = root;
    }
    

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
        this.content = "";
    }

    // GETTERS

    getName() {}

    getContent() {
        return this.content;
    }


    // SETTERS

    rename() {}

    saveContent(content) {
        this.content = content;
    }
}

// Folder class
class Folder {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.listOfChildren = [];
    }
    
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