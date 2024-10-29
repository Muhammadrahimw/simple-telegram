let forPassword = document.querySelector(".forPassword");
let passCode = document.querySelector("#passCode");
let passNumber = document.querySelector("#passNumber");
let passEmail = document.querySelector("#passEmail");
let passBtn = document.querySelector("#passBtn");
let logPhone = document.querySelector("#logPhone");
let logEmail = document.querySelector("#logEmail");
let logOther = document.querySelector("#logOther");
let lockIcon = document.querySelector("#openLockIcon");
let lokedIcon = document.querySelector("#closeLockIcon");
let searchInput = document.querySelector("#searchInput");
let logOut = document.querySelector("#logOut");
let logOutProfile = document.querySelector("#logOutProfile");
let securityData = null;

if (localStorage.getItem("login") && localStorage.getItem("password")) {
  forPassword.style.display = "none";
}

if (localStorage.getItem("login") && !localStorage.getItem("password")) {
  passNumber.style.display = `none`;
  logEmail.style.display = `none`;
  logPhone.style.display = `none`;
  passEmail.style.display = `none`;
}

if (!localStorage.getItem("login")) {
  passNumber.style.display = `block`;
  logEmail.style.display = `block`;
  passEmail.style.display = `none`;
  logOther.style.display = `none`;
  forPassword.style.display = `flex`;
}

if (logEmail.style.display === `block`) {
  logPhone.style.display = `none`;
} else {
  logEmail.style.display = `none`;
  logPhone.style.display = `block`;
}

logPhone.style.display = `none`;

if (localStorage.getItem("login") && !localStorage.getItem("password")) {
  logPhone.style.display = `none`;
}

logOther.addEventListener("click", () => {
  localStorage.removeItem("login");
  logOther.style.display = `none`;
  passNumber.style.display = `block`;
  logEmail.style.display = `block`;
});

logEmail.addEventListener("click", () => {
  passNumber.style.display = `none`;
  passEmail.style.display = `block`;
  logEmail.style.display = `none`;
  logPhone.style.display = `block`;
});

logPhone.addEventListener("click", () => {
  passNumber.style.display = `block`;
  passEmail.style.display = `none`;
  logEmail.style.display = `block`;
  logPhone.style.display = `none`;
});

passBtn.addEventListener("click", () => {
  if (localStorage.getItem("login")) {
    getSecurityData().then((data) => {
      data.forEach((item) => {
        if (item.phoneNumber === localStorage.getItem("login")) {
          if (item.password === passCode.value) {
            forPassword.style.display = `none`;
            localStorage.setItem("login", item.phoneNumber);
            localStorage.setItem("password", item.password);
          }
        }
      });
    });
  }
  if (!localStorage.getItem("login")) {
    getSecurityData().then((data) => {
      data.forEach((item) => {
        if (
          (item.phoneNumber === passNumber.value &&
            item.password === passCode.value) ||
          (item.email === passEmail.value && item.password === passCode.value)
        ) {
          forPassword.style.display = `none`;
          localStorage.setItem("login", item.phoneNumber);
          localStorage.setItem("password", item.password);
        }
      });
    });
  }
});

async function getSecurityData() {
  try {
    const response = await fetch(`http://localhost:3000/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error + "Ma'lumot olishda xatolik :(");
  }
}

lockIcon.addEventListener("click", () => {
  lockIcon.style.display = "none";
  lokedIcon.style.display = "block";
  passNumber.style.display = `none`;
  passEmail.style.display = `none`;
  setTimeout(() => {
    localStorage.removeItem("password");
    forPassword.style.display = "flex";
  }, 400);
});

logOut.addEventListener("click", () => {
  localStorage.removeItem("login");
  window.location.href = `./login.html`;
});

logOutProfile.addEventListener("click", () => {
  window.location.href = `./login.html`;
  localStorage.removeItem("login");
  localStorage.removeItem("password");
});

// password

async function getFetchUserInfo() {
  try {
    let info = await fetch(`http://localhost:3000/users`);
    let data = await info.json();
    return data;
  } catch (error) {
    console.log(error + " Ma'lumot yo'q :(");
  }
}

function editFetchUser(
  id,
  NewUserName,
  newPhoneNumber,
  newEmail,
  newPassword,
  newPhoto
) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: NewUserName,
      phoneNumber: newPhoneNumber,
      email: newEmail,
      password: newPassword,
      photo: newPhoto,
    }),
  })
    .then((data) => data.json())
    .then(() => {
      console.log("muvaffaqiyatli yangilandi");
    })
    .catch((error) => {
      console.log(error + " yangilashda xatolik yuz berdi :(");
    });
}

let userLogo = document.querySelector(".userLogo");
let userInfoModalContainer = document.querySelector(".userInfoModalContainer");
let userLogoModal = document.querySelector(".userLogoModal");
let userModalName = document.querySelector("#userModalName");
let userModalPhoneNumber = document.querySelector("#userModalPhoneNumber");
let userModalEmailAddress = document.querySelector("#userModalEmailAddress");
let userModalPassword = document.querySelector("#userModalPassword");

userLogo.addEventListener("click", () => {
  userInfoModalContainer.style.top = 0;
});

userInfoModalClose.addEventListener("click", () => {
  userInfoModalContainer.style.top = -200 + "%";
});

