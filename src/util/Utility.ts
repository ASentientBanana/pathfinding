


export const sleep = (time: number = 10) => new Promise((res) => {
    setTimeout(() => {
        res(null);
    }, time)
})
// const colors = {
  //   bakgroundMainColor: "#262b2b",
  //   bakgroundColor: "#2d3636",
  //   accentGoldColor: "#eab354",
  //   accentGreyColor: "#5f787b",
  //   accentGreenColor: "#66ff66",
  //   accentRedColor: "#cc2900",
  // };