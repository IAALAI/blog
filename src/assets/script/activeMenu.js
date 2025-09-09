document.querySelectorAll(".menu>li>a").forEach(item => {
    if (location.href.startsWith(item.href)) {
        item.classList.add("active")
    }
})