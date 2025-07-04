document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.add_class');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name_input').value;
        const capacity = parseInt(document.getElementById('capacity_input').value);
        const attendance = parseInt(document.getElementById('attendance_input').value);
        const cost = parseFloat(document.getElementById('cost_input').value); // Cost can be a decimal

        const newComplex = {
            name: name,
            capacity: capacity,
            attendance: attendance,
            cost: cost
        };

        try {
            const response = await fetch('http://localhost:5050/api/complexs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComplex),
            });

            if (!response.ok) {
                // Handle server errors (e.g., if the name already exists)
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const createdComplex = await response.json();
            console.log('Complex created successfully:', createdComplex);

            // Clear form fields
            document.getElementById('name_input').value = '';
            document.getElementById('capacity_input').value = '';
            document.getElementById('attendance_input').value = '';
            document.getElementById('cost_input').value = '';

            window.location.href = "index.html"; // Redirect to the main page
        } catch (error) {
            console.error('Error creating complex:', error);
            alert(`Failed to create complex: ${error.message}`);
        }
    });
});
