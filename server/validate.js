const fs = require('fs');
const Path = './server/data/users.json';
module.exports = function (user) {
    let res = fs.readFileSync(Path);
    if (res) {
        if (JSON.parse(res).find((el) => {
            return validateCredentials(el, user)
        }))
            return true;
    }
    return false;
}
function validateCredentials(el, user) {
    return user.Username === el.Username && user.Password === el.Password
}