import { AppDataSource } from '../config/database';
import { Role } from '../models/Role';

export const initializeRoles = async () => {
    const roleRepository = AppDataSource.getRepository(Role);

    const existingRoles = await roleRepository.find();
    const requiredRoles = ['user', 'admin'];

    const missingRoles = requiredRoles.filter(
        name => !existingRoles.some(role => role.name === name),
    );

    if (missingRoles.length > 0) {
        const newRoles = missingRoles.map(name => {
            const role = new Role();
            role.name = name;
            return role;
        });

        await roleRepository.save(newRoles);
        console.log(`Initialized roles: ${missingRoles.join(', ')}`);
    } else {
        console.log('Roles already initialized.');
    }
};
