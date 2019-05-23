import { User} from '../_models';
export class Meme {
    id: number;
    userID: number;
    title: string;
    photoName: string;
    rate: number;
    cerationDate: Date;
    user: User; 
}