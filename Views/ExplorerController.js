// Explrer controller class
class ExplorerController {
    
    constructor(root, view) {
        this.root = root;
        this.view = view;
        
        this.setupEventListeners();
    };
    
    setupEventListeners() {
        document.querySelector(".explorer").addEventListener('dblclick', this.ctrlAddItem);
        //document.querySelector(".explorer").addEventListener('click', this.ctrlDeleteItem);
    };

    ctrlAddItem = (event/*, childName, type*/) => {
        let childName = prompt("Insert childName");
        let type = prompt("Insert type");
        let parent = event.target;
        

        // Create the file/folder item
        let newItem = (type === 'folder') ? new Folder(childName)
                                          : new File(childName);


        // Add the item to the UI
        this.view.addListItem(parent, newItem, type);
        
    };

    ctrlDeleteItem = (event/*, childName, type*/) => {
        let item = event.target;
        
        // TODO: remove from parent's childList
        

        // remove from the UI
        this.view.deleteListItem(item);
    };
}

