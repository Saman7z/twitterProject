let darkColor = "#15202B";
let whiteColor = "#fff";
let darkHover = "rgba(66, 179, 250, 0.158)";
let lightHover = "rgb(228, 243, 255)";

///
const tweetBoxFocused = () => {
  if (document.getElementById("write-new-tweet").value.trim() != "") {
    document.querySelector(".tweet-submit-btn").style.opacity = "1";
  } else {
    document.querySelector(".tweet-submit-btn").style.opacity = "0.6";
  }
};
const searchBoxFocused = () => {
  document.querySelector(".search-icon").style.color = "rgba(29, 161, 242, 1)";
};
const searchBoxBlured = () => {
  document.querySelector(".search-icon").style.color = "#777";
};
const tweetBoxBlured = () => {
  document.querySelector(".tweet-submit-btn").style.opacity = "0.6";
};
document
  .getElementById("write-new-tweet")
  .addEventListener("keyup", tweetBoxFocused);
document
  .getElementById("search-box")
  .addEventListener("focus", searchBoxFocused);
document
  .getElementById("write-new-tweet")
  .addEventListener("blur", tweetBoxBlured);
document.getElementById("search-box").addEventListener("blur", searchBoxBlured);

// main script

const TweetContainer = document.querySelector(".tweets-container");
let limit = 3;
let page = 1;

// fetch data  => other url : https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}
const getData = async () => {
  let res = await fetch(
    `https://reqres.in/api/users?_limit=${limit}&_page=${page}`
  );
  let json = await res.json();
  return json;
};
const showPost = async () => {
  const posts = await getData();
  //console.log(posts);
  posts.data.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = ` <div class="tweet-item" data-id=${item.id}>
            <div class="tweet-info" >
              <div class="img-and-username">
                <div class="tweet-info-img-container">
                  <img
                    src=${item.avatar}
                    alt="user-img"
                    id="tweet-info-img"
                  />
                </div>
                <div class="tweet-info-username">
                  <span class="tweet-info-username-title">${item.first_name}</span>
                  <span class="tweet-info-username-account"
                    >@${item.last_name}</span
                  >
                </div>
              </div>
              <div class="tweet-down-icon">
                <i class="fa fa-angle-down"></i>
              </div>
            </div>
            <div class="tweet-text">
              <p class="tweet-text-p">
              ${item.last_name}${item.email}&nbsp;&nbsp;${item.last_name}${item.email}&nbsp;${item.last_name}${item.email}
              </p>
            </div>
            <div class="tweet-icon-container">
              <div class="tweet-icons">
                <i class="fa fa-comment"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
                <i class="fa fa-share-alt"></i>
              </div>
            </div>
          </div>`;
    TweetContainer.appendChild(div);
  });
  //   TweetContainer.innerHTML += `${posts
  //     .map(
  //       (item) => `
  //     <div class="tweet-item">
  //     <div class="tweet-info">
  //       <div class="img-and-username">
  //         <div class="tweet-info-img-container">
  //           <img
  //             src="./assets/profile.jpg"
  //             alt="user-img"
  //             id="tweet-info-img"
  //           />
  //         </div>
  //         <div class="tweet-info-username">
  //           <span class="tweet-info-username-title">${item.title}</span>
  //           <span class="tweet-info-username-account"
  //             >@__saman____</span
  //           >
  //         </div>
  //       </div>
  //       <div class="tweet-down-icon">
  //         <i class="fa fa-angle-down"></i>
  //       </div>
  //     </div>
  //     <div class="tweet-text">
  //       <p class="tweet-text-p">
  //       ${item.body}
  //       </p>
  //     </div>
  //     <div class="tweet-icon-container">
  //       <div class="tweet-icons">
  //         <i class="fa fa-comment"></i>
  //         <i class="fa fa-retweet"></i>
  //         <i class="fa fa-heart"></i>
  //         <i class="fa fa-share-alt"></i>
  //       </div>
  //     </div>
  //   </div>
  //     `
  //     )
  //     .join("")}`;
};
showPost();
const loaderFunction = (e) => {
  //console.log(e.target.clientHeight)
  let { scrollTop, scrollHeight, clientHeight } = e.target;
  //console.log(`scrollTop: ${scrollTop} , clientHeight : ${clientHeight} , scrollHeight : ${scrollHeight}`);
  if (scrollTop + clientHeight >= scrollHeight - 3) {
    document.querySelector(".loader").style.opacity = "1";
    setTimeout(() => {
      document.querySelector(".loader").style.opacity = "0";
      setTimeout(() => {
        page++;
        showPost();
      }, 500);
    }, 1000);
  }
};

