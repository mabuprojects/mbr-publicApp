import {Authority} from "./authority.component";
/**
 * Created by christian on 16/03/17.
 */

export class User {
    email:string;
    username: string;
    enabled: true;
    authorities:Authority[];
}
