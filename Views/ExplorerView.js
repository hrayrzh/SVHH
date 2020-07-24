// Explrer view class works with explorer UI parts
class ExplorerView {
    addListItem(parent, child, type) {
        let childName = child.name;
        
        
        let html = '<li> ';
        if (type === 'folder') {
            html += '<i class="fa fa-folder"; style="font-size:20px; color:lightgray;"> ' + childName + ' </i> </li>';
        }
        else {
            html += '<i class="fa fa-file"> ' + childName + ' </i> </li>';
        }
        
        parent.insertAdjacentHTML('beforeend', html);
    };
    
    deleteListItem(child) {
        child.parentNode.removeChild(child);
    };
}
