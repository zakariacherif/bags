document.addEventListener('DOMContentLoaded', () => {
    const productPrice = 3500;
    const deliveryPriceElement = document.getElementById('delivery-price');
    const totalPriceElement = document.getElementById('total-price');
    const wilayaSelect = document.getElementById('wilaya');

    // Debugging: Check if elements are correctly found
    if (!deliveryPriceElement || !totalPriceElement || !wilayaSelect) {
        console.error('One or more elements not found in the DOM');
        return;
    }

    // Fetch the data from the JSON file
    fetch('data.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Check the fetched data
            console.log('Fetched data:', data);

            // Populate the select element with options
            Object.keys(data).forEach(wilaya => {
                const option = document.createElement('option');
                option.value = wilaya;
                option.textContent = wilaya;
                wilayaSelect.appendChild(option);
            });

            // Add event listener for select change
            wilayaSelect.addEventListener('change', function() {
                const selectedWilaya = this.value;
                if (data[selectedWilaya]) {
                    const deliveryPrice = data[selectedWilaya].delivery_price;

                    // Update the delivery price and total price
                    deliveryPriceElement.textContent = deliveryPrice;
                    totalPriceElement.textContent = productPrice + deliveryPrice;
                } else {
                    console.error('Selected wilaya not found in data');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
});

///////////////////////////////////////////////
var sub = false;