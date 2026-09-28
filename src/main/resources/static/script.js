const API = "http://localhost:8080";


// ========================================
// LOAD DASHBOARD
// ========================================

async function loadDashboard() {

    try {

        const drivesResponse =
            await fetch(`${API}/api/drives`);

        const donorsResponse =
            await fetch(`${API}/api/donors`);

        const recipientsResponse =
            await fetch(`${API}/api/recipients`);

        const itemsResponse =
            await fetch(`${API}/api/items`);

        const stockResponse =
            await fetch(`${API}/api/items/stock`);


        const drives = await drivesResponse.json();
        const donors = await donorsResponse.json();
        const recipients = await recipientsResponse.json();
        const items = await itemsResponse.json();
        const stock = await stockResponse.json();


        // Dashboard counts

        document.getElementById("totalDrives").textContent =
            drives.length;

        document.getElementById("totalDonors").textContent =
            donors.length;

        document.getElementById("totalRecipients").textContent =
            recipients.length;

        document.getElementById("totalItems").textContent =
            items.length;


        // Load tables

        displayItems(items);

        displayStock(stock);

        displayDrives(drives);

    } catch (error) {

        console.error(
            "Error loading dashboard:",
            error
        );

    }

}


// ========================================
// DISPLAY ITEMS
// ========================================

