document.addEventListener('DOMContentLoaded', function () {
    let complexs = []; // Initialize an empty array, data will be loaded from the API

    // Function to load complexes from the backend and display them
    async function loadAndRenderComplexs() {
        try {
            const response = await fetch('http://localhost:5050/api/complexs');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            complexs = await response.json();
            displayObjectsOnPage(complexs);
        } catch (error) {
            console.error('Error loading complexs:', error);
            // You can add a message to the user that an error occurred
        }
    }

    // Load complexes when the page loads
    loadAndRenderComplexs();

    // Function for sorting by descending capacity
    function sortComplexsCapacity() {
        complexs.sort(function (a, b) {
            return b.capacity - a.capacity;
        });
        displayObjectsOnPage(complexs); // Use displayObjectsOnPage for re-rendering
    }

    const CapacityDes = document.getElementById("capacity__des");
    CapacityDes.addEventListener("click", sortComplexsCapacity);

    // Function for sorting by ascending capacity
    const CapacityAsc = document.getElementById("capacity__asc");
    CapacityAsc.addEventListener("click", function () {
        complexs.sort(function (a, b) {
            return a.capacity - b.capacity;
        });
        displayObjectsOnPage(complexs);
    });

    // Updated logic for the "Count total attendance" button
    const countButton = document.getElementById('count');
    const totalAttendanceElement = document.getElementById('totalAttendance');

    countButton.addEventListener('click', () => {
        // Since complexs are already loaded, just use them
        let total_attendance = 0;
        for (let i of complexs) {
            total_attendance += i.attendance;
        }
        totalAttendanceElement.textContent = total_attendance;
    });

    // Updated findComplex function
    const findButton = document.getElementById("find_button");
    const findInput = document.getElementById("find_input");
    const resultDiv = document.getElementById("result"); // Renamed to avoid conflict with global `result` variable

    findButton.addEventListener("click", async function (event) {
        event.preventDefault();
        resultDiv.classList.add('active'); // Or toggle if you want it to disappear on second click
        const findName = findInput.value.toLowerCase();

        try {
            const response = await fetch(`http://localhost:5050/api/complexs/name/${findName}`);
            if (response.status === 404) {
                resultDiv.innerHTML = 'Complex not found. Check the spelling of the name.';
                return;
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const foundComplex = await response.json();

            if (foundComplex) {
                resultDiv.innerHTML = `
                    Name: ${foundComplex.name}<br>
                    Capacity: ${foundComplex.capacity}<br>
                    Attendance: ${foundComplex.attendance}<br>
                    Cost: ${foundComplex.cost}<br>
                `;
            } else {
                resultDiv.innerHTML = 'Complex not found. Check the spelling of the name.';
            }
        } catch (error) {
            console.error('Error finding complex:', error);
            resultDiv.innerHTML = 'An error occurred while searching for the complex.';
        }
    });

    // Updated displayObjectsOnPage function for correct deletion button functionality
    function displayObjectsOnPage(objects) {
        const allComplexs = document.querySelector(".complexs_selec");
        allComplexs.innerHTML = '';
        objects.forEach((object) => { // Removed `index` as we delete by `id` from the backend
            const displayElement = document.createElement("div");
            displayElement.classList.add("complex_container");
            displayElement.innerHTML = `
                <div class="name">
                    <p>Name: ${object.name}</p>
                </div>
                <div class="capacity">
                    <p>Capacity: ${object.capacity}</p>
                </div>
                <div class="attendance">
                    <p>Attendance: ${object.attendance}</p>
                </div>
                <div class="cost">
                    <p>Cost: ${object.cost}</p>
                </div>
                <div class="buttons">
                    <button class="delete_button" data-id="${object.id}">Delete</button>
                </div>
            `;
            displayElement.addEventListener('click', () => {
                displayElement.classList.toggle('selected');
            });

            const deleteButton = displayElement.querySelector('.delete_button');
            deleteButton.addEventListener('click', async (event) => {
                const complexId = event.target.dataset.id; // Get ID from data-attribute
                try {
                    const response = await fetch(`http://localhost:5050/api/complexs/${complexId}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // If deletion is successful, reload the list of complexes
                    loadAndRenderComplexs();
                } catch (error) {
                    console.error('Error deleting complex:', error);
                    alert('Failed to delete complex. Please try again.');
                }
            });

            allComplexs.appendChild(displayElement);
        });
    }
});
