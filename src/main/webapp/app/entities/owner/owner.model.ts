import { BaseEntity } from './../../shared';

export class Owner implements BaseEntity {
    constructor(
        public id?: number,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
    ) {
    }
}
