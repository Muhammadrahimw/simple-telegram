let firstInput = document.getElementById("user_1_message");
let secondInput = document.getElementById("user_2_message");
let firstSendBtn = document.getElementById("send_icon_1");
let secondSendBtn = document.getElementById("send_icon_2");
let firstMessage = document.getElementById("first_message");
let secondMessage = document.getElementById("second_message");
let firstId = 0;
let secondId = 0;
let fetchData = null;

async function fetchFunc(user) {
  try {
    let response = await fetch(`http://localhost:3000/${user}`);
    fetchData = await response.json();
    getData(fetchData);
    firstId = fetchData.length;
  } catch (error) {
    console.log(error + ":(");
  }
}

function postFetch(user, message, userNameValue) {
  fetch(`http://localhost:3000/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: firstId,
      name: userNameValue,
      message: message,
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

function createMessage(newElement, value, firstAppend, secondAppend, realName) {
  newElement = document.createElement(`${newElement}`);
  newElement.textContent = value;
  firstAppend.appendChild(newElement);
  if (realName === "firstUser") {
    newElement.style.textAlign = "right";
  } else {
    newElement.style.textAlign = "left";
  }
  let copyElement = newElement.cloneNode(true);
  secondAppend.appendChild(copyElement);
  if (realName === "firstUser") {
    copyElement.style.textAlign = "left";
  } else {
    copyElement.style.textAlign = "right";
  }
}

function getData(data) {
  data.forEach((item) => {
    createMessage("p", item.message, firstMessage, secondMessage, item.name);
  });
}

fetchFunc("user1");

firstSendBtn.addEventListener("click", (e) => {
  if (firstInput.value) {
    postFetch("user1", firstInput.value, "firstUser");
  } else {
    console.log("xabar mavjud emas");
  }
});

secondSendBtn.addEventListener("click", (e) => {
  if (secondInput.value) {
    postFetch("user1", secondInput.value, "secondUser");
  } else {
    console.log("xabar mavjud emas");
  }
});
