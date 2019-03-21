// your code here
function getRepositories() {
  const name = document.getElementById('username').value;
  const uri = 'https://api.github.com' + '/users/' + name + '/repos'

  const req = new XMLHttpRequest();
  req.open('GET', uri);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList =
  '<ul>' +
  repos.map(
    repo => {
      const username = 'data-username="' + repo.owner.login + '"';
      const reponame = 'data-repository="' + repo.name + '"';
      return `
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}"><${repo.html_url}></a>
        </li>
      `
    }
  )

    .join('')
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList; //this displays repolist on HTML
}

//el.dataset.username - like saying repository.username? why can't we jsut say that??
//GET /repos/:owner/:repo/commits
function getCommits(el) {
  const req = new XMLHttpRequest();
  const repoName = el.dataset.repository;
  const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/commits'

  req.open('GET', uri);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit => '<li><h3>' +
      commit.commit.author.name +
      ' (' +
      commit.author.login +
      ')</h3>' +
      commit.commit.message +
      '</li>'
    )
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList
}
//GET /repos/:owner/:repo/branches
function getBranches(el) {
  const req = new XMLHttpRequest();
  const repoName = el.dataset.repository;
  const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/branches'

  req.open('GET', uri);
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '<li>')
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList
}
