// File class
class FilesModel {
    constructor(root) {
        this.root = root;
    };

    // GETTERS
    findItemById(id) {
        if (id === 0)
            return this.root;
        
        if (id === undefined)
            return undefined;
        
        return this.find(this.root, id);
    };
    
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
    };
    
    findItem(parentId, childName) {
        let parentFolder = this.findItemById(+parentId);
        if (parentFolder && parentFolder.listOfChildren) {
            for (let i = 0; i < parentFolder.listOfChildren.length; ++i)
            {
                let curr = parentFolder.listOfChildren[i];
                if (curr.getName() === childName) {
                    return curr;
                } 
            }
        }
        return undefined;
    };
    
    // MODIFIERS
    addChild(parentId, newItem) {
        let parentFolder = this.findItemById(+parentId);
        if (parentFolder) {
            parentFolder.addChild(newItem);
        }
    };
    
    removeChild(parentId, itemId) {
        let parentFolder = this.findItemById(+parentId);
        if (parentFolder) {
            parentFolder.removeChild(+itemId);
        }
    };
    
    saveContent(id, fileContent){
        //Check to undefined
        if (id) {
            let file = this.findItemById(+id);
            if (file && file instanceof File) {
                file.saveContent(fileContent);
            }
        }        
    };
}

class File {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.content = "";
    };

    // GETTERS
    getName() {
        return this.name;
    };

    getContent() {
        return this.content;
    };


    // SETTERS
    rename() {}

    saveContent(content) {
        this.content = content;
    };
}

// Folder class
class Folder {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.listOfChildren = [];
    };
    
    // GETTERS
    getName() {
        return this.name;
    };
    
    getContent() {
        let children = "";
        for (let i = 0; i < this.listOfChildren.length; ++i)
        {
            children += './' + this.listOfChildren[i].getName() + '\n'; 
        }
        return children;
    };
    
    // MODIFIERS
    addChild(newItem) {
        this.listOfChildren.push(newItem);
    };
    
    removeChild(childId) {
        for (let i = 0; i < this.listOfChildren.length; ++i)
        {
            if (this.listOfChildren[i].id === childId) {
                this.listOfChildren.splice(i, 1);
            } 
        }
    };
    
    
}