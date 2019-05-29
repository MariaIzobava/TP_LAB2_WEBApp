function login(user) {
    let body = JSON.stringify({
        Username:user.Username,
        Password:user.Password
      });
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/users', false);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(body);
      if (xhr.status == 200&&JSON.parse(xhr.response))
        return true;
      else
        return false;
}