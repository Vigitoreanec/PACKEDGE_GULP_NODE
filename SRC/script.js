// тут комментарий
function
  sayHello(event) {
  const
    hello = `Hello, `,
    user = `User!!! `,
    from = 'From ';
  alert(
    hello + user + from + event.target.tagName
  )
}