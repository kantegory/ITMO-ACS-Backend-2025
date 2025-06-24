import {BaseService} from "./base";
import dataSource from "../config/data-source";
import {Company} from "../models/Company";

export class CompanyService extends BaseService<Company> {
    constructor() {
        super(dataSource.getRepository(Company));
    }

}