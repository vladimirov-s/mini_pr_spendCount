import { header, url } from "./constants.js";
import { createElements } from "./createElement.js";
import { render } from "./mainScript.js";

export const imgEditOnclick = (
  arrForCounts,
  numBList,
  title,
  count,
  rDate,
  container,
  idx
) => {
  const numBListInner = numBList.cloneNode(true);
  const wrapForEdit = createElements(
    "div",
    false,
    false,
    "wrapForEdit dflex",
    false,
    false
  );
  wrapForEdit.appendChild(numBListInner);
  const inpForTitle = createElements(
    "input",
    "Ведите новое название места",
    false,
    "inpForTitle",
    false,
    false,
    "Ведите новое название места",
    title
  );
  wrapForEdit.appendChild(inpForTitle);
  const inpForDateEdit = createElements(
    "input",
    "Изменить дату",
    false,
    "inpForDateEdit",
    false,
    false,
    "Ведите новую дату",
    rDate.cloneNode(true).innerText
  );
  wrapForEdit.appendChild(inpForDateEdit);
  const inpForNumValue = createElements(
    "input",
    false,
    "Ведите новую сумму",
    "inpForNumValue",
    false,
    false,
    "Ведите новую сумму",
    count
  );
  wrapForEdit.appendChild(inpForNumValue);
  const buttConfirm = createElements(
    "button",
    "подтвердить изменения",
    "Save",
    "buttConfirm",
    false,
    false,
    false
  );
  wrapForEdit.appendChild(buttConfirm);
  const buttCancelEdit = createElements(
    "button",
    "отменить изменения",
    "Cancel",
    "buttCancelEdit"
  );
  wrapForEdit.appendChild(buttCancelEdit);
  container.appendChild(wrapForEdit);
  inpForNumValue.focus();
  buttConfirm.onclick = () => {
    arrForCounts[idx].date = inpForDateEdit.value;
    arrForCounts[idx].count = inpForNumValue.value;
    arrForCounts[idx].title = inpForTitle.value;
    saveChanges(arrForCounts, idx);
  };
  buttCancelEdit.onclick = () => {
    container.removeChild(wrapForEdit);
  };
};

const saveChanges = async (arrForCounts, idx) => {
  const responce = await fetch(`${url}/${arrForCounts[idx]._id}`, {
    method: "PATCH",
    headers: header,
    body: JSON.stringify({
      title: arrForCounts[idx].title,
      count: arrForCounts[idx].count,
      date: arrForCounts[idx].date,
    }),
  });
  const result = await responce.json();
  arrForCounts.findIndex((element, index) => {
    try {
      if (element._id === result._id) {
        arrForCounts.splice(index, 1, result);
      }
    } catch (err) {
      return;
    }
  });
  render();
};
