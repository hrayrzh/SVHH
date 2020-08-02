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

    // EVENT LISTENERS
    ctrlAddItem = (type) => {
        // Hide the context menu
        $(".context-menu").hide();
        
        // Prompt user to set File/Folder name
        let childName = prompt("Insert " + type + " name");

        // Open parent tree
        let parent = this.currentItem;
        parent.querySelector(".caret").classList.add("caret-down");
        
        // Add the item to the UI
        ++this.currentId;
        let newListItem = this.view.addListItem(parent, childName, type, this.currentId);

        // Create the file/folder item
        let newItem = (type === 'folder') ? new Folder(childName, this.currentId)
                                          : new File(childName, this.currentId);

        // Add the item to filesModel
        let parentId = this.getElementId(parent);
        this.fileModel.addChild(parentId, newItem);
        
        // Update current item / add event listeners to it        
        this.changeCurrentItem(newListItem);
        this.setupEventListeners(newListItem, type);
    };

    ctrlDeleteItem = () => {
        // Get the item to be deleted
        let item = this.currentItem;
        let itemId = this.getElementId(item);

        // Get its parent item (id)
        let parentId = this.getElementId(item.parentNode);
        
        // Remove the item from filesModel
        this.fileModel.removeChild(parentId, itemId);

        // Remove from the UI
        this.view.deleteListItem(item);
        
        // Remove tab
        // TODO: remove children tabs
        this.removeTab(itemId);
    };

    ctrlShowContent = () => {
        // Stop propogation of the event to its parents
        event.stopImmediatePropagation();
        
        // save previous file content;
        let prevId = this.getElementId(this.currentItem);
        this.saveContent(prevId);
                
        // Set active current item
        this.changeCurrentItem(event.currentTarget);
        
        // Show current item realed content
        let currId = this.getElementId(this.currentItem);
        this.showContent(currId);
    };

    ctrlShowTabContent = (currId, tabElement) => {
        // Set the selected tab as active one
        this.setActiveTab(currId);

        // Save previous file content;
        let prevId = this.getElementId(this.currentItem);
        this.saveContent(prevId);
        
        // Change the currentItem
        this.changeCurrentItem(document.getElementById(currId));
        
        // Show the specific tab content
        this.showContent(currId);
    };

    // HELPERS
    getElementId(item) {
        // In case of it gets a nested item the dispatched event, get its parents id
        let id;
        if (item) {
            id = item.id;
            if (!id) {
                item = item.parentNode;
                id = item.id;
            }
        }
        return id;
    };

    saveContent(id) {
        this.fileModel.saveContent(id, document.querySelector(".txtarea").innerText);
    };

    showContent(id) {
        //Check to undefined
        if (id) {
            let file = this.fileModel.findItemById(+id);
            if (file && file instanceof File)
            {
                document.querySelector(".txtarea").innerText = file.getContent();
                document.querySelector(".txtarea").contentEditable = "true";
            }
            else {
                document.querySelector(".txtarea").innerText = "";
                document.querySelector(".txtarea").contentEditable = "false";
            }
       }       
    };

    changeCurrentItem(element) {
        // Check to undefined
        if (element) {
            // Save previous file content;
            let prevId = this.getElementId(this.currentItem);
            this.saveContent(prevId);
            
            // Updated currebt element
            this.currentItem = element;
            this.setActiveElement(element);
            
            // Set related active tab
            this.setActiveTab(element.id);
        
            // Show the specific tab content
            this.showContent(element.id);
        }
    };

    setActiveElement(element) {
        // clear all active states
        this.removeExplorerStyles();

        // Set the element as active element
        element.classList.add("item_active");
    };

    setActiveTab(tabId) {
        // Remove all tabs styles/states
        this.removeTabsStyles();
    
        // set selcted tab as active
        if (tabId) {
            let currTab = document.getElementById("tab" + tabId);
            if (currTab) {
                document.getElementById("tab" + tabId).classList.add("item_active");
            }
        }   
    };

    removeTabsStyles() {
        // Hide all elements with tabcontent by default */
        let i;
        let tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Remove the background color of all tablinks/buttons
        let tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            //tablinks[i].style.backgroundColor = "";
            tablinks[i].classList.remove("item_active");
        }        
    };

    removeExplorerStyles() {
        // Remove any active state in explorer view
        let explorer = document.getElementsByTagName("li");
        for (let i = 0; i < explorer.length; i++) {
            explorer[i].classList.remove("item_active");
        }   
    };

    removeTab(tabId) {
        if (tabId) {
            let currTab = document.getElementById("tab" + tabId);
            if (currTab) {
                currTab.parentNode.removeChild(currTab);
            }
        }   
    };
}

function tabClicked(tabId, tabElement) {
    explorerController.ctrlShowTabContent(tabId, tabElement);
}
