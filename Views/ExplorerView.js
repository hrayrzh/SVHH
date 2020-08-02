// Explrer view class works with explorer UI parts
class ExplorerView {
    addListItem(parent, childName, type, id) {
        // Make nested item active
        let nested = parent.parentElement.querySelector(".nested");
        if (nested)
            nested.classList.add("active");        
        
        // Create html text for element type
        let html;
        if (type === 'folder') {
            html = '<span class="caret"> <img src = "Images/folder.png"> ' + childName + '</span> <ul class="nested"> </ul>';
        }
        else {
            //Add a tab item for files only
            let tabHtml = '<button class="tablink" id="tab' + id + '" onclick="tabClicked(' + id + ', this)">' + childName + '</button>';
            document.getElementById("tabarea").insertAdjacentHTML('beforeend', tabHtml);
            
            html = '<span class="file"> <img src = "Images/file.png" alt> ' + childName + '</span>';
        }

        // Add newly created element as li
        let newChild = document.createElement('li');
        newChild.innerHTML = html;
        newChild.id = id;
        nested.appendChild(newChild);

        return newChild;
    };
    
    deleteListItem(child) {
        // Get parent node and remove from it
        if (child.tagName === 'LI') {
            child.parentNode.removeChild(child);
        }
        else {
            let item = child.parentNode;
            item.parentNode.removeChild(item);
        }
    };
}
