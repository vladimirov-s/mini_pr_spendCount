import { url, editor, header, deleteIcon } from "./constants.js";
import { createElements } from "./createElement.js";
import { imgEditOnclick } from "./edit.js";
const arrForCounts = [];
const createCount = document.getElementById("addSpend");
const outputCont = document.getElementById("outputCont");
const inputswhereWasSpend = document.querySelectorAll("#calculations input");
const totalCount = document.getElementById("totalCount");

window.onload = async () => {
  const respons = await fetch(`${url}/`, {
    method: "GET",
  });
  const result = await respons.json();
  result.forEach((count) => {
    arrForCounts.push(count);
  });
  render();
};

createCount.onclick = () => {
  const objFields = {};
  let flag = true;
  inputswhereWasSpend.forEach((element, i) => {
    if (element.value && flag) {
      if (i === 0) {
        objFields.title = element.value;
      } else if (i == 1) {
        objFields.count = element.value;
        const newDate = new Date();
        objFields.date =
          newDate.getDate() +
          "." +
          (newDate.getMonth() + 1) +
          "." +
          newDate.getFullYear();
        createOneCount(objFields);
      }
    } else {
      flag = false;
    }
  });
};
const createOneCount = async (objFields) => {
  const responce = await fetch(`${url}/`, {
    method: "POST",
    headers: header,
    body: JSON.stringify(objFields),
  });
  const result = await responce.json();
  arrForCounts.push(result);
  render();
};

const deleteOneCount = async (elem) => {
  const responce = await fetch(`${url}/${elem._id}`, {
    method: "DELETE",
  });
  const result = await responce.json();
  arrForCounts.findIndex((element, index) => {
    try {
      if (element._id === result._id) {
        arrForCounts.splice(index, 1);
        render();
      }
    } catch (err) {
      return;
    }
  });
};

export const render = () => {
  inputswhereWasSpend.forEach((input) => {
    input.value = "";
  });
  outputCont.innerHTML = "";
  totalCount.innerText = 0;
  arrForCounts.forEach((element, idx) => {
    const { title, count, date, _id } = element;
    totalCount.innerText = parseInt(totalCount.innerText) + parseInt(count);
    const container = createElements(
      "div",
      title,
      false,
      "item",
      `container-${idx + 1}`
    );
    const numBList = createElements(
      "span",
      false,
      idx + 1 + ")",
      "counter",
      `numBList-${idx + 1}`
    );
    container.appendChild(numBList);
    const shopName = createElements(
      "span",
      title,
      title,
      "shopName",
      `shopName-${idx + 1}`
    );
    container.appendChild(shopName);
    const rDate = createElements(
      "span",
      "Дата",
      false,
      "Дата",
      `rDate-${idx + 1}`
    );
    container.appendChild(rDate);
    const summ = createElements(
      "span",
      false,
      element.count + " p.",
      "countNum",
      `summ-${idx + 1}`
    );
    container.appendChild(summ);
    const wrapForControl = createElements(
      "div",
      "управление счетом",
      false,
      "controlItems dflex"
    );
    container.appendChild(wrapForControl);
    const imgEdit = createElements(
      "i",
      false,
      false,
      "imgEdit",
      `imgEdit-${idx + 1}`,
      editor
    );
    wrapForControl.appendChild(imgEdit);
    const imgDelete = createElements(
      "i",
      false,
      false,
      "imgDelete",
      `imgDelete-${idx + 1}`,
      deleteIcon
    );
    rDate.innerText = date;
    wrapForControl.appendChild(imgDelete);
    outputCont.appendChild(container);
    imgEdit.onclick = () => {
      imgEditOnclick(
        arrForCounts,
        numBList,
        title,
        count,
        rDate,
        container,
        idx
      );
    };
    imgDelete.onclick = () => {
      deleteOneCount(element);
    };
  });
};
