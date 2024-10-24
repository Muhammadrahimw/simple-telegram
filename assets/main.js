let forPassword = document.querySelector(".forPassword");
let passCode = document.querySelector("#passCode");
let passBtn = document.querySelector("#passBtn");
let lockIcon = document.querySelector("#openLockIcon");
let lokedIcon = document.querySelector("#closeLockIcon");
let searchInput = document.querySelector("#searchInput");

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
      lockIcon.style.display = "block";
      lokedIcon.style.display = "none";
    }
    console.log("password: telegram");
    passCode.value = "";
  }
});

lockIcon.addEventListener("click", () => {
  lockIcon.style.display = "none";
  lokedIcon.style.display = "block";
  setTimeout(() => {
    localStorage.removeItem("token");
    forPassword.style.display = "flex";
  }, 400);
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
    // id = fetchData.length;
    id = String(Date.now());
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

// qo'shimcha code

async function deleteAllData() {
  try {
    const response = await fetch("http://localhost:3000/user1");
    const data = await response.json();

    const deletePromise = data.map((item) => {
      return fetch(`http://localhost:3000/user1/${item.id}`, {
        method: "DELETE",
      }).then((deleteResponse) => {
        if (deleteResponse.ok) {
          console.log(`muvaffaqiyatli o'chirildi`);
        } else {
          console.log(`afsuski o'chirilmadi :(`);
        }
      });
    });

    await Promise.all(deletePromise);
    console.log("Barcha ma'lumotlar muvaffaqiyatli o'chirildi");
  } catch (error) {
    console.error(error + ":(");
  }
}

// qo'shimcha code

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
  if (value === `/clear`) {
    return;
  }
  if (value.length > 20) {
    let newStr = "";
    let num = 30;
    for (let i = 0; value.length > i; i++) {
      if (i === num) {
        newStr += `<br>`;
        num += 30;
      }
      newStr += value[i];
    }
    value = newStr;
  }
  newElement = document.createElement(`${newElement}`);
  newElement.innerHTML = value;
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
      if (firstInput.value === `/clear`) {
        deleteAllData();
      }
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
      if (secondInput.value === `/clear`) {
        deleteAllData();
      }
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
    let data = await getFetch(editId);
    let newImg = data.img;

    if (data.name === "firstUser") {
      firstInput.value = data.message;
    } else {
      secondInput.value = data.message;
    }

    checkEdit = true;

    firstSendBtn.addEventListener("click", async () => {
      let img = firstHiddenInput.files[0];
      if (img) {
        newImg = await new Promise((resolve) => {
          let reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(img);
        });
      }
      editFetch(editId, data.name, firstInput.value, newImg);
    });

    secondSendBtn.addEventListener("click", async () => {
      let img = secondHiddenInput.files[0];
      if (img) {
        newImg = await new Promise((resolve) => {
          let reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(img);
        });
      }
      editFetch(editId, data.name, secondInput.value, newImg);
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

let bars = document.querySelector("#bars");
let users = document.querySelector(".users");
let left = document.querySelector(".left");
let right = document.querySelector(".right");

bars.addEventListener("click", () => {
  if (left.style.width === 7 + "%") {
    searchInput.style.display = `block`;
    localStorage.setItem("bars", "big");
    left.style.cssText = `width: 25%; transition: 0.2s;`;
    right.style.cssText = `width: 75%; transition: 0.2s;`;
  } else {
    searchInput.style.display = `none`;
    localStorage.setItem("bars", "small");
    left.style.cssText = `width: 7%; transition: 0.2s;`;
    right.style.cssText = `width: 93%; transition: 0.2s;`;
  }
});

if (localStorage.getItem("bars") === "small") {
  searchInput.style.display = `none`;
  left.style.cssText = `width: 7%; transition: 0.2s;`;
  right.style.cssText = `width: 93%; transition: 0.2s;`;
} else {
  searchInput.style.display = `block`;
  left.style.cssText = `width: 25%; transition: 0.2s;`;
  right.style.cssText = `width: 75%; transition: 0.2s;`;
}
