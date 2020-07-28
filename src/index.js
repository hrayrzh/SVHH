class Folder{
	constructor(){
		this.name = name;
		
	}
	
	create(name="folder"){
		let create = document.createElement("ul");
		create.innerHTML += `
						<img src="./img/png/openfolder.png" alt="" class="folderBranch">
						<img src="./img/png/025-folder.png" alt="">
						${name}
						<img src="./img/png/005-trash.png" alt="" class ="editandtrash">
						<img src="./img/png/004-edit.png" alt="" class ="editandtrash">`;
		return create;
	}
	
	remove(){
		
	}
	
	
}

