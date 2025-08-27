import {Users} from 'app/store/types/auth';

export interface UserListI {
    goToProfile: (id: string) => void;
    users: Users;
}