function displayItems(items) {

    const table =
        document.getElementById("itemsTable");

    table.innerHTML = "";


    if (items.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    No items available
                </td>
            </tr>
        `;

        return;
    }


    items.forEach(item => {

        const row =
            document.createElement("tr");


        let actionButton = "";


        // If item is not collected
        if (!item.collected) {

            actionButton = `
                <button
                    class="action-button"
                    onclick="collectItem(${item.id})">
                    Collect
                </button>
            `;

        }

        // If item is collected but not distributed
        else if (item.collected && !item.distributed) {

            actionButton = `
                <button
                    class="action-button"
                    onclick="distributeItem(${item.id})">
                    Distribute
                </button>
            `;

        }

        // If already distributed
        else {

            actionButton = `
                <span>Completed</span>
            `;

        }


        row.innerHTML = `

            <td>${item.id}</td>

            <td>${item.itemName}</td>

            <td>${item.category}</td>

            <td>${item.quantity}</td>

            <td>
                ${item.collected ? "Yes" : "No"}
            </td>

            <td>
                ${item.distributed ? "Yes" : "No"}
            </td>

            <td>
                ${actionButton}
            </td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// DISPLAY STOCK
// ========================================

function displayStock(stock) {

    const table =
        document.getElementById("stockTable");

    table.innerHTML = "";


    if (stock.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    No stock available
                </td>
            </tr>
        `;

        return;
    }


    stock.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${item.id}</td>

            <td>${item.itemName}</td>

            <td>${item.category}</td>

            <td>${item.quantity}</td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// DISPLAY DRIVES
// ========================================

function displayDrives(drives) {

    const table =
        document.getElementById("drivesTable");

    table.innerHTML = "";


    if (drives.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No drives available
                </td>
            </tr>
        `;

        return;
    }


    drives.forEach(drive => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${drive.id}</td>

            <td>${drive.name}</td>

            <td>${drive.location}</td>

            <td>${drive.startDate}</td>

            <td>${drive.endDate}</td>

        `;


        table.appendChild(row);

    });

}


// ========================================
// DRIVE FORM
// ========================================

function showDriveForm() {

    document.getElementById("driveForm")
        .style.display = "block";

}


function hideDriveForm() {

    document.getElementById("driveForm")
        .style.display = "none";

}


async function addDrive() {

    const name =
        document.getElementById("driveName")
            .value.trim();

    const location =
        document.getElementById("driveLocation")
            .value.trim();

    const startDate =
        document.getElementById("driveStart")
            .value;

    const endDate =
        document.getElementById("driveEnd")
            .value;


    if (!name || !location || !startDate || !endDate) {

        alert("Please fill all drive fields.");

        return;

    }


    const drive = {

        name: name,

        location: location,

        startDate: startDate,

        endDate: endDate

    };


    try {

        const response =
            await fetch(`${API}/api/drives`, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(drive)

            });


        if (!response.ok) {

            throw new Error(
                "Failed to add drive"
            );

        }


        alert("Drive added successfully!");


        document.getElementById("driveName")
            .value = "";

        document.getElementById("driveLocation")
            .value = "";

        document.getElementById("driveStart")
            .value = "";

        document.getElementById("driveEnd")
            .value = "";


        hideDriveForm();

        loadDashboard();


    } catch (error) {

        console.error(
            "Error adding drive:",
            error
        );

        alert(
            "Unable to add drive."
        );

    }

}


// ========================================
// DONOR FORM
// ========================================

function showDonorForm() {

    document.getElementById("donorForm")
        .style.display = "block";

}


function hideDonorForm() {

    document.getElementById("donorForm")
        .style.display = "none";

}


async function addDonor() {

    const name =
        document.getElementById("donorName")
            .value.trim();

    const phone =
        document.getElementById("donorPhone")
            .value.trim();

    const email =
        document.getElementById("donorEmail")
            .value.trim();

    const address =
        document.getElementById("donorAddress")
            .value.trim();


    if (!name || !phone || !email || !address) {

        alert("Please fill all donor fields.");

        return;

    }


    const donor = {

        name: name,

        phone: phone,

        email: email,

        address: address

    };


    try {

        const response =
            await fetch(`${API}/api/donors`, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(donor)

            });


        if (!response.ok) {

            throw new Error(
                "Failed to add donor"
            );

        }


        alert("Donor added successfully!");


        document.getElementById("donorName")
            .value = "";

        document.getElementById("donorPhone")
            .value = "";

        document.getElementById("donorEmail")
            .value = "";

        document.getElementById("donorAddress")
            .value = "";


        hideDonorForm();

        loadDashboard();


    } catch (error) {

        console.error(
            "Error adding donor:",
            error
        );

        alert(
            "Unable to add donor."
        );

    }

}


// ========================================
// RECIPIENT FORM
// ========================================

function showRecipientForm() {

    document.getElementById("recipientForm")
        .style.display = "block";

}


function hideRecipientForm() {

    document.getElementById("recipientForm")
        .style.display = "none";

}


async function addRecipient() {

    const name =
        document.getElementById("recipientName")
            .value.trim();

    const phone =
        document.getElementById("recipientPhone")
            .value.trim();

    const email =
        document.getElementById("recipientEmail")
            .value.trim();

    const address =
        document.getElementById("recipientAddress")
            .value.trim();


    if (!name || !phone || !email || !address) {

        alert(
            "Please fill all recipient fields."
        );

        return;

    }


    const recipient = {

        name: name,

        phone: phone,

        email: email,

        address: address

    };


    try {

        const response =
            await fetch(`${API}/api/recipients`, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(recipient)

            });


        if (!response.ok) {

            throw new Error(
                "Failed to add recipient"
            );

        }


        alert(
            "Recipient added successfully!"
        );


        document.getElementById("recipientName")
            .value = "";

        document.getElementById("recipientPhone")
            .value = "";

        document.getElementById("recipientEmail")
            .value = "";

        document.getElementById("recipientAddress")
            .value = "";


        hideRecipientForm();

        loadDashboard();


    } catch (error) {

        console.error(
            "Error adding recipient:",
            error
        );

        alert(
            "Unable to add recipient."
        );

    }

}


// ========================================
// ITEM FORM
// ========================================

function showItemForm() {

    document.getElementById("itemForm")
        .style.display = "block";

}


function hideItemForm() {

    document.getElementById("itemForm")
        .style.display = "none";

}


async function addItem() {

    const itemName =
        document.getElementById("itemName")
            .value.trim();

    const category =
        document.getElementById("itemCategory")
            .value;

    const quantity =
        Number(
            document.getElementById("itemQuantity")
                .value
        );


    if (
        !itemName ||
        !category ||
        !Number.isInteger(quantity) ||
        quantity <= 0
    ) {

        alert(
            "Please enter a valid item name, category, and quantity."
        );

        return;

    }


    const item = {

        itemName: itemName,

        category: category,

        quantity: quantity,

        collected: false,

        distributed: false

    };


    try {

        const response =
            await fetch(`${API}/api/items`, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(item)

            });


        if (!response.ok) {

            throw new Error(
                "Failed to add item"
            );

        }


        alert(
            "Item added successfully!"
        );


        document.getElementById("itemName")
            .value = "";

        document.getElementById("itemCategory")
            .value = "";

        document.getElementById("itemQuantity")
            .value = "";


        hideItemForm();

        loadDashboard();


    } catch (error) {

        console.error(
            "Error adding item:",
            error
        );

        alert(
            "Unable to add item."
        );

    }

}


// ========================================
// COLLECT ITEM
// ========================================

async function collectItem(id) {

    try {

        const response =
            await fetch(
                `${API}/api/items/${id}/collect`,
                {
                    method: "PUT"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to collect item"
            );

        }


        alert(
            "Item collected successfully!"
        );


        loadDashboard();


    } catch (error) {

        console.error(
            "Error collecting item:",
            error
        );

        alert(
            "Unable to collect item."
        );

    }

}


// ========================================
// DISTRIBUTE ITEM
// ========================================

async function distributeItem(id) {

    const confirmDistribution =
        confirm(
            "Are you sure you want to distribute this item?"
        );


    if (!confirmDistribution) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API}/api/items/${id}/distribute`,
                {
                    method: "PUT"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(errorText);

        }


        alert(
            "Item distributed successfully!"
        );


        loadDashboard();


    } catch (error) {

        console.error(
            "Error distributing item:",
            error
        );

        alert(
            "Unable to distribute item. Make sure the item has been collected."
        );

    }

}


// ========================================
// START DASHBOARD
// ========================================

loadDashboard();