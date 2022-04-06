let arrForCounts = [];
const addButton = document.getElementById("addSpend");
const outputCont = document.getElementById("refData");
const InputswhereWasSpend = document.querySelectorAll("#calculations input");
const resultSpan = document.getElementById("resultSpan");
const url = "http://localhost:2009";
window.onload = async () => {
  const respons = await fetch(`${url}/getCounts`, {
    method: "GET"
  });
  let result = await respons.json();
  arrForCounts = result.data;
  render();
}

addButton.onclick = () => {
  const objConts = {};
  let flag = true;
  InputswhereWasSpend.forEach((element, i) => {
    if (element.value && flag) {
      if (i === 0) {
        objConts.title = element.value;
      } else if (i == 1) {
        objConts.count = element.value;
        const newDate = new Date();
        objConts.date = newDate.getDate() + "." + newDate.getMonth() + "." + newDate.getFullYear();
        createOneCount(objConts);
      }
    } else {
      flag = false;
    }
  });
}
const createOneCount = async (objConts) => {
  const responce = await fetch(`${url}/createCount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(objConts)
  })
  let result = await responce.json();
  arrForCounts = result.data;
  render();
}

const render = () => {
  InputswhereWasSpend.forEach(element => {
    element.value = "";
  });
  outputCont.innerHTML = "";
  resultSpan.innerText = 0;
  arrForCounts.map((element, idx) => {
    const { title, count, date, _id } = element;
    resultSpan.innerText = parseInt(resultSpan.innerText) + parseInt(count);
    const container = document.createElement("div");
    container.className = "dIgrid item";
    container.id = `container-${idx + 1}`;
    const numBList = document.createElement("span");
    numBList.innerText = idx + 1 + ")";
    numBList.className = "counter";
    numBList.id = `numBList-${idx + 1}`;
    container.appendChild(numBList);
    const shopName = document.createElement("span");
    shopName.innerText = title
    shopName.className = "shopName";
    shopName.id = `shopName-${idx + 1}`;
    container.appendChild(shopName);
    const rData = document.createElement("span");
    rData.className = "date";
    rData.title = "Дата";
    rData.id = `rData-${idx + 1}`;
    container.appendChild(rData);
    const summ = document.createElement("span");
    summ.className = "countNum";
    summ.innerText = element.count + " p.";
    summ.id = `summ-${idx + 1}`;
    container.appendChild(summ);
    const wrapForControl = document.createElement("div");
    wrapForControl.className = "controlItems dflex";
    wrapForControl.id = `wrapForControl-${idx + 1}`;
    container.appendChild(wrapForControl);
    const imgEdit = document.createElement("img");
    imgEdit.alt = "";
    imgEdit.title = "Редактировать запись";
    imgEdit.src = "imgs/edit.svg";
    imgEdit.className = "imgEdit";
    imgEdit.id = `imgEdit-${idx + 1}`;
    wrapForControl.appendChild(imgEdit);
    const imgDelete = document.createElement("img");
    imgDelete.src = "imgs/trash.svg";
    imgDelete.alt = "";
    imgDelete.title = "Удалить запись";
    imgDelete.className = "imgDelete";
    imgDelete.id = `imgDelete-${idx + 1}`;
    rData.innerText = date;
    wrapForControl.appendChild(imgDelete);
    outputCont.appendChild(container);
    imgEdit.onclick = () => {
      imgEditOnclick(numBList, title, count, rData, container, _id, idx);

    }
    imgDelete.onclick = () => {
      delItemOfSpend(element);
    }
  });
}
const imgEditOnclick = (numBList, title, count, rData, container, id, idx) => {
  const numBListInner = numBList.cloneNode(true);
  const wrapForEdit = document.createElement("div");
  wrapForEdit.className = "wrapForEdit dflex";
  wrapForEdit.appendChild(numBListInner);
  const inpForTitle = document.createElement("input");
  inpForTitle.placeholder = "Ведите новое название места";
  inpForTitle.title = "Ведите новое название места";
  inpForTitle.value = title;
  inpForTitle.className = "inpForTitle";
  wrapForEdit.appendChild(inpForTitle);
  wrapForEdit.appendChild(inpForTitle);
  const inpForDateEdit = document.createElement("input");
  inpForDateEdit.placeholder = "Ведите новую дату";
  inpForDateEdit.title = "Изменить дату";
  inpForDateEdit.value = rData.cloneNode(true).innerText;
  inpForDateEdit.className = "inpForDateEdit";
  wrapForEdit.appendChild(inpForDateEdit);
  const inpForNumValue = document.createElement("input");
  inpForNumValue.placeholder = "Ведите новую сумму";
  inpForNumValue.title = "Ведите новую сумму";
  inpForNumValue.value = count;
  inpForNumValue.className = "inpForNumValue";
  wrapForEdit.appendChild(inpForNumValue);
  const buttConfirm = document.createElement("button");
  buttConfirm.innerText = "Save";
  buttConfirm.localName = "buttConfirm";
  wrapForEdit.appendChild(buttConfirm);
  const buttCancelEdit = document.createElement("button");
  buttCancelEdit.innerText = "Cancel";
  buttCancelEdit.className = "buttCancelEdit";
  wrapForEdit.appendChild(buttCancelEdit);
  container.appendChild(wrapForEdit);
  inpForNumValue.focus();
  buttConfirm.onclick = () => {
    arrForCounts[idx].date = inpForDateEdit.value;
    arrForCounts[idx].count = inpForNumValue.value;
    arrForCounts[idx].title = inpForTitle.value;
    saveChanges(idx);
  }
  buttCancelEdit.onclick = () => {
    container.removeChild(wrapForEdit);
  }
}

const saveChanges = async (id) => {
  const responce = await fetch(`${url}/updateCont`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      _id: arrForCounts[id]._id,
      title: arrForCounts[id].title,
      count: arrForCounts[id].count,
      date: arrForCounts[id].date
    })
  });
  let result = await responce.json();
  arrForCounts = result.data;
  render();
}

const delItemOfSpend = async (elem) => {
  const responce = await fetch(`${url}/delOne?id=${elem._id}`, {
    method: "DELETE"
  });
  const result = await responce.json();
  arrForCounts = result.data;
  render();
}
