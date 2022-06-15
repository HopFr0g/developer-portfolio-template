import {sendGet} from "/scripts/reqManager.js";

const tabIcon = document.querySelector("#tab-icon");
const tabTitle = document.querySelector("#tab-title");
const headerTitle = document.querySelector("#header-title");

const mainTitle = document.querySelector("#main-title");
const mainSubitle = document.querySelector("#main-subtitle");

const news = document.querySelector("#news");
const newsImg = document.querySelector("#news-img");
const newsTitle = document.querySelector("#news-title");
const newsDescription = document.querySelector("#news-description");

const footerContact = document.querySelector("#footer-contact");

const aboutDescription = document.querySelector("#about-description");

const loadSettings = async () => {
    const config = await sendGet("/json/info.json", "json");
    
    if (tabTitle && headerTitle) {
        tabIcon.setAttribute("href", config["tabIcon"]);
        tabTitle.innerHTML = config["personalName"];
        headerTitle.innerHTML = config["personalName"];
    }
    
    if (mainTitle && mainSubitle) {
        mainTitle.innerHTML = config["mainTitle"];
        mainSubitle.innerHTML = config["mainSubtitle"];
    }
    
    if (news && newsImg && newsTitle && newsDescription) {
        news.onclick = `location.href = ${config["newsUrl"]}`;
        newsImg.setAttribute("src", config["newsImg"]);
        newsTitle.innerHTML = config["newsTitle"];
        newsDescription.innerHTML = config["newsDescription"];
    }
    
    if (footerContact) {
        footerContact.innerHTML = `<i class="fas fa-envelope"></i><a href="mailto:${config["footerContact"]}">${config["footerContact"]}</a>`;
    }
    
    if (aboutDescription) {
        aboutDescription.innerHTML = config["aboutDescription"];
    }
}

loadSettings();