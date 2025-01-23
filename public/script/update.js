const up_time = document.querySelector(".up_time");
function update_up_time() {
    const current_time = new Date();
    if (create_date == null) return;
    const diff = (current_time - create_date) / 1000;
    up_time.innerText = `Up time: ${Math.floor(diff / (60 * 60 * 24))}days, ${Math.floor(diff % 86400)} seconds`;
    up_time.title = `${Math.floor((diff / (60 * 60)) % 24)} hours, ${Math.floor((diff / 60) % 60)} minutes`
}
let update_Interval = null;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            update_Interval = setInterval(update_up_time, 1000);
            update_up_time();
        } else {
            if (update_Interval) clearInterval(update_Interval);
        }
    })
}).observe(up_time);

// 数据汇报统计与展示
