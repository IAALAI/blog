self.create_date = new Date(`{{site.start_date}}`);
(async function () {
    let prevReq = localStorage.getItem("prevReq")
    if (!prevReq || new Date() - new Date(prevReq) > 60 * 60 * 1000) {
        const [stats, metrics] = await Promise.all([
            fetch("{{build.analyzeHost}}/v/{{build.analyzeId}}/stats").then(res => res.json()),
            fetch("{{build.analyzeHost}}/v/{{build.analyzeId}}/metrics?type=url").then(res => res.json())
        ]);
        for (const key in stats) localStorage.setItem(key, stats[key].value)
        for (const value of metrics) localStorage.setItem(value.x, value.y)
        localStorage.setItem("prevReq", new Date())
    } // 提前获取数据
})().then(() => {
    if (localStorage[location.pathname] == null) localStorage[location.pathname] = 0;
    document.querySelector(".pv").innerText = localStorage[location.pathname];
    document.querySelector(".pv").parentElement.title = "site total page view: " + localStorage.pageviews;
    document.querySelector(".uv").innerText = localStorage.visitors;
});