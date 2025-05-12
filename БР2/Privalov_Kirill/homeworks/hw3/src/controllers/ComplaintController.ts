import { AppDataSource } from '../config/databaseConfig';
import { Complaint } from '../entities/Complaint';
import { UserRole } from '../entities/User';
import { BaseController } from './BaseController';

export const ComplaintController = new BaseController(
  AppDataSource.getRepository(Complaint),
);

ComplaintController.getAll = async (req, res) => {
  try {
    if (req.payload) {
      const role = req.payload.role;
      const userId = req.payload.userId;
      if (role === UserRole.ADMIN) {
        const complaints = await ComplaintController.repository.find();
        res.json(complaints);
        return;
      } else if (role === UserRole.LANDLORD) {
        const complaints = await ComplaintController.repository
          .createQueryBuilder('complaint')
          .leftJoinAndSelect('complaint.property', 'property')
          .where('property.owner_id = :userId', { userId })
          .getMany();
        res.json(complaints);
        return;
      } else if (role === UserRole.TENANT) {
        const complaints = await ComplaintController.repository.find({
          where: { user: { id: userId } },
        });
        res.json(complaints);
        return;
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

ComplaintController.getById = async (req, res) => {
  try {
    if (req.payload) {
      const role = req.payload.role;
      const userId = req.payload.userId;
      const complaintId = req.params.id;

      if (role === UserRole.ADMIN) {
        const complaint = await ComplaintController.repository.findOne({
          where: { id: Number(complaintId) },
        });
        res.json(complaint);
        return;
      } else if (role === UserRole.LANDLORD) {
        const complaint = await ComplaintController.repository
          .createQueryBuilder('complaint')
          .leftJoinAndSelect('complaint.property', 'property')
          .where('property.owner_id = :userId', { userId })
          .andWhere('complaint.id = :complaintId', { complaintId })
          .getOne();
        res.json(complaint);
        return;
      } else if (role === UserRole.TENANT) {
        const complaint = await ComplaintController.repository.findOne({
          where: { id: Number(complaintId), user: { id: userId } },
        });
        res.json(complaint);
        return;
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
