window.addEventListener("scroll", () => {
    const progress = document.getElementById("progress");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${Math.min(scrollTop / scrollTotal * 100, 100)}%`;
});