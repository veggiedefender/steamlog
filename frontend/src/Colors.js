const Colors = {
  gray: "#969696",
  blue: "#1bbcff",
  green: "#6EEB83",
  yellow: "#ffcd19",
  orange: "#FF5714",
  red: "#ff3c69"
}

const StatusColors = [
  [Colors.gray, "offline"],   //offline
  [Colors.blue, "online"],   //online
  [Colors.red, "busy"],    //busy
  [Colors.orange, "away"], //away
  [Colors.yellow, "snooze"], //snooze
  [Colors.blue, "looking to trade"],   //looking to trade
  [Colors.blue, "looking to play"],   //looking to play
  [Colors.green, "in game"]   //in game
]

export default Colors;
export { StatusColors };
