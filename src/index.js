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
	const parts = fileName.split('.');
	return parts[parts.length - 1];
};

//const folder = document.getElementById('folders');
const root = document.getElementById('root');



function fileIterator(foldersAndFiles, root){	
	const [folders, files] = separateFilesFolders(foldersAndFiles);

		Object.keys(folders).forEach(folderName => {
		let li = document.createElement("li");
		let ul = document.createElement("ul");
		
		li.innerHTML = 
				`<img src="./img/png/openfolder.png" alt="" class="folderBranch">
				<img src="./img/png/025-folder.png" alt="">
				<span><span>${folderName}</span>
				<img src="./img/png/005-trash.png" alt="" class ="trash">
				<img src="./img/png/004-edit.png" alt="" class ="edit">
				</span>`;
		li.appendChild(ul);
		fileIterator(folders[folderName], ul);
		root.appendChild(li);
	});
	
	Object.keys(files).forEach(fileName => {
		let li = document.createElement("li");
//		console.log(getFileType(fileName));
		
		if(getFileType(fileName) === "js"){
			li.innerHTML = `<span><img src="./img/png/001-js.png" alt="">`;
		}else if(getFileType(fileName) === "css"){
			li.innerHTML = `<span><img src="./img/png/002-css.png" alt="">`;
		}else if(getFileType(fileName) === "html"){
			li.innerHTML = `<span><img src="./img/png/003-html.png" alt="">`;
		}
		li.innerHTML += 
			`<span>${fileName}</span>
			<img src="./img/png/005-trash.png" alt="" class ="trash">
			<img src="./img/png/004-edit.png" alt="" class ="edit"></span>`;
		root.appendChild(li);
	});
	

}
fileIterator(path, root);




let arrow = document.getElementsByClassName("folderBranch");

	for (let item of arrow) {	
		item.addEventListener("click", () => {
			if (item.className.includes('closed')){
				item.classList.remove('closed');
				item.parentElement.lastChild.style.display = "block";
			}else{
				item.classList.add('closed');
				item.parentElement.lastChild.style.display = "none";
			}
		});
	}


let editButtons = document.getElementsByClassName("edit");
console.log(editButtons[0].parentElement.parentElement);


	for (let item of editButtons) {
		item.addEventListener("click", () => {
			let span = item.parentElement.children;
			for(let i of span){
				i.style.display="none";
			}
			let a = document.createElement("span");
			let b = document.createElement("input");
			let c = document.createElement("button");
			a.appendChild(b);
			a.appendChild(c);
			item.parentElement.appendChild(a);
		});
	}



//function rename(foldersAndFiles){
//	const [folders, files] = separateFilesFolders(foldersAndFiles);
//	console.log(this);
//	console.log(document.getElementsByClassName("folderBranch"));
//}

//rename(path);
