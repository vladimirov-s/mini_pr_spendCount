export const createElements = (
  tag,
  title,
  text,
  classes,
  iDs,
  inerhtml,
  plchldr,
  val
) => {
  const newElement = document.createElement(tag);
  title ? (newElement.title = title) : false;
  newElement.className = classes;
  iDs ? (newElement.id = iDs) : false;
  text ? (newElement.innerText = text) : false;
  inerhtml ? (newElement.innerHTML = inerhtml) : false;
  plchldr ? (newElement.placeholder = plchldr) : false;
  val ? (newElement.value = val) : false;
  return newElement;
};
