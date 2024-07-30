// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const analyzeButton = document.getElementById('analyze-btn');
    const resultDiv = document.getElementById('result');

    let selectedSymptoms = [];

    symptomButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
            const symptom = button.getAttribute('data-symptom');

            if (selectedSymptoms.includes(symptom)) {
                selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
            } else {
                selectedSymptoms.push(symptom);
            }
        });
    });

    analyzeButton.addEventListener('click', async () => {
        if (selectedSymptoms.length === 0) {
            resultDiv.innerHTML = "<p>Please select at least one symptom.</p>";
        } else {
            const potentialDiseases = await analyzeSymptoms(selectedSymptoms);
            resultDiv.innerHTML = `<p>Based on the selected symptoms, you may have: ${potentialDiseases.join(', ')}</p>`;
        }
        resultDiv.style.display = 'block';
    });

    async function analyzeSymptoms(symptoms) {
        const response = await fetch('http://localhost:3000/diagnosis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms })
        });
        const data = await response.json();
        return data.diseases;
    }
});
