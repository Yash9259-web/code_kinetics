let fuelChart = null;
let trendChart = null;

const benchmarks = {
    fertilizer: 1800,
    polymer: 1400,
    refinery: 2200,
    generic: 1600
};

function getAISuggestions(total) {
    if (total < 500) return "✅ Excellent: Minimal environmental impact. Keep it up!";
    if (total < 2000) return "⚠ Moderate: Review fuel efficiency in boilers.";
    return "🚨 Critical: High Carbon Footprint! Consider renewable energy switch.";
}

function getGreenScore(total) {
    if (total < 500) return "Eco-Gold 🌿";
    if (total < 1500) return "Eco-Silver 🍃";
    return "Eco-Bronze 🍂";
}

function calculateCO2() {
    let plant = document.getElementById('plantType').value;
    let coal = Number(document.getElementById('coal').value) || 0;
    let diesel = Number(document.getElementById('diesel').value) || 0;
    let gas = Number(document.getElementById('gas').value) || 0;
  
    if (coal < 0 || diesel < 0 || gas < 0) {
        alert("Entered Value is Negative. Recheck the value and Re-Enter the data.")
    }
    else {
        const coalEF = 2.42;
        const dieselEF = 2.68;
        const gasEF = 2.00;

        let coalCO2 = coal * coalEF;
        let dieselCO2 = diesel * dieselEF;
        let gasCO2 = gas * gasEF;

        let totalEmission = coalCO2 + dieselCO2 + gasCO2;

        let benchmarkValue = benchmarks[plant];
        let difference = totalEmission - benchmarkValue;
        let suggestion = getAISuggestions(totalEmission);
        let score = getGreenScore(totalEmission);
        
        let diffClass = difference > 0 ? "negative" : "positive";
        let diffText = difference > 0 ? `${difference.toFixed(2)} (Excess)` : `${Math.abs(difference).toFixed(2)} (Saved)`;
        
        document.getElementById('resultBox').innerHTML = `
            <div class="result-item"><strong>Plant Profile:</strong> <span>${plant.toUpperCase()}</span></div>
            <div class="result-item"><strong>Total Emissions:</strong> <span>${totalEmission.toFixed(2)} kg CO₂</span></div>
            <div class="result-item"><strong>Industry Benchmark:</strong> <span>${benchmarkValue} kg CO₂</span></div>
            <div class="result-item ${diffClass}"><strong>Performance:</strong> <span>${diffText}</span></div>
            <div class="result-item"><strong>Green Score:</strong> <span>${score}</span></div>
            <div class="suggestion-box"><strong>♻ AI Recommendation:</strong><br>${suggestion}</div>
        `;
        updateCharts(coalCO2, dieselCO2, gasCO2, totalEmission);
    }
  
}

function updateCharts(coalCO2, dieselCO2, gasCO2, totalEmission) {
    const fuelCtx = document.getElementById('fuelBreakdownChart').getContext('2d');
    if (fuelChart) fuelChart.destroy();
    fuelChart = new Chart(fuelCtx, {
        type: 'doughnut',
        data: {
            labels: ['Coal', 'Diesel', 'Natural Gas'],
            datasets: [{
                data: [coalCO2, dieselCO2, gasCO2],
                backgroundColor: ['#455a64', '#fb8c00', '#43a047'],
                borderWidth: 1
            }]
        }
    });

    
    const trendCtx = document.getElementById('emissionTrendChart').getContext('2d');
    if (trendChart) trendChart.destroy();
    let pastData = [
        totalEmission * 0.9,
        totalEmission * 1.1,
        totalEmission * 0.95,
        totalEmission * 1.05,
        totalEmission * 0.85,
        totalEmission
    ];
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Today'],
            datasets: [{
                label: 'CO₂ Levels',
                data: pastData,
                borderColor: '#2e7d32',
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { scales: { y: { beginAtZero: true } } }
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(46, 125, 50);
    doc.text("EcoTrack Emission Report", 10, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    let content = document.getElementById('resultBox').innerText;
    let lines = content.split('\n').filter(line => line.trim() !== "");

    let y = 40;
    lines.forEach(line => {
        doc.text(line, 10, y);
        y += 10;
    });

    doc.save("EcoTrack_Report.pdf");
}
