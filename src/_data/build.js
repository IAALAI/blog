import process from "process";

export default {
    "CPU": process.env.CPU,
    "RAM": process.env.RAM,
    "OS": process.env.OS,
    date: new Date()
}