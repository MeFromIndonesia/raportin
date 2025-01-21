interface Opts {
  maxLength?: number | false;
}

export default function getAbbreviation(name: string, options?: Opts): string {
  const names = name.split(" ");
  if (names.length === 1) {
    return `${names[0][0].toUpperCase()}`;
  } else {
    const maxLength = options?.maxLength === false ? names.length : options?.maxLength || 2;

    return names
      .slice(0, maxLength)
      .map((name) => name[0].toUpperCase())
      .join("");
  }
}
