let arrForCounts = [];
const addButton = document.getElementById("addSpend");
const outputCont = document.getElementById("refData");
const InputswhereWasSpend = document.querySelectorAll("#calculations input");
const resultSpan = document.getElementById("resultSpan");
window.onload = () => {
  let strFromStorage = sessionStorage.getItem("spendingCount");
  if (strFromStorage) {
    arrForCounts = JSON.parse(strFromStorage);
    render();
  }
}
addButton.onclick = () => {
  const objConts = {};
  InputswhereWasSpend.forEach((element, i) => {
    if (i === 0 && element.value !== "") {
      objConts.text = element.value;
    } else if (i === 1 && element.value !== "") {
      objConts.number = element.value;
      arrForCounts.push(objConts);
      sessionStorage.setItem("spendingCount", JSON.stringify(arrForCounts));
      render();
    } else {
      element.classList.add("animate__shakeX", "redBoxSh");
    }
  });
}
InputswhereWasSpend.forEach(element => {
  element.onkeyup = () => {
    element.classList.remove("animate__shakeX", "redBoxSh");
  }
});
const render = () => {
  outputCont.innerHTML = "";
  resultSpan.innerText = 0;
  arrForCounts.forEach((element, idx) => {
    const { text, number, date } = element;
    resultSpan.innerText = parseInt(resultSpan.innerText) + parseInt(number);
    const container = document.createElement("div");
    container.className = "dIgrid item";
    const numBList = document.createElement("span");
    numBList.innerText = idx + 1 + ")";
    numBList.className = "counter";
    const shopName = document.createElement("span");
    shopName.innerText = element.text;
    shopName.className = "shopName";
    const rData = document.createElement("span");
    rData.className = "date";
    const summ = document.createElement("span");
    summ.className = "countNum";
    summ.innerText = element.number + " p.";
    const wrapForControl = document.createElement("div");
    wrapForControl.className = "controlItems dflex";
    const imgEdit = document.createElement("img");
    imgEdit.alt = "";
    imgEdit.title = "Редактировать запись";
    imgEdit.src = "imgs/edit.svg";
    imgEdit.className = "imgEdit";
    const imgDelete = document.createElement("img");
    imgDelete.src = "imgs/trash.svg";
    imgDelete.alt = "";
    imgDelete.title = "Удалить запись";
    imgDelete.className = "imgDelete";
    if (date) {
      rData.innerText = date;
    } else {
      const newDate = new Date();
      rData.innerText = newDate.getDate() + "." + newDate.getMonth() + "." + newDate.getFullYear();
    }
    container.appendChild(numBList);
    container.appendChild(shopName);
    container.appendChild(rData);
    container.appendChild(summ);
    wrapForControl.appendChild(imgEdit);
    wrapForControl.appendChild(imgDelete);
    container.appendChild(wrapForControl);
    outputCont.appendChild(container);
    imgEdit.onclick = () => {
      const numBListInner = numBList.cloneNode(true);
      const wrapForEdit = document.createElement("div");
      wrapForEdit.className = "wrapForEdit dflex";
      const inpForTitle = document.createElement("input");
      inpForTitle.placeholder = "Ведите новое название места";
      inpForTitle.title = "Ведите новое название места";
      inpForTitle.value = text;
      inpForTitle.className = "inpForTitle";
      const inpForNumValue = document.createElement("input");
      inpForNumValue.placeholder = "Ведите новую сумму";
      inpForNumValue.title = "Ведите новую сумму";
      inpForNumValue.value = number;
      inpForNumValue.className = "inpForNumValue";
      const inpForDateEdit = document.createElement("input");
      inpForDateEdit.placeholder = "Ведите новую дату";
      inpForDateEdit.title = "Изменить дату";
      inpForDateEdit.value = rData.cloneNode(true).innerText;
      inpForDateEdit.className = "inpForDateEdit";
      const buttConfirm = document.createElement("button");
      buttConfirm.innerText = "Save";
      buttConfirm.localName = "buttConfirm";
      const buttCancelEdit = document.createElement("button");
      buttCancelEdit.innerText = "Cancel";
      buttCancelEdit.className = "buttCancelEdit";
      wrapForEdit.appendChild(numBListInner);
      wrapForEdit.appendChild(inpForTitle);
      wrapForEdit.appendChild(inpForNumValue);
      wrapForEdit.appendChild(inpForDateEdit);
      wrapForEdit.appendChild(buttConfirm);
      wrapForEdit.appendChild(buttCancelEdit);
      container.appendChild(wrapForEdit);
      inpForNumValue.focus();
      buttConfirm.onclick = () => {
        saveChanges(inpForTitle.value, inpForNumValue.value, idx, inpForDateEdit.value);
      }
      buttCancelEdit.onclick = () => {
        container.removeChild(wrapForEdit);
      }
    }
    imgDelete.onclick = () => {
      delItemOfSpend(idx);
    }
  });
}

const saveChanges = (title, numbr, index, date) => {
  arrForCounts[index].text = title;
  arrForCounts[index].number = numbr;
  arrForCounts[index].date = date;
  sessionStorage.setItem("spendingCount", JSON.stringify(arrForCounts));
  render();
}

const delItemOfSpend = (index) => {
  arrForCounts.splice(index, 1);
  render();
}