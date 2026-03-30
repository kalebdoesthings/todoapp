function constructNav(navElementArray) {


mainnav = document.getElementsByClassName("mainnav");







navElementArray.forEach(item => {
   console.log(item) 
    navelement = document.createElement("li")
    navelement.textContent = item;
    navelement.className = "mainnavelement";
    navelement.addEventListener('click', () => switchTab(item));
 
    mainnav[0].appendChild(navelement);


});

}

fakearray = ["Build", "Programming", "Electronics"]
constructNav(fakearray)

const archiveNav = document.createElement("li")
archiveNav.textContent = "Archive"
archiveNav.className = "mainnavelement"
archiveNav.addEventListener('click', () => switchTab("Archive"))
document.getElementsByClassName("mainnav")[0].appendChild(archiveNav)


