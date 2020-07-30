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
            //html += '<i class="fa fa-folder"; style="font-size:20px; color:lightgray;"> ' + childName + ' </i> </li>';
        }
        else {
            html = '<li>' + childName + '</li>';
        }
        
        //html = "<li>" + childName + "</li>";
        let newChild = document.createElement('li');
        newChild.innerHTML = html;
        //nested.insertAdjacentHTML('beforeend', html);
        
        nested.appendChild(newChild);
        
        return newChild;
    };
    
    deleteListItem(child) {
        child.parentNode.removeChild(child);
    };
}
