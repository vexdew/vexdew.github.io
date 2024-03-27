// Import the necessary classes from chart.js
import { Chart, ChartConfiguration, ChartData, ChartDataset } from 'chart.js';

// Define your data structure
interface VisitorData {
    month: string;
    visitors: number;
}

function renderChart(data: VisitorData[]): void {
    const ctx = (document.getElementById('visitorStatsChart') as HTMLCanvasElement).getContext('2d')!;

    // Define the chart data and configuration
    const chartConfig: ChartConfiguration = {
        type: 'line',
        data: {
            labels: data.map(d => d.month),
            datasets: [{
                label: 'Number of Visitors',
                data: data.map(d => d.visitors),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                // Include the tension property directly here
                // Make sure that the version of Chart.js you're using supports this property
                tension: 0.1
            }]
        },
        options: {}
    };

    // Initialize the chart with the configuration
    const chart = new Chart(ctx, chartConfig);
}

// Dummy data for the example
const visitorStats: VisitorData[] = [
    { month: "January", visitors: 200 },
    { month: "February", visitors: 150 },
    { month: "March", visitors: 300 },
    // ... other months
];

// Render the chart with the dummy data
renderChart(visitorStats);
