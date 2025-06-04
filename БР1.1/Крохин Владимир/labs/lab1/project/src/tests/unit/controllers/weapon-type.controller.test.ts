import { Request, Response } from 'express';
import { WeaponTypeController } from '../../../presentation/expressjs/controllers/weapon-type.controller';
import { WeaponTypeService } from '../../../application/services/WeaponTypeService';
import { WeaponTypeModel } from '../../../application/domain/weapon-type.model';

describe('WeaponTypeController', () => {
    let weaponTypeController: WeaponTypeController;
    let weaponTypeService: WeaponTypeService;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        weaponTypeService = {
            getWeaponTypeById: jest.fn(),
            getAllWeaponTypes: jest.fn(),
            createWeaponType: jest.fn(),
            updateWeaponType: jest.fn(),
            deleteWeaponType: jest.fn()
        } as any;

        weaponTypeController = new WeaponTypeController(weaponTypeService);

        responseObject = {};
        mockResponse = {
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
                return mockResponse;
            }),
            status: jest.fn().mockImplementation((code) => {
                return mockResponse;
            }),
            send: jest.fn()
        };
    });

    describe('getWeaponTypeById', () => {
        it('should return weapon type by id', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            mockRequest = {
                params: { id: '1' }
            };

            (weaponTypeService.getWeaponTypeById as jest.Mock).mockResolvedValue(weaponType);

            await weaponTypeController.getWeaponTypeById(mockRequest as Request, mockResponse as Response);

            expect(weaponTypeService.getWeaponTypeById).toHaveBeenCalledWith(1);
            expect(mockResponse.json).toHaveBeenCalledWith(weaponType);
        });

        it('should return 404 if weapon type not found', async () => {
            mockRequest = {
                params: { id: '999' }
            };

            (weaponTypeService.getWeaponTypeById as jest.Mock).mockRejectedValue(new Error('Тип оружия не найден'));

            await weaponTypeController.getWeaponTypeById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Тип оружия не найден' });
        });
    });

    describe('getAllWeaponTypes', () => {
        it('should return all weapon types', async () => {
            const weaponTypes = [
                new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет'),
                new WeaponTypeModel(2, 'Винтовка', 'Пневматическая винтовка')
            ];

            (weaponTypeService.getAllWeaponTypes as jest.Mock).mockResolvedValue(weaponTypes);

            await weaponTypeController.getAllWeaponTypes(mockRequest as Request, mockResponse as Response);

            expect(weaponTypeService.getAllWeaponTypes).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(weaponTypes);
        });

        it('should return 500 if error occurs', async () => {
            (weaponTypeService.getAllWeaponTypes as jest.Mock).mockRejectedValue(new Error('Internal server error'));

            await weaponTypeController.getAllWeaponTypes(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });

    describe('createWeaponType', () => {
        it('should create new weapon type', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет', 'Пневматический пистолет');
            mockRequest = {
                body: {
                    name: 'Пистолет',
                    description: 'Пневматический пистолет'
                }
            };

            (weaponTypeService.createWeaponType as jest.Mock).mockResolvedValue(weaponType);

            await weaponTypeController.createWeaponType(mockRequest as Request, mockResponse as Response);

            expect(weaponTypeService.createWeaponType).toHaveBeenCalledWith('Пистолет', 'Пневматический пистолет');
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(weaponType);
        });

        it('should return 400 if validation fails', async () => {
            mockRequest = {
                body: {
                    name: '',
                    description: ''
                }
            };

            (weaponTypeService.createWeaponType as jest.Mock).mockRejectedValue(new Error('Invalid data'));

            await weaponTypeController.createWeaponType(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid data' });
        });
    });

    describe('updateWeaponType', () => {
        it('should update existing weapon type', async () => {
            const weaponType = new WeaponTypeModel(1, 'Пистолет обновленный', 'Новое описание');
            mockRequest = {
                params: { id: '1' },
                body: {
                    name: 'Пистолет обновленный',
                    description: 'Новое описание'
                }
            };

            (weaponTypeService.updateWeaponType as jest.Mock).mockResolvedValue(weaponType);

            await weaponTypeController.updateWeaponType(mockRequest as Request, mockResponse as Response);

            expect(weaponTypeService.updateWeaponType).toHaveBeenCalledWith(1, 'Пистолет обновленный', 'Новое описание');
            expect(mockResponse.json).toHaveBeenCalledWith(weaponType);
        });

        it('should return 404 if weapon type not found', async () => {
            mockRequest = {
                params: { id: '999' },
                body: {
                    name: 'Новое имя',
                    description: 'Новое описание'
                }
            };

            (weaponTypeService.updateWeaponType as jest.Mock).mockRejectedValue(new Error('Тип оружия не найден'));

            await weaponTypeController.updateWeaponType(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Тип оружия не найден' });
        });
    });

    describe('deleteWeaponType', () => {
        it('should delete weapon type', async () => {
            mockRequest = {
                params: { id: '1' }
            };

            (weaponTypeService.deleteWeaponType as jest.Mock).mockResolvedValue(undefined);

            await weaponTypeController.deleteWeaponType(mockRequest as Request, mockResponse as Response);

            expect(weaponTypeService.deleteWeaponType).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.send).toHaveBeenCalled();
        });

        it('should return 404 if weapon type not found', async () => {
            mockRequest = {
                params: { id: '999' }
            };

            (weaponTypeService.deleteWeaponType as jest.Mock).mockRejectedValue(new Error('Тип оружия не найден'));

            await weaponTypeController.deleteWeaponType(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Тип оружия не найден' });
        });
    });
}); 