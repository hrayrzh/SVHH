//class File {
//  constructor() {
//		this.content = '';
//  }
//  setContent(content) {
//		this.content = content;
//	}
//	getContent() {
//		return this.content;
//	}
//}
//
//class Folder {
//  constructor() {
//		this.childs = {};
//  }
//	addChild(name, child) {
//		this.childs = {
//			...this.childs,
//			[name]: child,
//		};
//	}
//	removeChild(name) {
//		detlet this.childs[name];
//	}
//	getChilds() {
//		return this.childs;
//	}
//}

const generateRandomID = () => Math.random().toString(36).substring(7);


const path = {
		"bbbb.js": generateRandomID(),
		"index.html": generateRandomID(),
		"style.css": generateRandomID(),
		"aaaa.js": generateRandomID(),
		"New Folder": {
			"aaasaa.js": generateRandomID(),
			"index.js": generateRandomID(),
		},
		"New Folder1": {
			"aaasasaa.js": generateRandomID(),
			"inasdex.html": generateRandomID(),
			"New Folder": {
				"aaasdasaa.js": generateRandomID(),
				"inasddex.html": generateRandomID(),
			},
		},
};

const separateFilesFolders = folder => {
	let folders = {};
	let files = {};
	if (folder) {
		Object.keys(folder).forEach(key => {
			if (typeof folder[key] === 'string') {
				files = {
					...files,
					[key]: folder[key],
				};
			} else {
				folders = {
					...folders,
					[key]: folder[key],
				};
			}
		});
	}
	return [folders, files];
};

const getFileType = fileName => {
	const parts = (fileName || []).split('.');
	return parts[parts.length - 1];
};

//const folder = document.getElementById('folders');
const root = document.getElementById('root');


function createFile(fileName){
	let li = document.createElement("li");
		if(getFileType(fileName) === "js"){
			li.innerHTML = 
				`<div>
					<span>
						<img src="./img/png/001-js.png" alt="">
						<span>${fileName}</span>
					</span>
					<span>
						<img src="./img/png/004-edit.png" alt="" class ="edit">
						<img src="./img/png/005-trash.png" alt="" class ="trash">
					</span>
				</div>`;
		}else if(getFileType(fileName) === "css"){
			li.innerHTML =
				`<div>
					<span>
						<img src="./img/png/002-css.png" alt="">
						<span>${fileName}</span>
					</span>
					<span>
						<img src="./img/png/004-edit.png" alt="" class ="edit">
						<img src="./img/png/005-trash.png" alt="" class ="trash">
					</span>
				</div>`;
		}else if(getFileType(fileName) === "html"){
			li.innerHTML =
				`<div>
					<span>
						<img src="./img/png/003-html.png" alt="">
						<span>${fileName}</span>
					</span>
					<span>
						<img src="./img/png/004-edit.png" alt="" class ="edit">
						<img src="./img/png/005-trash.png" alt="" class ="trash">
					</span>
				</div>`;
		}else{
			li.innerHTML =
				`<div>
					<span>
						<img src="./img/png/003-html.png" alt="">
						<span>${fileName}.js</span>
					</span>
					<span>
						<img src="./img/png/004-edit.png" alt="" class ="edit">
						<img src="./img/png/005-trash.png" alt="" class ="trash">
					</span>
				</div>`;
		}
	return li;
}

function createFoledr(folderName){
	let li = document.createElement("li");
		li.innerHTML = 
				`<div>
					<span>
						<img src="./img/png/openfolder.png" alt="" class="folderBranch">
						<img src="./img/png/025-folder.png" alt="">
						<span>${folderName}</span>
					</span>
					<span>
						<img src="./img/png/024-add.png" title="create new folder" class ="createfolder">
						<img src="./img/png/023-new.png" title="create new file" class ="createfile">
						<img src="./img/png/004-edit.png" title="Edit NamedNodeMap" class ="edit">
						<img src="./img/png/005-trash.png" title="Remove" class ="trash">
					</span>
				</div>`;
	return li;
}

function startRootIterator(foldersAndFiles, root, way){
root.innerHTML=`<img src="./img/png/024-add.png" title="create new folder" class ="createfolder">
						<img src="./img/png/023-new.png" title="create new file" class ="createfile">`;
	fileIterator(foldersAndFiles, root, way);
	let createFileIcons = document.getElementsByClassName("createfile");

	for (let item of createFileIcons) {
		item.addEventListener("click", e => {
			const way = e.target.parentElement.parentElement.parentElement.getAttribute("data");
			
			let name = prompt("Please enter file name");
			if(checkFolderName(path).includes(name)){
				let name = prompt("Please enter non-existent file name");
				alert('Please try one more time and enter non-existent file name')
			}else{
				console.log(`${way}.${name}`);
				_.set(path, `${way}.${name}`, generateRandomID())
				startRootIterator(path, root, []);
			}
		})
	}
	
	let createFolderIcons = document.getElementsByClassName("createfolder");	
		for (let item of createFolderIcons) {
		item.addEventListener("click", e => {
			const way = e.target.parentElement.parentElement.parentElement.getAttribute("data");
			console.log(e);
			let name = prompt("Please enter folder name");
				_.set(path, `${way}.${name}`, {})
				startRootIterator(path, root, []);
		})
	}
	
	
	
	let arrow = document.getElementsByClassName("folderBranch");

	for (let item of arrow) {	
			let ul = item.parentElement.parentElement.parentElement.lastChild;
		item.addEventListener("click", () => {
			if (item.className.includes('closed')){
				item.classList.remove('closed');
				ul.style.display = "block";
			}else{
				item.classList.add('closed');
				ul.style.display = "none";
			}
		});
	}
	
}

function fileIterator(foldersAndFiles, root, way){	
	const [folders, files] = separateFilesFolders(foldersAndFiles);
	
	Object.keys(folders).forEach(folderName => {
		way.push(folderName);
		let ul = document.createElement("ul");
		let li = createFoledr(folderName);
		li.setAttribute("data", way.join("."));
		li.appendChild(ul);
		fileIterator(folders[folderName], ul, way);
		root.appendChild(li);
		way = [];
	});
	
	Object.keys(files).forEach(fileName => {
		root.appendChild(createFile(fileName));
	});
	

}

startRootIterator(path, root, []);







let allFolders = [];

function checkFolderName(path){
	let [folders, files] = separateFilesFolders(path);
	let arr = Object.keys(folders);
	allFolders = [...allFolders, ...arr];
	for(let i of arr){
		let z = checkFolderName(checkFolderName(folders[i]));
	}
	return allFolders;
}




