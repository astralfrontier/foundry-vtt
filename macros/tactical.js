import { forEveryPc } from "../src/characters";
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

const affRows = [];
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
});

// TODO: add header styles reflecting the average
const affHeaders = [{label: "PC"}, ...AFFINITY_NAMES.map(name => ({label: name}))];
const affTable = tableHtml(affHeaders, affRows);

const fd = await foundry.applications.api.DialogV2.input({
  window: { title: "Tactical", resizable: true },
  position: {
    width: 860,
    height: 480
  },
  content: affTable,
  ok: {
    label: "Close"
  }
});