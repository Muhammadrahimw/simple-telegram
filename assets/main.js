// password
let forPassword = document.querySelector(".forPassword");
let passCode = document.querySelector("#passCode");
let passBtn = document.querySelector("#passBtn");

if (localStorage.getItem("token")) {
  forPassword.style.display = "none";
}
passBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("token") === "token") {
    forPassword.style.display = "none";
  } else {
    if (passCode.value === "telegram") {
      localStorage.setItem("token", "token");
      forPassword.style.display = "none";
    }
    console.log("password: telegram");
    passCode.value = "";
  }
});
// password

let firstInput = document.getElementById("user_1_message");
let secondInput = document.getElementById("user_2_message");
let firstSendBtn = document.getElementById("send_icon_1");
let secondSendBtn = document.getElementById("send_icon_2");
let firstMessage = document.getElementById("first_message");
let secondMessage = document.getElementById("second_message");
let firstImg = document.getElementById("user_1_img");
let secondImg = document.getElementById("user_2_img");
let firstHiddenInput = document.getElementById("hidden_input_1");
let secondHiddenInput = document.getElementById("hidden_input_2");
let id = 0;
let fetchData = null;
let checkEdit = false;

function timeFunc() {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  let nowTime = hour + ":" + minute + ":" + second;
  return nowTime;
}

async function fetchFunc(user) {
  try {
    let response = await fetch(`http://localhost:3000/${user}`);
    fetchData = await response.json();
    getData(fetchData);
    id = fetchData.length;
  } catch (error) {
    console.log(error + ":(");
  }
}

function postFetch(user, message, userNameValue, imgValue) {
  fetch(`http://localhost:3000/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: userNameValue,
      message: message,
      img: imgValue,
      time: timeFunc(),
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log("muvaffaqiyatli yuborildi");
    })
    .catch((error) => {
      console.log(error + "yuborilmadi");
    });
}

function deleteFetch(id) {
  fetch(`http://localhost:3000/user1/${id}`, {
    method: `DELETE`,
  }).then((data) => {
    if (data.ok) {
      console.log(`Muvaffaqiyatli o'chirildi`);
    } else {
      console.log(`Afsuski o'chirilmadi :(`);
    }
  });
}

function editFetch(id, oldName, newMessage, imgValue) {
  fetch(`http://localhost:3000/user1/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: oldName,
      message: newMessage,
      img: imgValue,
      time: timeFunc(),
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log("muvaffaqiyatli yangilandi");
    })
    .catch((error) => {
      console.log(error + "yangilanmadi :(");
    });
}

async function getFetch(id) {
  try {
    let info = await fetch(`http://localhost:3000/user1/${id}`);
    let data = await info.json();
    return data;
  } catch (error) {
    console.log(error + " Ma'lumot yo'q :(");
  }
}

function createMessage(
  newElement,
  value,
  firstAppend,
  secondAppend,
  realName,
  nowTime,
  img,
  id
) {
  newElement = document.createElement(`${newElement}`);
  newElement.textContent = value;
  newElement.classList.add("p");
  newElement.setAttribute(`data-id`, id);
  let newTimeElement = document.createElement("span");
  newTimeElement.textContent = nowTime;
  firstAppend.appendChild(newElement);

  if (img) {
    let image = document.createElement("img");
    image.src = `${img}`;
    image.width = 150;
    image.height = 150;
    if (realName === "firstUser") {
      newElement.appendChild(image);
      image.alt = "firstUser image";
    } else {
      newElement.appendChild(image);
      image.alt = "secondUser image";
    }
  }
  firstAppend.appendChild(newTimeElement);

  if (realName === "firstUser") {
    newElement.style.cssText = `display: flex; flex-direction: column; align-items: end;`;
    newTimeElement.style.cssText = `display: flex; justify-content: end;`;
  } else {
    newElement.style.cssText = `display: flex; flex-direction: column; align-items: start;`;
    newTimeElement.style.cssText = `display: flex; justify-content: start;`;
  }

  let copyElement = newElement.cloneNode(true);
  let newTimeElementTwo = newTimeElement.cloneNode(true);

  if (realName === "firstUser") {
    copyElement.style.cssText = `display: flex; flex-direction: column; align-items: start;`;
    newTimeElementTwo.style.cssText = `display: flex; justify-content: start;`;
  } else {
    copyElement.style.cssText = `display: flex; flex-direction: column; align-items: end;`;
    newTimeElementTwo.style.cssText = `display: flex; justify-content: end;`;
  }
  secondAppend.appendChild(copyElement);
  secondAppend.appendChild(newTimeElementTwo);
}

