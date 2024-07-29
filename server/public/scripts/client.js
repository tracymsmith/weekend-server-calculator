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