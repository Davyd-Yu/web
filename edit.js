const nameEdit = document.getElementById("name_input_edit");
const capacityEdit = document.getElementById("capacity_input_edit");
const attendanceEdit = document.getElementById("attendance_input_edit");
const costEdit = document.getElementById("cost_input_edit");

let selectedComplexId = null; // Will store the ID of the selected complex

const chooseModel = document.querySelector(".choose_complex");
chooseModel.addEventListener('submit', async function (e) {
    e.preventDefault();
    const complexNameToEdit = document.getElementById('complex_to_edit').value;
    const editingForm = document.querySelector(".editing_form");

    try {
        // Get complex by name
        const response = await fetch(`http://localhost:5050/api/complexs/name/${complexNameToEdit}`);
        if (response.status === 404) {
            alert('Complex not found. Please check the name.');
            editingForm.classList.remove("active"); // Hide the form if not found
            return;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const complexToEdit = await response.json();

        if (complexToEdit) {
            selectedComplexId = complexToEdit.id; // Store the ID
            editingForm.classList.add("active");
            nameEdit.value = complexToEdit.name;
            capacityEdit.value = complexToEdit.capacity;
            attendanceEdit.value = complexToEdit.attendance;
            costEdit.value = complexToEdit.cost;
        } else {
            alert('Complex not found. Please check the name.');
            editingForm.classList.remove("active");
        }
    } catch (error) {
        console.error('Error fetching complex for edit:', error);
        alert('An error occurred while fetching the complex.');
        editingForm.classList.remove("active");
    }
});

const finishEditing = document.querySelector(".editing_form");
finishEditing.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!selectedComplexId) {
        alert('No complex selected for editing.');
        return;
    }

    const editedComplexData = {
        name: nameEdit.value,
        capacity: parseInt(capacityEdit.value),
        attendance: parseInt(attendanceEdit.value),
        cost: parseFloat(costEdit.value)
    };

    try {
        const response = await fetch(`http://localhost:5050/api/complexs/${selectedComplexId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedComplexData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        alert('Complex updated successfully!');
        window.location.href = "index.html"; // Redirect after successful update
    } catch (error) {
        console.error('Error updating complex:', error);
        alert(`Failed to update complex: ${error.message}`);
    }
});
