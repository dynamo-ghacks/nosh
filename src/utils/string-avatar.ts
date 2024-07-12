const stringToColor = (name: string) => {
  let hash = 0;

  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }

  return color;
};

function getInitials(name: string) {
  if (name.length === 0) {
    return "N/A";
  }

  const split = name.split(" ");

  if (split.length === 1) {
    return name.charAt(0).toUpperCase();
  }

  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
}

export function stringAvatar(name: string) {
  return {
    children: getInitials(name),
    style: {
      backgroundColor: stringToColor(name),
      color: "white",
    },
  };
}
