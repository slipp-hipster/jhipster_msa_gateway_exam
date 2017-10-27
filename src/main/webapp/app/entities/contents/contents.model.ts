import { BaseEntity } from './../../shared';

export class Contents implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public desc?: string,
        public owner?: BaseEntity,
    ) {
    }
}
