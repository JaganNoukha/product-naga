import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { nanoid } from 'nanoid';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product extends Document {
  @Prop({
    type: String,
    default: () => nanoid(),
    unique: true,
  })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  skuCode: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  hsnCode: string;

  @Prop()
  pictureUrl?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  mrp: number;

  @Prop({ required: true })
  minimumPrice: number;

  @Prop({ required: true })
  gstPercentage: number;

  @Prop({ required: true })
  unitsPerCase: number;

  @Prop({ required: true })
  packaging: string;

  @Prop({ ref: 'Brand', required: true })
  brandId: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true, enum: ['kg', 'g', 'l', 'ml', 'pcs'] })
  uom: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ ref: 'Category', required: true })
  categoryId: string;

  @Prop({ ref: 'SubCategory', required: true })
  subCategoryId: string;

  @Prop({ required: true })
  warehouses: [{warehouseId: string,}];

}

export const ProductSchema = SchemaFactory.createForClass(Product);