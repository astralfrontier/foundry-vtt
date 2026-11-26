import { forEveryPc } from "../src/characters";
import { affinityLevels } from "../src/affinities";
import { tableHtml } from "../src/html";

const columnHeaders = ["Name", "Phys", "Air", "Bolt", "Dark", "Earth", "Fire", "Ice", "Light", "Poison"];
const rows = [];

forEveryPc(actor => {
    const currentRow = [actor.name];
    const affData = affinityLevels(actor);
    currentRow.push(affData.physical);
    currentRow.push(affData.air);
    currentRow.push(affData.bolt);
    currentRow.push(affData.dark);
    currentRow.push(affData.earth);
    currentRow.push(affData.fire);
    currentRow.push(affData.ice);
    currentRow.push(affData.light);
    currentRow.push(affData.poison);
    rows.push(currentRow);
});

const affTable = tableHtml(columnHeaders, rows);

const fd = await foundry.applications.api.DialogV2.input({
  window: { title: "Tactics" },
  content: affTable,
  ok: {
    label: "Close"
  }
});