const Colors = {
  gray: "#d0d0d0",
  blue: "#1bbcff",
  green: "#6eeb83",
  yellow: "#ffcd19",
  orange: "#ff5714",
  red: "#ff3c69"
}

const StatusColors = [
  [Colors.gray, "offline"],
  [Colors.blue, "online"],
  [Colors.red, "busy"],
  [Colors.orange, "away"],
  [Colors.yellow, "snooze"],
  [Colors.blue, "looking to trade"],
  [Colors.blue, "looking to play"],
  [Colors.green, "in game"]
]

export default Colors;
export { StatusColors };
