if (!localStorage.User)
    localStorage.User = JSON.stringify(null);
let filterConfig = { author: '', createdAt: 0, hashTags: [] };
let content = document.querySelector('.content');
let App = document.querySelector('.App');
let main = document.querySelector('.main');
let header = document.createElement('div');
const N = 5;
header.className = 'header';
header.innerHTML = `
<div class="fl  white multiline">
    PROGRAMMING TECHNOLOGY. LAB 2.2
    Alekseenko Ivan \\ Drozd Mark \\ Izobova Maria \\ Shuldov Nikita
    
</div>
<div class="fl">
    <div class="sign">
        <div class="username roman" id="Username" style="color:#f4f4f4">Username</div>
        <button class="signb cur">Sign out</button>
    </div>
</div>
`
let header_button = header.querySelector('.signb');

let content_div = document.createElement('div');
content_div.className = 'content_div';
content_div.innerHTML = `
<div class="posts"></div>
<div class="refresh">
  <i class="material-icons refresh cur" style="font-size: 39px">refresh</i>
</div>
`

header_button.addEventListener('click', () => {
    LogIn();
})

start(JSON.parse(localStorage.User));