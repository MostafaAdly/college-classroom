// ========================================================= [ Libraries ]
import colors from "colors";
import df from 'date-and-time';
import { v4 as uuid } from 'uuid'
// ========================================================= [ Global ]
export default class Global {
    private utils: any = {};
    constructor(data: any) {
        data.utils = this.utils;
    }
    public initialize() {
        this.utils.print = (msg: any, name = "Global") =>
            console.log(
                `${name
                    ? this.countSpaces("", 3) +
                    colors.cyan("[" + name + "]") +
                    this.countSpaces(name, 12)
                    : ""
                }${df.format(new Date(), 'YYYY/MM/DD HH:mm:ss')} - ${msg}`
            );
        this.utils.line = (name: string) =>
            this.utils.print(
                `--------- ${colors.red(name)} ---------`,
                name
            );
        this.utils.error = (msg: string, name: any) =>
            this.utils.print(colors.red(msg), name);
        this.utils.createId = (removeSplits: boolean = false, repeat: number = 1) => {
            let id = "";
            for (let i = 0; i < repeat; i++) id += uuid().replaceAll("-", removeSplits ? "" : "-")
            return id;
        }
    }
    private countSpaces(word = "", amount = 0) {
        let whiteSpaces = "";
        for (let i = 0; i < Math.abs(amount - word.length); i++)
            whiteSpaces += " ";
        return whiteSpaces;
    }
}
