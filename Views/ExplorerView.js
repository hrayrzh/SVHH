// Explrer view class works with explorer UI parts
class ExplorerView {
    addListItem(parent, child, type) {
        let childName = child.name;
        
        let nested = parent.parentElement.querySelector(".nested");
        nested.classList.add("active");
        parent.classList.add("caret-down");
        
        
        
        let html;
        if (type === 'folder') {
            html = '<span class="caret">' + childName + '</span> <ul class="nested"> </ul>';
        }
        else {
            html = childName;
        }

        let newChild = document.createElement('li');
        newChild.innerHTML = html;        
        nested.appendChild(newChild);
        
        return newChild;
    };
    
    deleteListItem(child) {
        if (child.tagName === 'LI') {
            child.parentNode.removeChild(child);
        }
        else {
            let item = child.parentNode;
            item.parentNode.removeChild(item);
        }
    };
}