const searchOption = (e) => {
  const keyword = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".tweet-item");
  posts.forEach(item => {
   const name = item.querySelector(".tweet-info-username-title").innerText.toUpperCase();
   const username = item.querySelector(".tweet-info-username-account").innerText.toUpperCase();
   const text = item.querySelector(".tweet-text-p").innerText.toUpperCase();
   if(name.indexOf(keyword) > -1|| username.indexOf(keyword) > -1||text.indexOf(keyword) > -1){
     item.style.display = "flex";
   }else{
    item.style.display = "none";
   }
  })
  // const posts =
};
const goLight = () => {
  document.getElementById("theme-btn").innerHTML =
    '<i class="fa fa-moon-o"></i>';
  document.getElementById("theme-btn").style.background = "#333";
  document.getElementById("theme-btn").style.color = whiteColor;
  document.getElementById("search-box").style.color = "#777";
  document.getElementById("search-box").style.backgroundColor = "#d7eefd";
  document.getElementById("search-box").style.border = "1px solid #d7eefd";
  document.querySelector(".profile-name").style.color = "#333";
  //
  document.querySelector(".body").style.backgroundColor = whiteColor;
  document.querySelector(
    ".left-section-container"
  ).style.backgroundColor = whiteColor;
  document.querySelector(".left-section-container").style.color = darkColor;
  document.querySelector(
    ".right-section-container"
  ).style.backgroundColor = whiteColor;
  document.querySelector(".right-section-container").style.color = darkColor;
  document.querySelector(".top-bar h2").style.color = darkColor;
  //hover colors
  document.documentElement.style.setProperty(
    "--hover-back-color",
    "rgb(228, 243, 255)"
  );
  document.documentElement.style.setProperty(
    "--tweet-item-hover",
    "rgba(66, 179, 250, 0.158)"
  );
  //not main :)
  document.querySelector(".main-section").style.borderBottom =
    "10px solid rgb(220, 231, 255)";

  document
    .querySelectorAll(".nav-item-title")
    .forEach((item) => (item.style.color = darkColor));
  document
    .querySelectorAll(".tweet-info-username-title")
    .forEach((item) => (item.style.color = darkColor));
  document
    .querySelectorAll(".item-pack i")
    .forEach((item) => (item.style.color = darkColor));
  document
    .querySelectorAll(".circle")
    .forEach((item) => (item.style.backgroundColor = darkColor));
  document
    .querySelectorAll(".tweet-text-p")
    .forEach((item) => (item.style.color = darkColor));
};
const goDark = () => {
  document.getElementById("theme-btn").innerHTML =
    '<i class="fa fa-sun-o fa-spin"></i>';
  document.getElementById("theme-btn").style.background = whiteColor;
  document.getElementById("theme-btn").style.color = "#444";
  document.getElementById("theme-btn").style.border = "solid 1px #fff";
  document.querySelector(".profile-name").style.color = whiteColor;
  document.getElementById("theme-btn").style.border =
    "border: solid 1px yellow";
    document.getElementById("search-box").style.color = "#fff";
    document.getElementById("search-box").style.backgroundColor = "rgba(66, 179, 250, 0.158)";
    document.getElementById("search-box").style.border = "1px solid #15202B";
  // main colors
  document.querySelector(".body").style.backgroundColor = darkColor;
  document.querySelector(
    ".left-section-container"
  ).style.backgroundColor = darkColor;
  document.querySelector(".left-section-container").style.color = whiteColor;
  document.querySelector(
    ".right-section-container"
  ).style.backgroundColor = darkColor;
  document.querySelector(".right-section-container").style.color = whiteColor;
  document.querySelector(".top-bar h2").style.color = whiteColor;
  //not main :)
  document.documentElement.style.setProperty(
    "--hover-back-color",
    "rgba(66, 179, 250, 0.158)"
  );
  document.documentElement.style.setProperty(
    "--tweet-item-hover",
    "rgba(66, 179, 250, 0.158)"
  );
  document.querySelector(".main-section").style.borderBottom =
    "10px solid rgba(66, 179, 250, 0.158)";

  document
    .querySelectorAll(".nav-item-title")
    .forEach((item) => (item.style.color = whiteColor));
  document
    .querySelectorAll(".tweet-info-username-title")
    .forEach((item) => (item.style.color = whiteColor));
  document
    .querySelectorAll(".item-pack i")
    .forEach((item) => (item.style.color = whiteColor));
  document
    .querySelectorAll(".tweet-text-p")
    .forEach((item) => (item.style.color = whiteColor));
  document
    .querySelectorAll(".circle")
    .forEach((item) => (item.style.backgroundColor = whiteColor));
};
const changeTheme = () => {
  if (
    document.getElementById("theme-btn").innerHTML ==
    '<i class="fa fa-moon-o"></i>'
  ) {
    goDark();
  } else {
    goLight();
  }
};
const showPhoneMenu = () => {
  document.querySelector(".left-section-container").style.transform =
    "translateX(0)";
    document.querySelector(".left-section-container").classList.add("menu-turned-on");
    document.querySelector(".main-section-container").style.opacity= "0.4";
};
const closePhoneMenu = () => {
  document.querySelector(".left-section-container").style.transform =
    "translateX(-200%)";
    document.querySelector(".main-section-container").style.opacity= "1";

};
const sideClickMenuClose = (e) => {
if (document.querySelector(".left-section-container").classList.contains("menu-turned-on")){
  if(!e.target.classList.contains("phone-home-img")){
    if(!e.target.classList.contains("navigation-container") && !e.target.classList.contains("nav-item") && !e.target.classList.contains("twit-icon") && !e.target.classList.contains("tweet-btn-small") && !e.target.classList.contains("fa") && !e.target.classList.contains("fa-moon") && !e.target.classList.contains("fa-plus-square")&& !e.target.classList.contains("nav-item-title") && !e.target.classList.contains("item-pack") && !e.target.classList.contains("tweet-btn") && !e.target.classList.contains("phone-navigation-icons")&& !e.target.classList.contains("left-section-container")&& !e.target.classList.contains("theme-btn")&& !e.target.classList.contains("theme-btn-container")) {
      closePhoneMenu()
    }else{
      //console.log(e.target.classList)
      //it gonna stay open
    }
  }
}
}
document
  .querySelector(".main-section-container")
  .addEventListener("scroll", loaderFunction);

document.getElementById("search-box").addEventListener("input", searchOption);

document.getElementById("theme-btn").addEventListener("click", changeTheme);

document
  .querySelector(".phone-home-img")
  .addEventListener("click", showPhoneMenu);
document
  .querySelector(".close-menu-btn")
  .addEventListener("click", closePhoneMenu);

  window.addEventListener("click", sideClickMenuClose)