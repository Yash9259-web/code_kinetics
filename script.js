
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
    }
  
}


function downloadPDF() {
}
