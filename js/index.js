document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form behavior
  
      const query = document.getElementById("search").value.trim();
      if (query) {
        searchUsers(query);
      }
    });
  
    // Function to search users
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      })
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    // Function to display users
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      reposList.innerHTML = ""; // Clear repos list
  
      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-card";
  
        userDiv.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="100" />
          <h3>${user.login}</h3>
          <a href="${user.html_url}" target="_blank">View Profile</a>
          <button data-username="${user.login}">View Repos</button>
        `;
  
        // Add event listener to "View Repos" button
        const viewReposButton = userDiv.querySelector("button");
        viewReposButton.addEventListener("click", () =>
          fetchUserRepos(viewReposButton.dataset.username)
        );
  
        userList.appendChild(userDiv);
      });
    }
  
    // Function to fetch and display user repositories
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      })
        .then((response) => response.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => console.error("Error fetching repos:", error));
    }
  
    // Function to display repositories
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous repos list
  
      repos.forEach((repo) => {
        const repoItem = document.createElement("div");
        repoItem.className = "repo-item";
  
        repoItem.innerHTML = `
          <h4>${repo.name}</h4>
          <p>${repo.description || "No description available"}</p>
          <a href="${repo.html_url}" target="_blank">View Repo</a>
        `;
  
        reposList.appendChild(repoItem);
      });
    }
  });
  