getFetchUserInfo().then((data) => {
  data.forEach((item) => {
    if (item.phoneNumber === localStorage.getItem("login")) {
      if (item.photo !== null) {
        userLogo.style.cssText = `background-image: url(${item.photo});`;
        userLogoModal.style.cssText = `background-image: url(${item.photo});`;
      }
      userModalName.textContent = item.userName;
      userModalPhoneNumber.textContent = item.phoneNumber;
      userModalEmailAddress.textContent = item.email;
      userModalPassword.textContent = item.password;
    }
  });
});

// userLogo.addEventListener("click", () => {
//   profilePhotoViewBig.display = `block`;
// });

let userNewInfoInputContainer = document.querySelector(
  ".userNewInfoInputContainer"
);
let userOldPasswordChecker = document.querySelector("#userOldPasswordChecker");
let userNewPasswordChecker = document.querySelector("#userNewPasswordChecker");
let userOldPasswordInput = document.querySelector("#userOldPasswordInput");
let userNewPasswordInput = document.querySelector("#userNewPasswordInput");
let userNewPasswordAcceptInput = document.querySelector(
  "#userNewPasswordAcceptInput"
);
let userNewPasswordAccept = document.querySelector("#userNewPasswordAccept");

let previewPassword =
  document.querySelector("#userModalPassword").parentElement;

previewPassword.addEventListener("click", () => {
  userInfoModal.style.display = `none`;
  userNewInfoInputContainer.style.display = `flex`;
});

document.addEventListener("keydown", (e) => {
  if (e.key === `Escape`) {
    if (userNewInfoInputContainer.style.display === `flex`) {
      userNewInfoInputContainer.style.display = `none`;
      userInfoModal.style.display = `flex`;
      userOldPasswordInput.value = "";
      userNewPasswordInput.value = "";
      userNewPasswordAcceptInput.value = "";
    } else {
      userInfoModalContainer.style.top = -200 + "%";
    }
  }
});

userNewPasswordInput.readOnly = true;
userNewPasswordAcceptInput.readOnly = true;
userNewPasswordAccept.disabled = true;

userOldPasswordInput.addEventListener("keydown", () => {
  getFetchUserInfo().then((item) => {
    item.forEach((value) => {
      if (value.phoneNumber === localStorage.getItem("login")) {
        if (userOldPasswordInput.value === value.password) {
          userOldPasswordChecker.textContent = `Your password is true`;
          userOldPasswordChecker.style.color = `green`;
          userNewPasswordInput.readOnly = false;
          userNewPasswordAcceptInput.readOnly = false;
        } else {
          userOldPasswordChecker.textContent = `Your password is incorrect`;
          userOldPasswordChecker.style.color = `red`;
          userNewPasswordInput.readOnly = true;
          userNewPasswordAcceptInput.readOnly = true;
        }
      }
    });
  });
});

userNewPasswordInput.addEventListener("input", () => {
  if (userNewPasswordAcceptInput.value === userNewPasswordInput.value) {
    userNewPasswordChecker.textContent = `Your password is the same`;
    userNewPasswordChecker.style.color = `green`;
    userNewPasswordAccept.disabled = false;
  } else {
    userNewPasswordChecker.textContent = `Your password is not the same`;
    userNewPasswordChecker.style.color = `red`;
    userNewPasswordAccept.disabled = true;
  }
});

userNewPasswordAcceptInput.addEventListener("input", () => {
  if (userNewPasswordInput.value === userNewPasswordAcceptInput.value) {
    userNewPasswordChecker.textContent = `Your password is the same`;
    userNewPasswordChecker.style.color = `green`;
    userNewPasswordAccept.disabled = false;
  } else {
    userNewPasswordChecker.textContent = `Your password is not the same`;
    userNewPasswordChecker.style.color = `red`;
    userNewPasswordAccept.disabled = true;
  }
});

userNewPasswordAccept.addEventListener("click", () => {
  if (userNewPasswordInput.value === userNewPasswordAcceptInput.value) {
    getFetchUserInfo().then((data) =>
      data.forEach((item) => {
        if (item.phoneNumber === localStorage.getItem("login")) {
          editFetchUser(
            item.id,
            item.userName,
            item.phoneNumber,
            item.email,
            userNewPasswordInput.value,
            item.photo
          );
        }
      })
    );
  }
});

// profile

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
let profilePhotoViewBig = document.querySelector(".profilePhotoViewBig");

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
  if (left.style.width === 8 + "%") {
    searchInput.style.display = `block`;
    localStorage.setItem("bars", "big");
    left.style.cssText = `width: 25%; transition: 0.2s;`;
    right.style.cssText = `width: 75%; transition: 0.2s;`;
  } else {
    searchInput.style.display = `none`;
    localStorage.setItem("bars", "small");
    left.style.cssText = `width: 8%; transition: 0.2s;`;
    right.style.cssText = `width: 92%; transition: 0.2s;`;
  }
});

if (localStorage.getItem("bars") === "small") {
  searchInput.style.display = `none`;
  left.style.cssText = `width: 8%; transition: 0.2s;`;
  right.style.cssText = `width: 92%; transition: 0.2s;`;
} else {
  searchInput.style.display = `block`;
  left.style.cssText = `width: 25%; transition: 0.2s;`;
  right.style.cssText = `width: 75%; transition: 0.2s;`;
}
