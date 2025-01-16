const getCapitalize = (str: string): string =>
  str
    .split(" ")
    .map((word) => {
      const match = word.match(/^([\W]*)([a-zA-Z0-9']+)([\W]*)$/);
      if (match) {
        const [, leading, core, trailing] = match;
        return leading + core.charAt(0).toUpperCase() + core.slice(1) + trailing;
      }
      return word;
    })
    .join(" ");

export default getCapitalize;
