document.querySelector(".last_up").innerHTML = `last Update: ${new Date(`{{build.date.toISOString()}}`).toLocaleString()}`;

const startDate = new Date(`{{site.start_date}}`);
function refreshUptime() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const uptime = document.querySelector(".up_time")
    uptime.innerHTML = `Up time: ${days}:${hours}:${minutes}:${seconds}`;
}

let uptimeInterval = null;

refreshUptime(); // 初始化显示一次

const observer = new IntersectionObserver(entrise => {
    entrise.forEach(entry => {
        if (entry.isIntersecting) {
            if (!uptimeInterval) uptimeInterval = setInterval(refreshUptime, 1000);
        } else {
            if (uptimeInterval) {
                clearInterval(uptimeInterval);
                uptimeInterval = null;
            }
        }
    })
})
observer.observe(document.querySelector("footer"))