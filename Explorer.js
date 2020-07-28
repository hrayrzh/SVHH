class Folder {
    constructor(name, fileName) {
        this.name = name
        this.fileName = fileName
    }

    getName() {
        createFolder(this.name, this.fileName);
        // createFolder(this.fileName);
    }

    rename() {
        renameFileFolder(this.name)
    }
}


class File {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }

    getName() {
        createFile(this.name)
    }

    getContent() { }

    rename() {
        renameFileFolder(this.name)
    }

    changeContent() { }
}

const explorer = document.getElementById('explorer');
const folderList = [];
const fileList = [];
// function createElem() {
//     const elementName = document.createElement('input');
//     elementName.type = 'text';
//     elementName.classList.add('elementName');
//     explorer.appendChild(elementName);
//     elementName.addEventListener('change', function() {

//         const element = document.createElement('ul');
//         const elementList = document.createElement('li');
//         elementList.id = 'element';
//         elementList.innerHTML = elementName.value;
//         elementName.value = '';
//         elementName.style.display = 'none';

//         element.appendChild(elementList);
//         explorer.appendChild(element);
//     })
// }

function createFolder() {
    const folderName = document.createElement('input');
    folderName.type = 'text';
    explorer.appendChild(folderName);
    folderName.addEventListener('change', function () {
        const folder = document.createElement('ul');
        const folderElement = document.createElement('li');
        folderElement.contenteditable = false;
        folderElement.classList.add('folderElement')
        folderElement.id = 'folder';
        folderElement.innerHTML = folderName.value;
        folderName.value = '';
        folderName.style.display = 'none';
        folder.appendChild(folderElement);
        explorer.appendChild(folder);
        const myFolder = new Folder(folderElement.innerHTML)
        folderList.push(myFolder);
        folderElement.addEventListener('click', function () {
            myFolder.fileName = createFile(myFolder);
            console.log(folderList);
        })
        return folderList
    })
}

function createFile() {
    const fileName = document.createElement('input');
    fileName.type = 'text';
    fileName.classList.add('fileName');
    explorer.appendChild(fileName);
    fileName.addEventListener('change', function () {
        const file = document.createElement('ul');
        const fileElement = document.createElement('li');
        fileElement.id = 'file';
        fileElement.innerHTML = fileName.value;
        const myFile = new File(fileElement.innerHTML);

        fileElement.addEventListener('click', function(){
            addTab(fileElement.innerHTML);
        })

        fileList.push(myFile);
        console.log(fileList);
        fileName.value = '';
        fileName.style.display = 'none';
        file.appendChild(fileElement);
        explorer.appendChild(file);
    })
    return fileList
}

function renameFileFolder(name){
    name.addEventListener('dblclick', function() {
        let editable = document.querySelector('.folderElement');
        console.log(editable);
        editable.onclick = function() {
            editable.setAttribute("contentEditable", true);
            // editable.contentEditable = true;
        }
    })
}

////////// Tabs ////////
const tab = document.querySelector('#tab');

function addTab(fileName){
    const tabElement = document.createElement('button');
    tabElement.classList.add('tabLink');
    tabElement.innerHTML = fileName;
    

    tab.appendChild(tabElement);
}