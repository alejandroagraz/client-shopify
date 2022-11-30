import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ trim: true})
  name: string;

  @Prop({ trim: true})
  description: string;

  @Prop({ trim: true})
  image: string;

  @Prop({default: Date.now()})
  created_at: Date;

  @Prop({default: Date.now()})
  updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);