function getData(data) {
  data.forEach((item) => {
    createMessage(
      "p",
      item.message,
      firstMessage,
      secondMessage,
      item.name,
      item.time,
      item.img,
      item.id
    );
  });
}

fetchFunc("user1");

firstSendBtn.addEventListener("click", (e) => {
  if (checkEdit === false) {
    if (firstInput.value || firstHiddenInput.files[0]) {
      let img = firstHiddenInput.files[0];
      if (img) {
        let reader = new FileReader();
        reader.onload = function (event) {
          let imgData = event.target.result;
          postFetch("user1", firstInput.value, "firstUser", imgData);
        };
        reader.readAsDataURL(img);
      } else {
        postFetch("user1", firstInput.value, "firstUser");
      }
    } else {
      console.log("xabar mavjud emas");
    }
  }
});

secondSendBtn.addEventListener("click", (e) => {
  if (checkEdit === false) {
    if (secondInput.value || secondHiddenInput.files[0]) {
      let img = secondHiddenInput.files[0];
      if (img) {
        let reader = new FileReader();
        reader.onload = function (event) {
          let imgData = event.target.result;
          postFetch("user1", secondInput.value, "secondUser", imgData);
        };
        reader.readAsDataURL(img);
      } else {
        postFetch("user1", secondInput.value, "secondUser");
      }
    } else {
      console.log("xabar mavjud emas");
    }
  }
});

firstImg.addEventListener("click", () => {
  firstHiddenInput.click();
});

secondImg.addEventListener("click", () => {
  secondHiddenInput.click();
});

// modal

let deleteBtn = document.getElementById("deleteBtn");
let editBtn = document.getElementById("editBtn");
const modal = document.getElementById("modal");
let deleteId = null;
let editId = null;

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  if (event.target.classList.contains("p")) {
    deleteId = event.target.dataset.id;
    editId = event.target.dataset.id;
    modal.style.display = "flex";
    modal.style.left = `${event.pageX}px`;
    modal.style.top = `${event.pageY}px`;
  }
});

deleteBtn.addEventListener("click", () => {
  if (deleteId) {
    deleteFetch(deleteId);
    deleteId = null;
  }
});

editBtn.addEventListener("click", () => {
  async function additionFunc(editId) {
    let newImg = null;
    let data = await getFetch(editId);
    if (data.name === "firstUser") {
      firstInput.value = data.message;
    } else {
      secondInput.value = data.message;
    }
    let img = firstHiddenInput.files[0];
    if (img) {
      let reader = new FileReader();
      reader.onload = function (event) {
        let imgData = event.target.result;
        newImg = imgData;
      };
      reader.readAsDataURL(img);
    } else {
      newImg = data.img;
    }
    checkEdit = true;
    firstSendBtn.addEventListener("click", () => {
      editFetch(editId, data.name, firstInput.value, newImg);
    });
    secondSendBtn.addEventListener("click", () => {
      editFetch(editId, data.name, secondInput.value, data.img);
    });
  }
  additionFunc(editId);
  checkEdit = false;
});

modal.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener(
  "click",
  () => {
    modal.style.display = "none";
  },
  true
);

// -----------------------------------------------------
