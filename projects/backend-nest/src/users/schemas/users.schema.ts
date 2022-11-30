import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  @Prop({ required: true,  trim: true, unique: true})
  email: string;
  @Prop({ required: true,  trim: true})
  password: string;
  @Prop({ required: true,  trim: true})
  username: string;
  @Prop({ required: true,  trim: true})
  private_key: string;
  @Prop({default: Date.now()})
  createdAt: Date;
  @Prop({default: Date.now()})
  updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
