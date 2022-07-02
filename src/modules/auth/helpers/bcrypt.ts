import * as bcrypt from 'bcrypt';
import { bcryptConstants } from '../constants';

export class Hashing {
  static async generate(password: string): Promise<string> {
    return await bcrypt.hash(password, bcryptConstants.saltOrRounds);
  }
  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
