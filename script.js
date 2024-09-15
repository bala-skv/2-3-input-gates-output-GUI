function generateTruthTable() {
    const inputSize = parseInt(document.getElementById('inputSize').value);
    const gateType = document.getElementById('gateType').value;
    const truthTableBody = document.querySelector('#truthTable tbody');
    const input3Header = document.getElementById('input3Header');

    // Clear the previous table content
    truthTableBody.innerHTML = '';

    // Show/Hide the third input column based on input size
    if (inputSize === 3) {
        input3Header.style.display = 'table-cell';
    } else {
        input3Header.style.display = 'none';
    }

    // Generate truth table for 2 or 3 inputs
    const rows = inputSize === 2 ? 4 : 8;

    for (let i = 0; i < rows; i++) {
        let input1 = (i >> (inputSize - 1)) & 1;
        let input2 = (i >> (inputSize - 2)) & 1;
        let input3 = inputSize === 3 ? (i >> (inputSize - 3)) & 1 : null;

        let output = calculateOutput(gateType, input1, input2, input3, inputSize);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${input1}</td>
            <td>${input2}</td>
            ${inputSize === 3 ? `<td>${input3}</td>` : ''}
            <td>${output}</td>
        `;
        truthTableBody.appendChild(row);
    }
}

function calculateOutput(gateType, input1, input2, input3, inputSize) {
    let result;
    switch (gateType) {
        case 'AND':
            result = inputSize === 2 ? input1 && input2 : input1 && input2 && input3;
            break;
        case 'OR':
            result = inputSize === 2 ? input1 || input2 : input1 || input2 || input3;
            break;
        case 'XOR':
            result = inputSize === 2 ? input1 ^ input2 : input1 ^ input2 ^ input3;
            break;
        case 'NOR':
            result = inputSize === 2 ? !(input1 || input2) : !(input1 || input2 || input3);
            break;
        case 'NAND':
            result = inputSize === 2 ? !(input1 && input2) : !(input1 && input2 && input3);
            break;
    }
    return result ? 1 : 0;
}

// Initialize the table on page load
window.onload = generateTruthTable;
