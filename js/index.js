// your code here
function displayCommits() {
  let commits = JSON.parse(this.responseText)
  let commitsList = `<ul>
  ${commits.map(c => `
    <li><strong>${c.commit.author.name}</strong> - ${c.author.login} - ${c.commit.message}</li>
    `).join('')}
  </ul>`
  let detailsElement = document.querySelector('#details')
  detailsElement.innerHTML = commitsList
}

function getCommits(el) {
  let repoName = el.dataset.repository
  let username = el.dataset.username
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits)
  if (!repoName) {debugger;}
  req.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits`)
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  let reposList = "<ul>" + repos
    .map(r => `<li>${r.name} - <a href="${r.html_url}" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this);return false;">Get Commits</a></li>`)
    .join('') + "</ul>"
  let repoElement = document.querySelector('#repositories')
  repoElement.innerHTML = reposList
}

function getRepositories() {
  let username = document.querySelector('#username').value
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos')
  req.send();
}
