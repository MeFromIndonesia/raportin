export default function abbreviatedName(name: string): string {
  const names = name.split(" ");
  if (names.length === 1) {
    return `${names[0][0].toUpperCase()}`;
  } else {
    return names
      .slice(0, 2)
      .map((name) => name[0].toUpperCase())
      .join("");
  }
}
