import {join} from "path";
import {Injectable} from "@nestjs/common";
@Injectable()
export class GlobalConstants {
    constructor() {
        /**
         * @var string path to home directory
         */
        global.homeDirectory = join(__dirname, '../../')
    }
}