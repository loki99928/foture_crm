import { ConsoleLogger } from '@nestjs/common';
import * as util from "util";

export class MyLogger extends ConsoleLogger {
    log(message: string) {
        /* your implementation */
    }
    error(message: string, trace: string) {
        /* your implementation */
    }
    warn(message: string) {
        /* your implementation */
    }
    debug(message: any) {
        super.debug(util.inspect(message, {showHidden: false, depth: null}))
    }
    verbose(message: string) {
        /* your implementation */
    }
}