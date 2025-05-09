
import {BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class EntityWithMetadata {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
