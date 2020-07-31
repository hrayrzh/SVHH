// Explrer controller class

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

class ExplorerController {
    
    constructor(view) {
                //debugger
        this.currentId = 0;        
        this.fileModel = new FilesModel(new Folder('root', this.currentId));
        document.querySelector(".caret").id = 0;
        this.view = view;
        
        this.setupCustomEventListeners();
        this.setupEventListeners(document.querySelector(".caret"), 'root');

    };
    
    setupCustomEventListeners() {
        document.getElementById("add_folder_id").addEventListener('click', () => {this.ctrlAddItem('folder')});
        document.getElementById("add_file_id").addEventListener('click', () => {this.ctrlAddItem('file')});
        document.getElementById("delete_id").addEventListener('click', () => {this.ctrlDeleteItem()});
        
        document.querySelector(".folders").addEventListener('click', () => {this.ctrlShowContent()});
    };
    
    setupEventListeners(item, type) {
        item.addEventListener('contextmenu', (event) => {
            // Avoid the real one
            event.preventDefault();
            
            this.currentItem = event.target;
    
            // Show contextmenu
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
                document.getElementById("delete_id").style.display = "block";
            }
            $(".custom-menu").finish().toggle(100).
    
            // In the right position (the mouse)
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
        });
        
        // If the document is clicked somewhere
        item.addEventListener("mousedown", function (e) {
    
            // If the clicked element is not the menu
            if (!$(e.target).parents(".custom-menu").length > 0) {
        
                // Hide it
                $(".custom-menu").hide(100);
            }
        });
        
        //document.getElementById("add_folder_id").addEventListener('click', this.ctrlAddItem);
        if (type === 'folder'){
            item.addEventListener("click", function() {
                item.querySelector(".nested").classList.toggle("active");
                item.querySelector(".nested").classList.toggle("caret-down");
            });  
        }
    };
    

    ctrlAddItem = (type) => {

        // Hide it AFTER the action was triggered
        $(".custom-menu").hide(100);

        let childName = prompt("Insert " + type + " name");
        let parent = this.currentItem; 
                        //debugger;
        // Add the item to the UI
        ++this.currentId;
        let newListItem = this.view.addListItem(parent, childName, type, this.currentId);
        
        this.setupEventListeners(newListItem, type);

        // Create the file/folder item
        //?? do we need the newItem? or only name and type?
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
        // Hide it AFTER the action was triggered
        $(".custom-menu").hide(100);
        
        //debugger
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

        //let prevItem = this.currentItem;
        //Check to undefined
        if (item) {
            let id = item.id;
            if (!id) {
                item = item.parentNode;
                id = item.id;
            }
        
            let file = this.fileModel.findItemById(+id);
            if (file && file instanceof File)
            {
                let fileContent = document.querySelector(".txtarea").innerText;
                file.saveContent(fileContent);
            }
        }
        
    };

    showContent(item) {
        if (item) {
            let id = item.id;
            if (!id) {
                item = item.parentNode;
                id = item.id;
            }
        
            let file = this.fileModel.findItemById(+id);
            if (file && file instanceof File)
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
