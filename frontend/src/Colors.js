const Colors = {
  gray: "#969696",
  blue: "#1bbcff",
  green: "#6EEB83",
  yellow: "#FFEF19",
  orange: "#FF5714",
  red: "#ff3c69"
}

const StatusColors = [
  Colors.gray,   //offline
  Colors.blue,   //online
  Colors.red,    //busy
  Colors.orange, //away
  Colors.yellow, //snooze
  Colors.blue,   //looking to trade
  Colors.blue,   //looking to play
  Colors.green   //in game
]

export default Colors;
export { StatusColors };
