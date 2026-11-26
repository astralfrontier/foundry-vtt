export const td = (cell) => `<td style="${cell.style || ""}">${cell.label}</td>`;
export const th = (cell) => `<th style="${cell.style || ""}">${cell.label}</th>`;
export const tr = (cells) => `<tr>${cells.join('')}</tr>`;

export function tableHtml(headers, rows) {
    const thead = tr(headers.map(th))
    const tbody = rows.map(row => tr(row.map(td))).join('');
    return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
}