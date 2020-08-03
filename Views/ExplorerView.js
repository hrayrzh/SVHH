const icons = {
	js: "./img/png/001-js.png",
	css: "./img/png/002-css.png",
	html: "./img/png/003-html.png",
	json: "./img/png/006-json.png",
	txt: "./img/png/007-txt.png",
}

function createFile(fileName, id) {

	const getFileType = fileName => {
		const parts = (fileName || []).split('.');
		return parts[parts.length - 1];
	};

	if (!icons[getFileType(fileName)]) {
		fileName += ".txt"
	}

	let li = document.createElement("li");

	const iconSrc = icons[getFileType(fileName)];

	li.innerHTML =
		`<span class="file"> <img src = "${iconSrc}"> ${fileName}</span>`;

	let tabHtml = `<button class="tablink" id="tab${id}" onclick="tabClicked(${id}, this)">
									<img src = "${iconSrc}">
									${fileName}
								</button>`;

	return [tabHtml, li];
}

function createFoledr(folderName) {
	let li = document.createElement("li");
	li.innerHTML =
		`<span class="caret"> <img src = "./img/png/025-folder.png"> ${folderName}</span> <ul class="nested"> </ul>`;
	return li;
}


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
			html = createFoledr(childName);
		} else {
			//Add a tab item for files only
			let [tabHtml, li] = createFile(childName, id);
			document.getElementById("tabarea").insertAdjacentHTML('beforeend', tabHtml);
			console.log(li);
			html = li;
		}

		// Add newly created element as li
		let newChild = html;
		newChild.id = id;
		nested.appendChild(newChild);

		return newChild;
	};

	deleteListItem(child) {
		// Get parent node and remove from it
		if (child.tagName === 'LI') {
			child.parentNode.removeChild(child);
		} else {
			let item = child.parentNode;
			item.parentNode.removeChild(item);
		}
	};
}
