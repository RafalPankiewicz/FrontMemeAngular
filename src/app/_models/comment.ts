import { User} from '../_models';

export class Comment {
    id: number;
    userCommID: number;
    memeID: number;
    contetnt: string;
    creationDate: Date;
    userComm: User; 
}