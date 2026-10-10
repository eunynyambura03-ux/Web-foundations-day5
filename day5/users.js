// Day 5 - Fetching users from an API with fetch, async/await and try/catch/finally

const loadUsersBtn = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusEl = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

let users = [];

// Render any array of users into the list
function renderUsers(list) {
  usersList.textContent = "";
  if (list.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No users match your filter.";
    usersList.appendChild(empty);
    return;
  }
  list.forEach(function (user) {
    const li = document.createElement("li");

    const nameEl = document.createElement("strong");
    nameEl.textContent = user.name;

    const emailEl = document.createElement("p");
    emailEl.textContent = "Email: " + user.email;

    const cityEl = document.createElement("p");
    cityEl.textContent = "City: " + user.address.city;

    const companyEl = document.createElement("p");
    companyEl.textContent = "Company: " + user.company.name;

    li.appendChild(nameEl);
    li.appendChild(emailEl);
    li.appendChild(cityEl);
    li.appendChild(companyEl);
    usersList.appendChild(li);
  });
}

// Fetch the users and display them
async function loadUsers() {
  try {
    statusEl.textContent = "Loading users...";
    loadUsersBtn.disabled = true;
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    users = await response.json();
    statusEl.textContent = "Loaded " + users.length + " users.";
    renderUsers(users);
  } catch (error) {
    statusEl.textContent = "Could not load users: " + error.message;
    usersList.textContent = "";
  } finally {
    loadUsersBtn.disabled = false;
  }
}

// Filter the stored users without making a new request
filterInput.addEventListener("input", function () {
  const query = filterInput.value.trim().toLowerCase();
  if (query === "") {
    renderUsers(users);
    return;
  }
  const filtered = users.filter(function (user) {
    return user.name.toLowerCase().includes(query);
  });
  renderUsers(filtered);
});

loadUsersBtn.addEventListener("click", loadUsers);
