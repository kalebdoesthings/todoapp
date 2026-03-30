function switchTab(tab) {
    document.querySelectorAll(".mainnavelement").forEach(el => {
        if (el.textContent === tab) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });

    document.querySelectorAll(".section").forEach(el => {
        if (el.id === tab) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });

    localStorage.setItem("active", tab);
}