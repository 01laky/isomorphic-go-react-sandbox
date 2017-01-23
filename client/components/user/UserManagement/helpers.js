const names = ['Jan', 'Petr', 'Milan', 'Honza', 'Albert', 'Matej', 'Laco', 'Ondrej', 'Tomas'];

export function getRandomString() {
  let randomString = names[Math.floor(Math.random() * names.length - 1)];
  if (!randomString) {
    randomString = getRandomString();
  }
  return randomString;
}
