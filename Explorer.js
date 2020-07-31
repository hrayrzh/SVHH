const ulElement = document.getElementById('ulElement');
const explorer = document.getElementById('explorer');
const folderList = [];
const fileList = [];

class Folder {
    state = false;
    constructor(name, folders, files) {
        this.name = name;
        this.folders = folders;
        this.files = files;
    }

    createElement(ulElement) {
        const folderNameInput = document.createElement('input');
        folderNameInput.type = 'text';
        folderNameInput.classList.add('folderNameInput');

        folderNameInput.addEventListener('change', () => {
            console.log('folder Input change event');
            this.name = folderNameInput.value;
            const folderLiElement = document.createElement('li');

            ulElement.appendChild(folderLiElement);

            folderLiElement.innerHTML = folderNameInput.value;
            console.log(folderNameInput);
            console.log(folderLiElement)
            validatefolderName(folderLiElement);
            folderNameInput.remove();

            const folderFiles = [];
            const foldersInFolder = [];
            // folderLiElement.addEventListener('click', () => {
            //     // this.state = !this.state;
            //     // if (this.state && document.getElementById('folderImg').onclick) {
            //     //     console.log('clicked')
            //     // }

            //     ///////Add Folder////////////
            //     const folder = new Folder();
            //     const inputElement = folder.createElement(ulElement);
            //     explorer.appendChild(inputElement);
            //     foldersInFolder.push(folder);
            //     this.folders = foldersInFolder;
            // })
            //////////// Add File/////////
            // folderLiElement.addEventListener('contextmenu', () => {
            //     const folderFiles = [];
            //     const file = new File();
            //     const inputElement = file.createElement(ulElement);
            //     explorer.appendChild(inputElement);
            //     folderFiles.push(file);
            //     // console.log(folderFiles);
            //     this.files = folderFiles;
            // })

            folderLiElement.addEventListener('contextmenu', () => {
                editDelete(folderLiElement);
            })
        })
        return folderNameInput
    }

    getName() {
        return this.name
    }

    rename() {

    }
}


class File {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }

    createElement(ulElement) {
        const fileNameInput = document.createElement('input');
        fileNameInput.type = 'text';
        fileNameInput.classList.add('fileNameInput');

        fileNameInput.addEventListener('change', () => {
            console.log('Input change event');
            this.name = fileNameInput.value;
            const fileLiElement = document.createElement('li');

            ulElement.appendChild(fileLiElement);

            fileLiElement.innerHTML = fileNameInput.value;
            validateFileName(fileLiElement);
            fileNameInput.remove();

            fileLiElement.addEventListener('click', function () {
                addTab(fileLiElement.innerHTML);
            })
        })
        return fileNameInput
    }

    getName() {
        return this.name;
    }

    getContent() {
        return this.content
    }

    rename(name) {
        this.name = name;
        //TODO - update element name
    }

    delete(name) {
        fileList = fileList.filter(file => file.name !== name);
    }

    changeContent() { }
}

function editDelete(element) {
    const div = document.createElement('div');
    div.classList.add('dragAndDrop');
    const editElement = document.createElement('button');
    editElement.innerHTML = 'Edit'
    const deleteElement = document.createElement('button');
    deleteElement.innerHTML = 'Delete';

    div.appendChild(editElement);
    div.appendChild(deleteElement);
    element.appendChild(div);

    editElement.addEventListener('click', () => {
        element.contentEditable = true;
        element.addEventListener('dblclick', () => {
            element.contentEditable = false;
            div.remove();
            console.log(element.contentEditable)
        })
    })

    deleteElement.addEventListener('click', () => {
        element.remove();
    })
}

function createFolder() {
    const folder = new Folder();
    const inputElement = folder.createElement(ulElement);
    explorer.appendChild(inputElement);
    folderList.push(folder);
    console.log(folderList);

}

function createFile() {
    const file = new File();
    const inputElement = file.createElement(ulElement);
    explorer.appendChild(inputElement);
    fileList.push(file);
    console.log(fileList);
}

function validateFileName(element) {
    let value = element.innerHTML;
    if (value.endsWith('.html')) {
        element.innerHTML = `<>  ${element.innerHTML}`
        console.log(value);
    }
    else if (value.endsWith('.css')) {
        element.innerHTML = `#  ${element.innerHTML}`
    }
    else if (value.endsWith('.js')) {
        element.innerHTML = `JS  ${element.innerHTML}`
    }
    else if (value.endsWith('.json')) {
        element.innerHTML = `{}  ${element.innerHTML}`
    }
    else {
        alert(value + ' Invalid file name');
        element.remove();
    }
}

function validatefolderName(element) {
    let value = element.innerHTML;
    if (value.includes('.') || value.startsWith('.')
        || value.startsWith('/') || value.startsWith('#')) {
        alert(value + ' Invalid folder name');
        element.remove();
    }
}

// ????///
function renameFileFolder(name) {
    name.addEventListener('contextmenu', function () {
        let editable = document.querySelector('.folderElement');
        console.log(editable);
        editable.onclick = function () {
            editable.setAttribute("contentEditable", true);
            // editable.contentEditable = true;
        }
    })
}

////////// Tabs ////////
const tab = document.querySelector('#tab');

function addTab(fileNameInput) {
    const tabElement = document.createElement('button');
    const closeIcon = document.createElement('img');
    closeIcon.src = 'closeIcon.png';
    tabElement.classList.add('tabLink');
    tabElement.innerHTML = fileNameInput;
    tabElement.addEventListener('click', function () {
        editor('//Your code here');
    })

    tabElement.appendChild(closeIcon);
    tab.appendChild(tabElement);
}
//////////Editor///////////
const editorElem = document.querySelector('#editor');

function editor(content) {
    const editorElement = document.querySelector('.textarea');
    editorElement.innerHTML = content;
    editorElem.appendChild(editorElement);

}
