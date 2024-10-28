let loginForm = document.querySelector("#loginForm");
let regNameInput = document.querySelector("#registerName");
let regNumberInput = document.querySelector("#registerNumber");
let regMailInput = document.querySelector("#registerEmail");
let regPassInput = document.querySelector("#registerPassword");
let regSubmit = document.querySelector("#registerSubmit");
let loginBtn = document.querySelector("#loginBtn");
let userInfo = {};
let imgData = null;

if (localStorage.getItem("password")) {
  window.location.href = `./index.html`;
}

function checkUserInfo(phone, mail, password, userInfo) {
  let checkPhoneAvailable = false;
  let checkMailAvailable = false;
  getUserInfo().then((data) => {
    data.forEach((user) => {
      if (user.phoneNumber === phone) {
        checkPhoneAvailable = true;
      }
      if (user.email === mail) {
        checkMailAvailable = true;
      }
    });

    if (checkPhoneAvailable) {
      alert("Bu telefon raqami orqali ro'yxatdan o'tilgan");
    }
    if (checkMailAvailable) {
      alert("Bu emailga ega foydalanuvchi mavjud");
    }

    if (!checkPhoneAvailable && !checkMailAvailable) {
      addUserInfo(userInfo);
      console.log("Muvaffaqiyatli ro'yxatdan o'tildi");
      localStorage.setItem("login", phone);
      localStorage.setItem("password", password);
      window.location.href = `./index.html`;
    }
  });
}

async function getUserInfo() {
  try {
    const response = await fetch(`http://localhost:3000/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error + "Ma'lumot olishda xatolik :(");
  }
}

function addUserInfo(userInfo) {
  fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((data) => {
      data.json();
    })
    .catch((error) => {
      console.log(error + "ma'lumot qo'shib bo'lmadi :(");
    });
}

loginBtn.addEventListener("click", () => {
  window.location.href = "./index.html";
});

let registerLoadPhoto = document.getElementById("registerLoadPhoto");
let registerViewPhoto = document.getElementById("registerViewPhoto");

registerViewPhoto.addEventListener("click", () => {
  registerLoadPhoto.click();
});

registerLoadPhoto.addEventListener("change", () => {
  if (registerLoadPhoto.files && registerLoadPhoto.files.length > 0) {
    let img = registerLoadPhoto.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      imgData = event.target.result;
      registerViewPhoto.style.backgroundImage = `url(${imgData})`;
    };

    reader.readAsDataURL(img);
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let regax = /@.*com/g;
  let checkMail = regax.test(regMailInput.value);
  let checkPhone = regNumberInput.value.replace(/\d/g, "");
  if (checkPhone) {
    alert(`Telefon raqam uchun ushbu "${checkPhone}" lardan foydalanmang!`);
  } else {
    if (checkMail) {
      userInfo = {
        userName: regNameInput.value,
        phoneNumber: regNumberInput.value,
        email: regMailInput.value,
        password: regPassInput.value,
        photo: imgData,
      };
      checkUserInfo(
        regNumberInput.value,
        regMailInput.value,
        regPassInput.value,
        userInfo
      );
    } else {
      alert(`Email formatini to'g'ri kiriting!`);
    }
  }
});
