import { Service, Inject } from 'typedi';
import { RentMapper } from "../mappers/RentMapper"
import { Rent, RentStatus } from "../models/RentModel"
import { CreateRentDto, ChangeRentDto, ResponseRentDto } from "../dtos/RentDtos"
import { Repository, FindManyOptions } from "typeorm"
import { NotFoundError } from "../errors/NotFoundError"
import { CreationError } from "../errors/CreationError"

export interface IRentService {
    startRent(rentData: CreateRentDto): Promise<ResponseRentDto>
    changeRentInfo(changeData: ChangeRentDto): Promise<ResponseRentDto>
    findByRentingId(id: number): Promise<ResponseRentDto[]>
}

@Service('IRentService')
export class RentService implements IRentService {
    constructor(
        @Inject('rent.repository')
        protected readonly repository: Repository<Rent>
    ) {}

    async startRent(rentData: CreateRentDto): Promise<ResponseRentDto> {
        let rent: Rent = RentMapper.toModel(rentData)
        try {
            rent = await this.repository.save(rent)
            return RentMapper.toDto(rent)
        } catch (error: any) {
            console.log(error)
            throw new CreationError("rent creation failed")
        }
    }

    async changeRentInfo(changeData: ChangeRentDto): Promise<ResponseRentDto> {
        let rent: Rent | null = await this.repository.findOneBy({ id: changeData.id })
        if (!rent) 
            throw new NotFoundError("Can't find rent with this id")
        
        rent.endDate = changeData.endDate ?? rent.endDate ?? new Date()
        rent.status = changeData.status ?? rent.status ?? RentStatus.UNDEFINED
        rent.price = changeData.price ?? rent.price

        try {
            rent = await this.repository.save(rent)
            return RentMapper.toDto(rent)
        } catch (error: any) {
            console.log(error)
            throw new Error("rent change failed")
        }
    }

    async findByRentingId(id: number): Promise<ResponseRentDto[]> {
        const options: FindManyOptions<Rent> = {where: {rentingId: id}, relations: ["property"]}
        const results = await this.repository.find(options)
        console.log(results)
        return results.map(r => RentMapper.toDto(r))
    }
}
