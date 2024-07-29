console.log('client.js is sourced!');
let selectedOperator = '';

function setOperator(operator){
    console.log('Operator Set:', operator);
    selectedOperator = operator;
}
function clearInputs(){
    document.querySelector('[data-testid="numOne"]').value = '';
    document.querySelector('[data-testid="numTwo"]').value = '';
    selectedOperator = '';
    console.log('Inputs Cleared:');
}
function handleSubmit(event){
    event.preventDefault();
    const numOneInput = document.querySelector('[data-testid="numOne"]');
    const numTwoInput = document.querySelector('[data-testid="numTwo"]');
    const numOne = Number(numOneInput.value);
    const numTwo = Number(numTwoInput.value);
    const calculationData = {
        numOne,
        numTwo,
        operator: selectedOperator
    };
    console.log('Submit Function Working:', handleSubmit);

    axios.post('/calculations', calculationData)
    .then(response => {
        updateUI();
        console.log('Response from Server:', response);
    })
    .catch(error => {
        console.log('Error:', error);
    })
}
function updateUI(){
    axios.get('/calculations')
    .then(response => {
        const data = response.data;
        const resultHistory = document.querySelector('[data-testid="resultHistory"]');
        const recentResult = document.querySelector('[data-testid="recentResult"]');
        
        resultHistory.innerHTML = '';
        console.log('Updated UI with Data:', data);
        for (let i = 0; i < data.length; i++){
            const calculation = data[i];
            const resultItem = document.createElement('div');
            resultItem.textContent = `${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}`;
            resultHistory.appendChild(resultItem);
        }
        if (data.length > 0){
            const latestCalculation = data[data.length - 1];
            recentResult.textContent = `Most Recent Results: ${latestCalculation.result}`;
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}
document.addEventListener('DOMContentLoad', function(){
    updateUI();
    console.log('Updated Loaded Calculations:');
});