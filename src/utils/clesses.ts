const clesses = {
  text: (value: string) => {
    return {
      color: value,
    };
  },
  bg: (value: string) => {
    return {
      backgroundColor: value,
    };
  },
  border: (value: string) => {
    return {
      borderColor: value,
    };
  },
  placeholder: (value: string) => {
    return {
      placeholderColor: value,
    };
  },
  ring: (value: string) => {
    return {
      ringColor: value,
    };
  },
  "ring-offset": (value: string) => {
    return {
      ringOffsetColor: value,
    };
  },
  accent: (value: string) => {
    return {
      accentColor: value,
    };
  },
  fill: (value: string) => {
    return {
      fill: value,
    };
  },
};

export default clesses;
