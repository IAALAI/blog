import process from "process";

const isDev = process.env.ELEVENTY_RUN_MODE == "serve";
 
export default {
    "OS": process.env.OS,
    isDev,
    mode: process.env.ELEVENTY_RUN_MODE,
    analyzeHost: isDev ? "http://himvf:3001" : "https://analyze.iaalai.cn",
    analyzeId: isDev ? "640629ef-7dfa-44ad-be33-952ffaa16adc" : "00a1e14e-adc4-4c4a-afb9-d27495be9a35",
    date: new Date()
}