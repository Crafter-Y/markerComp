const { readFileSync } = require("node:fs");

const main = () => {
  const oldFile = readFileSync("./markers-1.json", { encoding: "utf-8" });
  const newFile = readFileSync("./markers-2.json", { encoding: "utf-8" });

  const oldObj = JSON.parse(oldFile);
  const newObj = JSON.parse(newFile);

  const beforePoints = oldObj
    .filter((obj) => obj.name == "Kingdoms" || obj.name == "OxyTowns")[0]
    .markers.map((marker) => {
      if (marker.points)
        return (
          marker.tooltip + "§" + marker.points[0].x + "_" + marker.points[0].z
        );
    })
    .filter((el) => el != undefined);

  const afterPoints = newObj
    .filter((obj) => obj.name == "Kingdoms" || obj.name == "OxyTowns")[0]
    .markers.map((marker) => {
      if (marker.points)
        return (
          marker.tooltip + "§" + marker.points[0].x + "_" + marker.points[0].z
        );
    })
    .filter((el) => el != undefined);

  afterPoints.forEach((el) => {
    const index = beforePoints.indexOf(el);
    if (index > -1) {
      beforePoints.splice(index, 1);
    }
  });

  let seen = {};
  beforePoints.forEach((el) => {
    let cityname = el.split("§")[0];
    seen[cityname] = {
      chunks: (seen[cityname] ? seen[cityname].chunks : 0) + 1,
      pos: [el.split("§")[1].split("_")[0], el.split("§")[1].split("_")[1]],
    };
  });

  Object.keys(seen).forEach((key) => {
    beforePoints.forEach((el) => {
      let cityname = el.split("§")[0];
      if (cityname == key) {
        console.log(
          cityname,
          el.split("§")[1].split("_")[0],
          el.split("§")[1].split("_")[1]
        );
      }
    });
  });

  console.log(seen);

  Object.keys(seen).forEach((el) => {
    let b = seen[el];
    console.log(
      `waypoint:To raid ${el} ${b.chunks} chunks:W:${b.pos[0]}:100:${b.pos[1]}:4:false:0:gui.xaero_default:false:0:0:false`
    );
  });
};

main();
