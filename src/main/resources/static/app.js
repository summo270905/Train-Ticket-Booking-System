// API Configuration
const API_BASE_URL = 'http://localhost:8080';

// API Endpoints
const ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    TRAINS: `${API_BASE_URL}/trains`,
    BOOKINGS: `${API_BASE_URL}/bookings`
};

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupForms();
    loadAllData();
}

// Navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');

            // Update active states
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(`${targetSection}-section`).classList.add('active');

            // Load data for the active section
            if (targetSection === 'users') loadUsers();
            else if (targetSection === 'trains') loadTrains();
            else if (targetSection === 'bookings') {
                loadBookings();
                loadUsersForDropdown();
                loadTrainsForDropdown();
            }
        });
    });
}

// Form Setup
function setupForms() {
    // User Form
    document.getElementById('user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveUser();
    });

    // Train Form
    document.getElementById('train-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveTrain();
    });

    // Booking Form
    document.getElementById('booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveBooking();
    });
}

// Load all initial data
function loadAllData() {
    loadUsers();
    loadTrains();
    loadBookings();
}

// ==================== USER OPERATIONS ====================

async function loadUsers() {
    try {
        const response = await fetch(ENDPOINTS.USERS);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        showToast('Error loading users', 'error');
        console.error('Error:', error);
    }
}

function displayUsers(users) {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No users found</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-success" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function saveUser() {
    const userId = document.getElementById('user-id').value;
    const user = {
        name: document.getElementById('user-name').value,
        email: document.getElementById('user-email').value,
        phone: document.getElementById('user-phone').value
    };

    try {
        let response;
        if (userId) {
            // Update existing user
            response = await fetch(`${ENDPOINTS.USERS}/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        } else {
            // Create new user
            response = await fetch(ENDPOINTS.USERS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        }

        if (response.ok) {
            showToast(userId ? 'User updated successfully' : 'User created successfully', 'success');
            resetUserForm();
            loadUsers();
        } else {
            const error = await response.text();
            showToast(`Error: ${error}`, 'error');
        }
    } catch (error) {
        showToast('Error saving user', 'error');
        console.error('Error:', error);
    }
}

async function editUser(id) {
    try {
        const response = await fetch(`${ENDPOINTS.USERS}/${id}`);
        const user = await response.json();

        document.getElementById('user-id').value = user.id;
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-phone').value = user.phone;

        // Scroll to form
        document.querySelector('#users-section .form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showToast('Error loading user details', 'error');
        console.error('Error:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`${ENDPOINTS.USERS}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('User deleted successfully', 'success');
            loadUsers();
        } else {
            showToast('Error deleting user', 'error');
        }
    } catch (error) {
        showToast('Error deleting user', 'error');
        console.error('Error:', error);
    }
}

function resetUserForm() {
    document.getElementById('user-form').reset();
    document.getElementById('user-id').value = '';
}

// ==================== TRAIN OPERATIONS ====================

async function loadTrains() {
    try {
        const response = await fetch(ENDPOINTS.TRAINS);
        const trains = await response.json();
        displayTrains(trains);
    } catch (error) {
        showToast('Error loading trains', 'error');
        console.error('Error:', error);
    }
}

function displayTrains(trains) {
    const tbody = document.querySelector('#trains-table tbody');
    tbody.innerHTML = '';

    if (trains.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No trains found</td></tr>';
        return;
    }

    trains.forEach(train => {
        const row = `
            <tr>
                <td>${train.id}</td>
                <td>${train.trainName}</td>
                <td>${train.trainNumber}</td>
                <td>${train.source}</td>
                <td>${train.destination}</td>
                <td>$${train.ticketPrice}</td>
                <td>${train.totalSeats}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-success" onclick="editTrain(${train.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteTrain(${train.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function saveTrain() {
    const trainId = document.getElementById('train-id').value;
    const train = {
        trainName: document.getElementById('train-name').value,
        trainNumber: document.getElementById('train-number').value,
        source: document.getElementById('train-source').value,
        destination: document.getElementById('train-destination').value,
        ticketPrice: parseFloat(document.getElementById('train-price').value),
        totalSeats: parseInt(document.getElementById('train-seats').value)
    };

    try {
        let response;
        if (trainId) {
            // Update existing train
            response = await fetch(`${ENDPOINTS.TRAINS}/${trainId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(train)
            });
        } else {
            // Create new train
            response = await fetch(ENDPOINTS.TRAINS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(train)
            });
        }

        if (response.ok) {
            showToast(trainId ? 'Train updated successfully' : 'Train created successfully', 'success');
            resetTrainForm();
            loadTrains();
        } else {
            const error = await response.text();
            showToast(`Error: ${error}`, 'error');
        }
    } catch (error) {
        showToast('Error saving train', 'error');
        console.error('Error:', error);
    }
}

