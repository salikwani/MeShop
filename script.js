
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

signupBtn.addEventListener('click', (e) => {
    var link = document.createElement('a');
    link.href = "./signup/index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

loginBtn.addEventListener('click', () => {
    var link = document.createElement('a');
    link.href = "./login/index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
