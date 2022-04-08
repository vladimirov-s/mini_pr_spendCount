let arrForCounts = [];
const addButton = document.getElementById("addSpend");
const outputCont = document.getElementById("refData");
const inputswhereWasSpend = document.querySelectorAll("#calculations input");
const resultSpan = document.getElementById("resultSpan");
const udalyator = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"/></svg>';
const editor = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"/></svg>';
const header = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*"
};
const url = "http://localhost:2009";
window.onload = async () => {
  const respons = await fetch(`${url}/getCounts`, {
    method: "GET"
  });
  const result = await respons.json();
  arrForCounts = result.data;
  render();
}

addButton.onclick = () => {
  const objConts = {};
  let flag = true;
  inputswhereWasSpend.forEach((element, i) => {
    if (element.value && flag) {
      if (i === 0) {
        objConts.title = element.value;
      } else if (i == 1) {
        objConts.count = element.value;
        const newDate = new Date();
        objConts.date = newDate.getDate() + "." + (newDate.getMonth() + 1) + "." + newDate.getFullYear();
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
    headers: header,
    body: JSON.stringify(objConts)
  })
  const result = await responce.json();
  arrForCounts = result.data;
  render();
}

const render = () => {
  inputswhereWasSpend.forEach(element => {
    element.value = "";
  });
  outputCont.innerHTML = "";
  resultSpan.innerText = 0;
  arrForCounts.forEach((element, idx) => {
    const { title, count, date, _id } = element;
    resultSpan.innerText = parseInt(resultSpan.innerText) + parseInt(count);
    const container = createSomeElement("div", false, false, "dIgrid item", `container-${idx + 1}`);
    const numBList = createSomeElement("span", false, idx + 1 + ")", "counter", `numBList-${idx + 1}`);
    container.appendChild(numBList);
    const shopName = createSomeElement("span", title, title, "shopName", `shopName-${idx + 1}`);
    container.appendChild(shopName);
    const rDate = createSomeElement("span", "Дата", false, "Дата", `rDate-${idx + 1}`);
    container.appendChild(rDate);
    const summ = createSomeElement("span", false, element.count + " p.", "countNum", `summ-${idx + 1}`);
    container.appendChild(summ);
    const wrapForControl = createSomeElement("div", false, false, "controlItems dflex", `wrapForControl-${idx + 1}`);
    container.appendChild(wrapForControl);
    const imgEdit = createSomeElement("i", false, false, "imgEdit", `imgEdit-${idx + 1}`, editor);
    wrapForControl.appendChild(imgEdit);
    const imgDelete = createSomeElement("i", false, false, "imgDelete", `imgDelete-${idx + 1}`, udalyator);
    rDate.innerText = date;
    wrapForControl.appendChild(imgDelete);
    outputCont.appendChild(container);
    imgEdit.onclick = () => {
      imgEditOnclick(numBList, title, count, rDate, container, _id, idx);
    }
    imgDelete.onclick = () => {
      delItemOfSpend(element);
    }
  });
}
const imgEditOnclick = (numBList, title, count, rDate, container, id, idx) => {
  const numBListInner = numBList.cloneNode(true);
  const wrapForEdit = createSomeElement("div", false, false, "wrapForEdit dflex", false, false);
  wrapForEdit.appendChild(numBListInner);
  const inpForTitle = createSomeElement("input", "Ведите новое название места",
    false, "inpForTitle", false, false, "Ведите новое название места", title);
  wrapForEdit.appendChild(inpForTitle);
  const inpForDateEdit = createSomeElement("input", "Изменить дату", false, "inpForDateEdit",
    false, false, "Ведите новую дату", rDate.cloneNode(true).innerText);
  wrapForEdit.appendChild(inpForDateEdit);
  const inpForNumValue = createSomeElement("input", false, "Ведите новую сумму", "inpForNumValue",
    false, false, "Ведите новую сумму", count);
  wrapForEdit.appendChild(inpForNumValue);
  const buttConfirm = createSomeElement("button", false, "Save", "buttConfirm", false, false, false);
  wrapForEdit.appendChild(buttConfirm);
  const buttCancelEdit = createSomeElement("button", false, "Cancel", "buttCancelEdit");
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
const createSomeElement = (tag, title, text, classes, iDs, inerhtml, plchldr, val) => {
  const newElement = document.createElement(tag);
  title ? newElement.title = title : false;
  classes ? newElement.className = classes : false;
  iDs ? newElement.id = iDs : false;
  text ? newElement.innerText = text : false;
  inerhtml ? newElement.innerHTML = inerhtml : false;
  plchldr ? newElement.placeholder = plchldr : false;
  val ? newElement.value = val : false;
  return newElement;
};

const saveChanges = async (id) => {
  const responce = await fetch(`${url}/updateCont`, {
    method: "PATCH",
    headers: header,
    body: JSON.stringify({
      _id: arrForCounts[id]._id,
      title: arrForCounts[id].title,
      count: arrForCounts[id].count,
      date: arrForCounts[id].date
    })
  });
  const result = await responce.json();
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
