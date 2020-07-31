// Explrer controller class
class ExplorerController {
    
    constructor(view) {
        this.currentId = 0;        
        this.fileModel = new FilesModel(new Folder('root', this.currentId));
        //document.querySelector(".caret").id = 0;
        this.view = view;
        
        this.setupCustomEventListeners();
        this.setupEventListeners( document.getElementById("0"), 'root');

    };
    
    setupCustomEventListeners() {
        document.querySelector(".explorer").addEventListener('click', () => {this.ctrlShowContent()});        
        document.getElementById("add_folder_id").addEventListener('click', () => {this.ctrlAddItem('folder')});
        document.getElementById("add_file_id").addEventListener('click', () => {this.ctrlAddItem('file')});
        document.getElementById("delete_id").addEventListener('click', () => {this.ctrlDeleteItem()});
        
        // If the document is clicked somewhere
        window.addEventListener("click",function(){
            document.getElementById("context-menu").classList.remove("active");
        });
    };
    
    setupEventListeners(item, type) {
        console.log(item);
        console.log(type);
        item.addEventListener('contextmenu', (event) => {
            // Avoid the real one
            event.preventDefault();
            // Stop propogation of the event to its parents
            event.stopImmediatePropagation();
            $(".context-menu").hide();
            
            // Make inactive
            let item = this.currentItem;
            if (item) {
                item.style.background = "#252525";
                let id = item.id;
                if (!id) {
                    item = item.parentNode;
                    if (item)
                        item.style.background = "#252525";
                    id = item.id;
                }
            }
            
            // Make this active
            
            this.currentItem = event.target;
    
            // Create/edit contextmenu
            if (type === 'root') {
                document.getElementById("add_folder_id").style.display = "block";
                document.getElementById("add_file_id").style.display = "block";
                document.getElementById("delete_id").style.display = "none";
            }
            else if (type === 'file'){
                document.getElementById("add_folder_id").style.display = "none";
                document.getElementById("add_file_id").style.display = "none";
                document.getElementById("delete_id").style.display = "block";
            } else {
                document.getElementById("add_folder_id").style.display = "block";
                document.getElementById("add_file_id").style.display = "block";
                document.getElementById("delete_id").style.display = "block"
            }

            var contextElement = document.getElementById("context-menu");
            contextElement.style.top = event.pageY + "px";
            contextElement.style.left = event.pageX + "px";
            contextElement.classList.add("active");
            
            $(".context-menu").show();
        });
        
        if (type === 'folder' || type === 'root'){
            item.addEventListener("dblclick", function(event) {
                // Stop propogation of the event to its parents
                event.stopImmediatePropagation();
                item.querySelector(".nested").classList.toggle("active");
                item.querySelector(".caret").classList.toggle("caret-down");
            });  
        }
    };
    

    ctrlAddItem = (type) => {
        let childName = prompt("Insert " + type + " name");
        let parent = this.currentItem; 

        // Add the item to the UI
        ++this.currentId;
        let newListItem = this.view.addListItem(parent, childName, type, this.currentId);
        
        this.setupEventListeners(newListItem, type);

        // Create the file/folder item
        let newItem = (type === 'folder') ? new Folder(childName, this.currentId)
                                          : new File(childName, this.currentId);

        let parentId = parent.id;
        if (!parentId)
            parentId = parent.parentNode.id;
        
        let parentFolder = this.fileModel.findItemById(+parentId);
        if (parentFolder)
        {
            parentFolder.addChild(newItem);
        }
        
    };

    ctrlDeleteItem = () => {
        let item = this.currentItem;

        let itemId = item.id;
        if (!itemId) {
            item = item.parentNode;
            itemId = item.id;
        }
            
        
        let parentItem = item.parentNode;
        let parentId = parentItem.id;
        if (!parentId)
            parentId = parentItem.parentNode.id;
        

        
        let parentFolder = this.fileModel.findItemById(+parentId);
        if (parentFolder)
        {
            parentFolder.removeChild(+itemId);
        }
        
        // remove from the UI
        this.view.deleteListItem(item);

    };

    saveContent(item){
        //Check to undefined
        if (item) {
            item.style.background = "#252525";
            let id = item.id;
            if (!id) {
                item = item.parentNode;
                id = item.id;
            }
            
            item.style.background = "#252525";
        
            let file = this.fileModel.findItemById(+id);
            if (file && file instanceof File)
            {
                let fileContent = document.querySelector(".txtarea").innerText;
                file.saveContent(fileContent);
            }
        }
        
    };

    showContent(item) {
        //Check to undefined
        if (item) {
                        
            item.style.background = "#555";
            let id = item.id;
            if (!id) {
                item = item.parentNode;
                id = item.id;
            }
            
            item.style.background = "#555";
        
            let file = this.fileModel.findItemById(+id);
            if (file /* && file instanceof File*/)
            {
                let fileContent = file.getContent();
                document.querySelector(".txtarea").innerText = fileContent;
            }
        }
       
    };

    ctrlShowContent = () => {
        // save previous file content;
        this.saveContent(this.currentItem);
        
        this.currentItem = event.target;
        //this.currentItem.style.background = 'gray';
        
        this.showContent(this.currentItem);
    };

}

//const root = new Folder();
// TODO: to be changed to module to be a singlton
let explorerView = new ExplorerView();
//let fileModel = new FilesModel();
let explorerController = new ExplorerController(explorerView);
