"use strict";

const IDBRequest = window.indexedDB.open("namedb", 1);

IDBRequest.addEventListener("upgradeneeded", () => {
    const IDBResult = IDBRequest.result;
    IDBResult.createObjectStore("names", {autoIncrement: true});
});

IDBRequest.addEventListener("success", () => {
    loadExistingNames();
});

const addNameButton = document.querySelector("#add-button");
addNameButton.addEventListener("click", () => {
    addNameFromInput();
});

const addNameInput = document.querySelector("#add-input");
addNameInput.addEventListener("keyup", event => {
    if (event.keyCode == 13)
        addNameFromInput();
});

const addNameFromInput = () => {
    const comprobarCambiosGuardados = () => {
        let cambiosGuardados = true;
        [...document.querySelectorAll(".name__save-button")].forEach(item => {
            if (!item.classList.contains("disabled"))
                cambiosGuardados = false;
        });
        return cambiosGuardados;
    }
    if (comprobarCambiosGuardados() || confirm("Perderás los cambios sin guardar ¿Deseas continuar?")) {
        const addNameInput = document.querySelector("#add-input");
        addName(addNameInput.value);
        addNameInput.value = "";
    }
}

const createNameFragment = (id, name, isDisabled) => {
    // HTML Object Creation:
    let nameContainer = document.createElement("DIV");
    let nameTitle = document.createElement("H3");
    let buttonContainer = document.createElement("DIV");
    let buttonSave = document.createElement("BUTTON");
    let buttonDelete = document.createElement("BUTTON");
    // Class initialization:
    nameContainer.classList.add("name");
    nameTitle.classList.add("name__title");
    buttonContainer.classList.add("name__buttons");
    buttonSave.classList.add("name__save-button");
    if (isDisabled)
    buttonSave.classList.add("disabled");
    buttonDelete.classList.add("name__delete-button");
    // Make titles editables:
    nameTitle.setAttribute("contenteditable", "true");
    nameTitle.setAttribute("spellcheck", "false");
    nameTitle.addEventListener("keyup", () => {
        buttonSave.classList.remove("disabled");
    });
    // Save and delete options:
    buttonSave.addEventListener("click", () => {
        if (!buttonSave.classList.contains("disabled")) {
            modifyName(id, nameTitle.textContent);
            buttonSave.classList.add("disabled");
        }
    });
    buttonDelete.addEventListener("click", () => {
        deleteName(id);
        document.querySelector(".name-container").removeChild(nameContainer);
    });
    // Add content:
    buttonSave.innerHTML = "Guardar";
    buttonDelete.innerHTML = "Eliminar";
    nameTitle.innerHTML = name;
    // Fragment assembly:
    buttonContainer.appendChild(buttonSave);
    buttonContainer.appendChild(buttonDelete);
    nameContainer.appendChild(nameTitle);
    nameContainer.appendChild(buttonContainer);
    // Finally, return fragment:
    return nameContainer;
}

const openObjectStore = (objectStoreName, transactionMode) => {
    const IDBResult = IDBRequest.result;
    const IDBTransaction = IDBResult.transaction(objectStoreName, transactionMode);
    const objectStore = IDBTransaction.objectStore(objectStoreName);
    
    return objectStore;
}

const loadExistingNames = () => {
    const objectStore = openObjectStore("names", "readonly");
    
    const fragment = document.createDocumentFragment();
    
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success", () => {
        if (cursor.result) {
            fragment.appendChild(createNameFragment(cursor.result.key, cursor.result.value.fullname, true));
            cursor.result.continue();
        } else {
            document.querySelector(".name-container").appendChild(fragment);
        }
    });
}

const refreshNameList = () => {
    document.querySelector(".name-container").innerHTML = "";
    loadExistingNames();
}

const addName = name => {
    const objectStore = openObjectStore("names", "readwrite");
    objectStore.add({fullname: name});
    refreshNameList();
}

const modifyName = (id, name) => {
    const objectStore = openObjectStore("names", "readwrite");
    objectStore.put({fullname: name}, id);
}

const deleteName = id => {
    const objectStore = openObjectStore("names", "readwrite");
    objectStore.delete(id);
}