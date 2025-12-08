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
}

function downloadPDF() {
}
