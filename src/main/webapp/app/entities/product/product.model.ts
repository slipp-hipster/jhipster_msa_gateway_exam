import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public productName?: string,
        public price?: number,
    ) {
    }
}
