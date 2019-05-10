import { User} from '../_models';

export class Comment {
    id: number;
    userCommID: number;
    memeId: number;
    contetnt: string;
    creationDate: Date;
    userComm: User; 
}