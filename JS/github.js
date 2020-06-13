class Github {
  constructor() {
    this.client_id = "e5c2ee1dc64635cdc615";
    this.client_secret = "75640ef6324cc27b24bc3652c8e155154b831112";
    this.repos_count = 8;
    this.repos_sort = 'star';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
  async getrepos(lang) {
    const repoResponse = await fetch(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);
    const repos = await repoResponse.json();

    return {
      repos
    }
  }
}

class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  // Display Profile in UI
  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
      
        <div class="row">

          <div class="col-md-3">

            <img class="img-fluid mb-2" src="${user.avatar_url}">

            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>

          </div>

          <div class="col-md-9">

            <span class="badge badge-primary">
              Public Repos: ${user.public_repos}
            </span>

            <span class="badge badge-secondary">
              Public Gists: ${user.public_gists}
            </span>

            <span class="badge badge-success">
              Followers: ${user.followers}
            </span>

            <span class="badge badge-info">
              Following: ${user.following}
            </span>

            <br><br>

            <ul class="list-group">
              <li class="list-group-item detail">Company: ${user.company}</li>
              <li class="list-group-item detail">Website / Blog: ${user.blog}</li>
              <li class="list-group-item detail">Location: ${user.location}</li>
              <li class="list-group-item detail">Member Since: ${user.created_at}</li>
            </ul>
            
          </div>

        </div>

      </div>

      <h3 class="page-heading mb-3 text-dark">Latest Repos</h3>
      <div id="repos"></div>
    `
  }

  // Show user Repos
  showRepos(repos) {
    let output = "";

    repos.forEach(function(repo) {
      output += `
      <div class="card card-body mb-2">

        <div class="row">

          <div class="col-md-6">

            <a href="${repo.html_url}" target="_blank" class="text-white">${repo.name}</a>

          </div>

          <div class="col-md-6">
          
            <span class="badge badge-primary">
              Stars: ${repo.stargazers_count}
            </span>

            <span class="badge badge-secondary">
              Watchers: ${repo.watchers_count}
            </span>

            <span class="badge badge-success">
              Forks: ${repo.forms_count}
            </span>

          </div>

        </div>

      </div>
      `
    });

    document.getElementById('repos').innerHTML = output;

  }

  // Show Alert Message
  showAlert(message, className) {
    // Clear any remaining alerts
    this.clearAlert();
    const div = document.createElement('div');
    // Add classes to our alert div
    div.className = className;
    // Test inside our alert box
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.searchContainer');
    // Get search box
    const search = document.querySelector('.search');
    // Insert Alert
    container.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear the profile
  clearProfile() {
    this.profile.innerHTML = "";
  }
  showPopular(items) {
    let output = "";
    items.forEach(item => {
      console.log(item)
      output = output + `
      <div class="card">
      <img src=${item.owner.avatar_url} class="repo-img" alt="image not available">
      <div class="card-body">
        <h5 class="card-title">Name - ${item.name} </h5>
        <h5 class="card-title">Description - ${item.description} </h5>
        <h5 class="card-title">Stars <i class="fas fa-star"></i>- ${item.stargazers_count} </h5>
        <p class="card-text">Forks <i class="fas fa-code-branch"></i> - ${item.forks}</p>
        <p class="card-text">Issues <i class="fa fa-warning"></i> - ${item.open_issues} </p>
      </div>
    </div>
      `;
    })
    document.getElementById("repoRes").innerHTML = output;
  }
}

// Init Github
const github = new Github();

// Init UI
const ui = new UI();

// Search Input
const searchUser = document.getElementById('searchUser');
const repofind = document.getElementById('findRepos');
// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  if(userText !== ""){
    // Make http call
    github.getUser(userText)
    .then(data => { 
      if(data.profile.message === 'Not Found') {
        // Show Alert
        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        // Show Profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    })
  } else {
    // Clear Profile
    ui.clearProfile();
  }
});

repofind.addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("target").innerHTML = `
                    <div class="search">

                    <h1 class="text-center text-dark">Popular Github Repositories</h1>
                    <select id="sort" class="text-center">
                    <option value="" disabled selected hidden>Filter By :-</option>
                    <option value="javascript">JavaScript</option>
                    <option value="ruby">Ruby</option>
                    <option value="c++">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="go">Go</option>
                    </select>

                    </div>

                    <br>
                    <div class="d-flex justify-content-center">
                    <div id="repoRes" class="container-fluid">
                    <p class="temp-git">Search poplar github repositories</p>
                    </div>
                    </div>
  `;
  const searchBtn = document.getElementById('search-repo');
  const filter = document.getElementById("sort");
  filter.addEventListener("change", (e) => {
    github.getrepos(e.target.value).then(data => {
      ui.showPopular(data.repos.items)
    })
  });
});