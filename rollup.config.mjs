import fs from "fs";
import path from "path";

const macros = fs.readdirSync(path.join("macros")).filter(path => path.endsWith(".js"));
const macroConfig = macros.map(macro => ({
    input: path.join("macros", macro),
    output: {
        file: path.join("dist", "macros", macro),
        format: "es"
    }
}))

export default [
    ...macroConfig
];