async function editTrain(id) {
    try {
        const response = await fetch(`${ENDPOINTS.TRAINS}/${id}`);
        const train = await response.json();

        document.getElementById('train-id').value = train.id;
        document.getElementById('train-name').value = train.trainName;
        document.getElementById('train-number').value = train.trainNumber;
        document.getElementById('train-source').value = train.source;
        document.getElementById('train-destination').value = train.destination;
        document.getElementById('train-price').value = train.ticketPrice;
        document.getElementById('train-seats').value = train.totalSeats;

        // Scroll to form
        document.querySelector('#trains-section .form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showToast('Error loading train details', 'error');
        console.error('Error:', error);
    }
}

async function deleteTrain(id) {
    if (!confirm('Are you sure you want to delete this train?')) return;

    try {
        const response = await fetch(`${ENDPOINTS.TRAINS}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Train deleted successfully', 'success');
            loadTrains();
        } else {
            showToast('Error deleting train', 'error');
        }
    } catch (error) {
        showToast('Error deleting train', 'error');
        console.error('Error:', error);
    }
}

function resetTrainForm() {
    document.getElementById('train-form').reset();
    document.getElementById('train-id').value = '';
}

// ==================== BOOKING OPERATIONS ====================

async function loadBookings() {
    try {
        const response = await fetch(ENDPOINTS.BOOKINGS);
        const bookings = await response.json();
        displayBookings(bookings);
    } catch (error) {
        showToast('Error loading bookings', 'error');
        console.error('Error:', error);
    }
}

function displayBookings(bookings) {
    const tbody = document.querySelector('#bookings-table tbody');
    tbody.innerHTML = '';

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No bookings found</td></tr>';
        return;
    }

    bookings.forEach(booking => {
        const row = `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.user ? booking.user.id : 'N/A'}</td>
                <td>${booking.train ? booking.train.id : 'N/A'}</td>
                <td>${booking.travelDate}</td>
                <td>${booking.seatNumber}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-danger" onclick="deleteBooking(${booking.id})">Cancel</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

async function loadUsersForDropdown() {
    try {
        const response = await fetch(ENDPOINTS.USERS);
        const users = await response.json();
        const select = document.getElementById('booking-user');
        select.innerHTML = '<option value="">-- Select User --</option>';
        
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.name} (${user.email})`;
            select.appendChild(option);
        });
    } catch (error) {
        showToast('Error loading users for dropdown', 'error');
        console.error('Error:', error);
    }
}

async function loadTrainsForDropdown() {
    try {
        const response = await fetch(ENDPOINTS.TRAINS);
        const trains = await response.json();
        const select = document.getElementById('booking-train');
        select.innerHTML = '<option value="">-- Select Train --</option>';
        
        trains.forEach(train => {
            const option = document.createElement('option');
            option.value = train.id;
            option.textContent = `${train.trainName} (${train.trainNumber}) - ${train.source} to ${train.destination}`;
            select.appendChild(option);
        });
    } catch (error) {
        showToast('Error loading trains for dropdown', 'error');
        console.error('Error:', error);
    }
}

async function saveBooking() {
    const booking = {
        userId: parseInt(document.getElementById('booking-user').value),
        trainId: parseInt(document.getElementById('booking-train').value),
        travelDate: document.getElementById('booking-date').value,
        seatNumber: parseInt(document.getElementById('booking-seat').value)
    };

    try {
        const response = await fetch(ENDPOINTS.BOOKINGS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            showToast('Booking created successfully', 'success');
            resetBookingForm();
            loadBookings();
        } else {
            const error = await response.text();
            showToast(`Error: ${error}`, 'error');
        }
    } catch (error) {
        showToast('Error creating booking', 'error');
        console.error('Error:', error);
    }
}

async function deleteBooking(id) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
        const response = await fetch(`${ENDPOINTS.BOOKINGS}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Booking cancelled successfully', 'success');
            loadBookings();
        } else {
            showToast('Error cancelling booking', 'error');
        }
    } catch (error) {
        showToast('Error cancelling booking', 'error');
        console.error('Error:', error);
    }
}

function resetBookingForm() {
    document.getElementById('booking-form').reset();
}

// ==================== UTILITY FUNCTIONS ====================

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Set minimum date for booking to today
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
