import { AppDataSource } from "../data-source";
import { Complaint } from "../entities/Complaint";
import { BaseController } from "./BaseController";

export const complaintController = new BaseController(AppDataSource.getRepository(Complaint));
