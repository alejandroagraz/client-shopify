import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
