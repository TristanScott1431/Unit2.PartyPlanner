const COHORT = '2309-FTB-ET-WEB-FT'
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`



async function fetchPartyData() {
    const partyList = document.getElementById("party-list");

    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        let eventData = await response.json();

        // Ensure eventData is an array
        if (!Array.isArray(eventData)) {
            // If eventData is a single event object, convert it to an array
            eventData = [eventData];
        }

        partyList.innerHTML = '';

        eventData.forEach(function(event) {
            const listItem = document.createElement("li");

            listItem.innerHTML = `
                <span>Name: ${event.name}</span>
                <span>Date: ${new Date(event.date).toLocaleDateString()}</span>
                <span>Time: ${new Date(event.date).toLocaleTimeString()}</span>
                <span>Location: ${event.location}</span>
                <span>Description: ${event.description}</span>
                <button class="delete-button" data-id="${event.id}">Delete</button>
            `;

            partyList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
}


fetchPartyData();

const addPartyForm = document.getElementById('add-party-form');

 addPartyForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(addPartyForm);

    try {
        const response =  await fetch(API, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to submit the form');
        }

        
        fetchPartyData();
    } catch (error) {
        console.error(error);
    }
});
