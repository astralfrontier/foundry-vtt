import { forEveryPc, resource } from "../src/characters";
import { AFFINITY_LEVELS, AFFINITY_NAMES, affinityLevels } from "../src/affinities";
import { tableHtml } from "../src/html";

const affStyles = [
  "background: red;",
  "",
  "background: green;",
  "background: green;",
  "background: green;"
]

const averages = AFFINITY_NAMES.reduce(
  (averages, name) => {
    averages[name] = 0;
    return averages;
  },
  {}
)

function colorForBreakpoint(breakpoint, resource) {
  const { crisis, deficit } = resource;
  if (deficit > breakpoint) {
    return "red"; // Please heal!
  } else if (crisis || (deficit * 2) > breakpoint) {
    return "yellow";
  } else {
    return "green";
  }
}

const affRows = [];
const rsRows = [];
forEveryPc(actor => {
    const affData = affinityLevels(actor);
    const affRow = [
      {label: actor.name},
      ...AFFINITY_NAMES.map(name => ({
        label: AFFINITY_LEVELS[affData[name] + 1],
        style: affStyles[affData[name] + 1]
      }))
    ];

    AFFINITY_NAMES.forEach(name => {
      averages[name] += affData[name];
    })
    affRows.push(affRow);

    const hp = resource(actor, "hp");
    const mp = resource(actor, "mp");

    const hpRow = [];
    const mpRow = [];
    [30, 40, 50].forEach(breakpoint => {
      hpRow.push({label: "&nbsp;", style: `background: ${colorForBreakpoint(breakpoint, hp)}`});
      mpRow.push({label: "&nbsp;", style: `background: ${colorForBreakpoint(breakpoint, mp)}`});
    });
    rsRows.push([
      {label: actor.name},
      ...hpRow,
      ...mpRow
    ])
});

// TODO: add header styles reflecting the average
const affHeaders = [{label: "PC"}, ...AFFINITY_NAMES.map(name => ({label: name}))];
const affTable = tableHtml(affHeaders, affRows);

const rsHeaders = ["PC", "30HP", "40", "50", "30MP", "40", "50"].map(header => ({label: header}));
const rsTable = tableHtml(rsHeaders, rsRows);

const fd = await foundry.applications.api.DialogV2.input({
  window: { title: "Tactical", resizable: true },
  position: {
    width: 860,
    height: 640
  },
  content: `<h2>Affinities</h2>\n${affTable}\n<h2>Healing</h2>\n${rsTable}`,
  ok: {
    label: "Close"
  }
});