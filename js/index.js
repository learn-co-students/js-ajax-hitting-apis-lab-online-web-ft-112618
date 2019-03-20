function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  const url = `https://api.github.com/users/${username}/repos`
  req.addEventListener('load', displayRepositories)
  req.open('GET', url)
  req.send()
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  let repoList =
    '<ul>' +
    repos.map((r) => {
      const dataUsername = 'data-username="' + r.owner.login + '"'
      const dataRepoName = 'data-repository="' + r.name + '"'
      return `
      <li>
        <p>${r.name}<br>
        ${r.html_url}<br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)" >Get commits</a>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)" >Get branches</a></p>
      </li>
      `
    }).join('') +
    '</ul>'
    debugger
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList =
  `<ul>${commits
    .map((commit) => {
      return `
      <li><strong>
      ${commit.commit.author.name}
      </strong> -
      ${commit.author.login} <br>
      ${commit.commit.message}<br><br>
      </li>
      `
    }).join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + el.dataset.repository + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList =
  `<ul>${branches
    .map((branch) => {
      return `
      <li>
      ${branch.name}
      </li>
      `
    }).join('')}</ul>`
    debugger
  document.getElementById('details').innerHTML = branchList
}
