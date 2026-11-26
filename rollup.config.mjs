import fs from "fs";
import path from "path";

// Plugins
import { minify } from 'rollup-plugin-esbuild-minify'


const macros = fs.readdirSync(path.join("macros")).filter(path => path.endsWith(".js"));
const macroConfig = macros.map(macro => ({
    input: path.join("macros", macro),
    output: {
        file: path.join("dist", "macros", macro),
        format: "es"
    },
    plugins: [minify()]
}))

export default [
    ...macroConfig
];