import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Unique,
    JoinColumn,
} from 'typeorm';
import { Recipe } from './Recipe';
import { BlockTypeEnum } from './enums';

@Entity('recipe_blocks')
@Unique(['recipe', 'displayOrder'])
export class RecipeBlock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, recipe => recipe.blocks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

    @Column({ type: 'enum', enum: BlockTypeEnum, name: 'block_type' })
    blockType: BlockTypeEnum;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'int', default: 0, name: 'display_order' })
    displayOrder: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}