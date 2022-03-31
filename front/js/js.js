let arrFor_counts = [];
const addButton = document.getElementById("addSpend");
const outputCont = document.getElementById("refData");
const InputswhereWasSpend = document.querySelectorAll("#calculations input");
const resultSpan = document.getElementById("resultSpan");
window.onload = () => {
  let strFromStorage = sessionStorage.getItem("spendingCount");
  if (strFromStorage) {
    arrFor_counts = JSON.parse(strFromStorage);
    render();
  }
}
addButton.onclick = () => {
  const objConts = {};
  let flag = false;
  InputswhereWasSpend.forEach((element, i) => {
    if (i === 0 && element.value !== "") {
      objConts.text = element.value;
      flag = true;
    } else if (i === 1 && element.value !== "") {
      objConts.number = element.value;
      arrFor_counts.push(objConts);
      console.log(arrFor_counts);
      sessionStorage.setItem("spendingCount", JSON.stringify(arrFor_counts));
      render();
    } else {
      element.classList.add("animate__shakeX", "redBoxSh");
      flag = false;
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
  arrFor_counts.forEach((element, idx) => {
    const { text, number } = element;
    resultSpan.innerText = parseInt(resultSpan.innerText) + parseInt(number);
    const date = new Date();
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
    rData.innerText = date.getDate() + "." + date.getMonth()
      + "." + date.getFullYear();
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
      const wrapForEdit = document.createElement("div");
      const inpForTitle = document.createElement("input");
      const inpForNumValue = document.createElement("input");
      const buttConfirm = document.createElement("button");
      const buttCancelEdit = document.createElement("button");
      wrapForEdit.className = "wrapForEdit dflex";
      inpForTitle.placeholder = "Ведите новое название места";
      inpForTitle.title = "Ведите новое название места";
      inpForTitle.value = text;
      inpForNumValue.placeholder = "Ведите новую сумму";
      inpForNumValue.title = "Ведите новую сумму";
      inpForNumValue.value = number;
      buttConfirm.innerText = "Save";
      buttCancelEdit.innerText = "Cancel";
      wrapForEdit.appendChild(numBList);
      wrapForEdit.appendChild(inpForTitle);
      wrapForEdit.appendChild(inpForNumValue);
      wrapForEdit.appendChild(buttConfirm);
      wrapForEdit.appendChild(buttCancelEdit);
      container.appendChild(wrapForEdit);
      inpForNumValue.focus();
      buttConfirm.onclick = () => {
        saveChanges(inpForTitle.value, inpForNumValue.value, idx);
      }
    }
    imgDelete.onclick = () => {
      delItemOfSpend(idx);
    }
  });
}

const saveChanges = (title, numbr, index) => {
  arrFor_counts[index].text = title;
  arrFor_counts[index].number = numbr;
  resultSpan.innerText = 0;
  sessionStorage.setItem("spendingCount", JSON.stringify(arrFor_counts));
  render();
}

const delItemOfSpend = (index) => {
  arrFor_counts.splice(index, 1);
  render();
}