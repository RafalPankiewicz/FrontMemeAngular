import { User} from '../_models';
export class Meme {
    id: number;
    userId: number;
    title: string;
    photoName: string;
    rate: number;
    cerationDate: Date;
    user: User; 
}