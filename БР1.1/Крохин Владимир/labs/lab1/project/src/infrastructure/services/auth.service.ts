import { AuthService } from '../../application/services/auth.service';
import { UserService } from '../../application/services/user.service';
import { AthleteService } from '../../application/services/athlete.service';
import { CoachService } from '../../application/services/coach.service';
import { UserRepository } from '../repositories/interfaces/user.repository';
import { AthleteRepository } from '../repositories/interfaces/athlete.repository';
import { CoachRepository } from '../repositories/interfaces/coach.repository';
import { UserModel } from '../../application/domain/user.model';
import { AthleteModel } from '../../application/domain/athlete.model';
import { CoachModel } from '../../application/domain/coach.model';

export class AuthInfrastructureService {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly athleteService: AthleteService,
        private readonly coachService: CoachService,
        private readonly userRepository: UserRepository,
        private readonly athleteRepository: AthleteRepository,
        private readonly coachRepository: CoachRepository
    ) {}

    async register(email: string, password: string, name: string, userType: string): Promise<{ token: string; user: UserModel }> {
        const user = await this.userService.createUser(email, password, name, userType);
        const token = this.authService.generateToken(user);

        if (userType === 'athlete') {
            await this.athleteService.createAthlete(user);
        } else if (userType === 'coach') {
            await this.coachService.createCoach(user);
        }

        return { token, user };
    }

    async login(email: string, password: string): Promise<{ token: string; user: UserModel }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await this.userService.verifyPassword(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const token = this.authService.generateToken(user);
        return { token, user };
    }

    async getProfile(userId: number): Promise<{ user: UserModel; athlete?: AthleteModel; coach?: CoachModel }> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const result: { user: UserModel; athlete?: AthleteModel; coach?: CoachModel } = { user };

        if (user.userType === 'athlete') {
            const athlete = await this.athleteRepository.findByUserId(userId);
            if (athlete) {
                result.athlete = athlete;
            }
        } else if (user.userType === 'coach') {
            const coach = await this.coachRepository.findByUserId(userId);
            if (coach) {
                result.coach = coach;
            }
        }

        return result;
    }

    async updateEmail(userId: number, newEmail: string): Promise<UserModel> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return this.userService.updateEmail(user, newEmail);
    }

    async updateName(userId: number, newName: string): Promise<UserModel> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return this.userService.updateName(user, newName);
    }

    async verifyUserType(userId: number, requiredType: string): Promise<boolean> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        return user.userType === requiredType;
    }

    verifyToken(token: string): { id: number } {
        return this.authService.verifyToken(token);
    }
} 