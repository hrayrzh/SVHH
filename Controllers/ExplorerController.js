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
    
    constructor(root, view) {
        this.root = root;
        this.view = view;
        
        this.setupCustomEventListeners();
        this.setupEventListeners(document.querySelector(".caret"));
    };
    
    setupCustomEventListeners() {
        document.getElementById("add_folder_id").addEventListener('click', this.ctrlAddItem);    
    };
    
    setupEventListeners(item) {
        item.addEventListener('contextmenu', (event) => {
            // Avoid the real one
            event.preventDefault();
            
            this.currentItem = event.target;
    
            // Show contextmenu
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
        
        document.getElementById("add_folder_id").addEventListener('click', this.ctrlAddItem);
        
        item.addEventListener("click", function() {
            item.querySelector(".nested").classList.toggle("active");
            item.querySelector(".nested").classList.toggle("caret-down");
        });    
    };
    

    ctrlAddItem = () => {
        let type = 'folder';
        //console.log("add item");
        let childName = prompt("Insert Folder Name");
        let parent = this.currentItem;
        console.log(parent);     

        // Create the file/folder item
        let newItem = (type === 'folder') ? new Folder(childName)
                                          : new File(childName);


        // Add the item to the UI
        let newListItem = this.view.addListItem(parent, newItem, type);
        
        // Hide it AFTER the action was triggered
        $(".custom-menu").hide(100);
        

        this.setupEventListeners(newListItem);
    };

    ctrlDeleteItem = (event/*, childName, type*/) => {
        let item = event.target;
        
        // TODO: remove from parent's childList
        

        // remove from the UI
        this.view.deleteListItem(item);
    };
}

const root = new Folder();
// TODO: to be changed to module to be a singlton
let explorerView = new ExplorerView();
let explorerController = new ExplorerController(root, explorerView);
