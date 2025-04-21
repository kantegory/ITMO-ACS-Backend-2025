export interface DishTypeResponseDTO {
    id: string;
    title: string;
}

export interface CreateDishTypeDTO {
    id: string;
    title: string;
}

export interface UpdateDishTypeDTO {
    title?: string;
}