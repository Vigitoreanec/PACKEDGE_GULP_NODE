// тут комментарий
function
  sayHello(event) {
  const
    hello = `Hello, `,
    user = `User man`,
    from = 'from ';
  alert(
    hello + user + from + event.target.tagName
  )
}
