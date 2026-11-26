export function tableHtml(headers, rows) {
    return `
        <table>
            <thead>
                <tr>
                    ${headers.map(header => `<th>${header}</th>`).join('\n')}
                </tr>
            </thead>
            <tbody>
                ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('\n')}</tr>`).join('\n')}
            </tbody>
        </table>
    `
}