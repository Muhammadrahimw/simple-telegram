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

function createMessage(
  newElement,
  value,
  firstAppend,
  secondAppend,
  realName,
  nowTime,
  img
) {
  newElement = document.createElement(`${newElement}`);
  newElement.textContent = value;
  firstAppend.appendChild(newElement);
  let newTimeElement = document.createElement("span");
  newTimeElement.textContent = nowTime;
  firstAppend.appendChild(newTimeElement);

  //   image.style.cssText = `width: 200px; height: 200px; background-image: url(${img})`;

  if (realName === "firstUser") {
    newElement.style.textAlign = "right";
    newTimeElement.style.textAlign = "right";
  } else {
    newElement.style.textAlign = "left";
    newTimeElement.style.textAlign = "left";
  }
  let copyElement = newElement.cloneNode(true);
  let newTimeElementTwo = newTimeElement.cloneNode(true);
  //   firstAppend.appendChild(image);
  //   secondAppend.appendChild(image);
  secondAppend.appendChild(copyElement);
  secondAppend.appendChild(newTimeElementTwo);
  if (realName === "firstUser") {
    copyElement.style.textAlign = "left";
    newTimeElementTwo.style.textAlign = "left";
  } else {
    copyElement.style.textAlign = "right";
    newTimeElementTwo.style.textAlign = "right";
  }
}

function getData(data) {
  data.forEach((item) => {
    createMessage(
      "p",
      item.message,
      firstMessage,
      secondMessage,
      item.name,
      item.time
    );
  });
}

fetchFunc("user1");

firstSendBtn.addEventListener("click", (e) => {
  if (firstInput.value) {
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
});

secondSendBtn.addEventListener("click", (e) => {
  if (secondInput.value) {
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
});

firstImg.addEventListener("click", () => {
  firstHiddenInput.click();
});

secondImg.addEventListener("click", () => {
  secondHiddenInput.click();
});
