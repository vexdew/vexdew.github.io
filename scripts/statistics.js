"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_js_1 = require("chart.js");
function renderChart(data) {
    const ctx = document.getElementById('visitorStatsChart').getContext('2d');
    const chartConfig = {
        type: 'line',
        data: {
            labels: data.map(d => d.month),
            datasets: [{
                    label: 'Number of Visitors',
                    data: data.map(d => d.visitors),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
        },
        options: {}
    };
    const chart = new chart_js_1.Chart(ctx, chartConfig);
}
const visitorStats = [
    { month: "January", visitors: 200 },
    { month: "February", visitors: 150 },
];
renderChart(visitorStats);
//# sourceMappingURL=statistics.js.map