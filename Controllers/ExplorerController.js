// Explrer controller class
class ExplorerController {    
    constructor(view) {
        this.currentId = 0;        
        this.fileModel = new FilesModel(new Folder('root', this.currentId));
        this.view = view;
        
        this.setupCustomEventListeners();
        this.setupEventListeners( document.getElementById("0"), 'root');
        
        this.contextMenuOffset = 100;
        this.bgColor = "#141414";
    };
    
    setupCustomEventListeners() {
        document.getElementById("add_folder_id").addEventListener('click', () => {this.ctrlAddItem('folder')});
        document.getElementById("add_file_id").addEventListener('click', () => {this.ctrlAddItem('file')});
        document.getElementById("delete_id").addEventListener('click', () => {this.ctrlDeleteItem()});
        
        // If the document is clicked somewhere
        window.addEventListener("click",function(){
            document.getElementById("context-menu").classList.remove("active");
        });
    };
    
    setupEventListeners(item, type) {
        item.addEventListener('contextmenu', (event) => {
            // Avoid the real one
            event.preventDefault();
            
            // Stop propogation of the event to its parents
            event.stopImmediatePropagation();
            $(".context-menu").hide();
            
            // Make this active
            this.changeCurrentItem(event.currentTarget);
    
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
            contextElement.style.top = event.pageY - this.contextMenuOffset + "px";
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
        
        item.addEventListener('click', () => {this.ctrlShowContent()}); 
    };
    
    changeCurrentItem(element) {
        if (element) {
            // Save previous file content;
            let prevId = this.getElementId(this.currentItem);
            this.saveContent(prevId);
            
            this.currentItem = element;
            this.setActiveElement(element);
            
            this.setActiveTab(element.id);
        
            // Show the specific tab content
            this.showContent(element.id);
        }
    }

    ctrlAddItem = (type) => {
        let childName = prompt("Insert " + type + " name");
        let parent = this.currentItem; 

        // Open parent tree
        parent.querySelector(".caret").classList.add("caret-down");
        
        // Add the item to the UI
        ++this.currentId;
        let newListItem = this.view.addListItem(parent, childName, type, this.currentId);

        //this.changeCurrentItem(newListItem);
        //this.setupEventListeners(newListItem, type);

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
        
        this.changeCurrentItem(newListItem);
        this.setupEventListeners(newListItem, type);
        
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
        
        // remove tab
        this.removeTab(itemId);
    };

    saveContent(id){
        //Check to undefined
        if (id) {
            let file = this.fileModel.findItemById(+id);
            if (file && file instanceof File)
            {
                let fileContent = document.querySelector(".txtarea").innerText;
                file.saveContent(fileContent);
            }
        }        
    };

    getElementId(item) {
        //???
        let id;
        if (item) {
            id = item.id;
            if (!id) {
                item = item.parentNode;
                id = item.id;
            }
        }
        return id;
    }


    showContent(id) {
        //Check to undefined
        if (id) {
            let file = this.fileModel.findItemById(+id);
            if (file && file instanceof File)
            {
                let fileContent = file.getContent();
                document.querySelector(".txtarea").innerText = fileContent;
                document.querySelector(".txtarea").contentEditable = "true";
            }
            else {
                document.querySelector(".txtarea").innerText = "";
                document.querySelector(".txtarea").contentEditable = "false";
            }
       }       
    };

    ctrlShowContent = () => {
        event.stopImmediatePropagation();
        
        // save previous file content;
        let prevId = this.getElementId(this.currentItem);
        this.saveContent(prevId);
                
        // Set active current item
        this.changeCurrentItem(event.currentTarget);
        
        let currId = this.getElementId(this.currentItem);
        this.showContent(currId);
    };

    removeTabsStyles() {
        // Hide all elements with class="tabcontent" by default */
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            //tablinks[i].style.backgroundColor = "";
            tablinks[i].classList.remove("item_active");
        }        
    }

    removeExplorerStyles() {
        // Remove any active state in explorer view
        let explorer = document.getElementsByTagName("li");
        for (let i = 0; i < explorer.length; i++) {
            explorer[i].classList.remove("item_active");
        }   
    }

    ctrlShowTabContent = (currId, tabElement) => {
        this.setActiveTab(currId);
        // Reset the tabs states/styles
        //this.removeTabsStyles();
        
        // Add the specific color to the button used to open the tab content
        //tabElement.style.backgroundColor = this.bgColor;

        // Save previous file content;
        let prevId = this.getElementId(this.currentItem);
        this.saveContent(prevId);
        
        // Change the currentItem
        this.changeCurrentItem(document.getElementById(currId));
        
        // Show the specific tab content
        this.showContent(currId);
    };

    setActiveElement(element) {
        // clear all active states
        this.removeExplorerStyles();
        // Set the element as active element
        element.classList.add("item_active");
        
        //this.setActiveTab(this.getElementId(element));
    }

    setActiveTab(tabId) {
        this.removeTabsStyles();
        if (tabId) {
            let currTab = document.getElementById("tab" + tabId);
            if (currTab) {
                document.getElementById("tab" + tabId).classList.add("item_active");
                //this.ctrlShowTabContent(tabId, currTab);
            }
        }   
    }

    removeTab(tabId) {
        if (tabId) {
            let currTab = document.getElementById("tab" + tabId);
            if (currTab) {
                currTab.parentNode.removeChild(currTab);
            }
        }   
    }
}

function tabClicked(tabId, tabElement) {
    explorerController.ctrlShowTabContent(tabId, tabElement);
}

//const root = new Folder();
// TODO: to be changed to module to be a singlton
let explorerView = new ExplorerView();
//let fileModel = new FilesModel();
let explorerController = new ExplorerController(explorerView);
