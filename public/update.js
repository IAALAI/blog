const up_time = document.querySelector(".up_time");
function update_up_time() {
    const current_time = new Date();
    const diff = current_time - create_date;
    up_time.innerHTML = `Up time: 
        ${Math.floor(diff / (1000 * 60 * 60 * 24))}days,
        ${Math.floor((diff / (1000 * 60 * 60)) % 24)} hours,
        ${Math.floor((diff / (1000 * 60)) % 60)} minutes,
        ${Math.floor((diff / 1000) % 60)} seconds`;
}
update_up_time();
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
