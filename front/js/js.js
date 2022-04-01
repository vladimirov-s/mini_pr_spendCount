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
    const numBList = document.createElement("span");
    const shopName = document.createElement("span");
    const rData = document.createElement("span");
    const summ = document.createElement("span");
    const imgEdit = document.createElement("img");
    const imgDelete = document.createElement("img");
    container.className = "dIgrid item";
    numBList.innerText = idx + 1 + ")";
    shopName.innerText = element.text;
    console.log(typeof date, date);
    if (date) {
    rData.innerText = date;
  } else {
    const newDate = new Date();
    rData.innerText = newDate.getDate() + "." + newDate.getMonth() + "." + newDate.getFullYear();
  }
  summ.innerText = element.number + " p.";
  imgEdit.alt = "";
  imgEdit.title = "Редактировать запись";
  imgEdit.src = "imgs/edit.svg";
  imgDelete.src = "imgs/trash.svg";
  imgDelete.alt = "";
  imgDelete.title = "Удалить запись";
  container.appendChild(numBList);
  container.appendChild(shopName);
  container.appendChild(rData);
  container.appendChild(summ);
  container.appendChild(imgEdit);
  container.appendChild(imgDelete);
  outputCont.appendChild(container);
  imgEdit.onclick = () => {
    const numBListInner = numBList.cloneNode(true);
    const wrapForEdit = document.createElement("div");
    const inpForTitle = document.createElement("input");
    const inpForNumValue = document.createElement("input");
    const inpForDateEdit = document.createElement("input");
    const buttConfirm = document.createElement("button");
    const buttCancelEdit = document.createElement("button");
    wrapForEdit.className = "wrapForEdit dflex";
    inpForTitle.placeholder = "Ведите новое название места";
    inpForTitle.title = "Ведите новое название места";
    inpForTitle.value = text;
    inpForNumValue.placeholder = "Ведите новую сумму";
    inpForNumValue.title = "Ведите новую сумму";
    inpForNumValue.value = number;
    inpForDateEdit.placeholder = "Ведите новую дату";
    inpForDateEdit.title = "Изменить дату";
    inpForDateEdit.value = rData.cloneNode(true).innerText;
    buttConfirm.innerText = "Save";
    buttCancelEdit.innerText = "Cancel";
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