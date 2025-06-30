import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsUrl,
  IsMongoId,
  IsEnum,
  Min,
  Max,
  IsArray,
} from "class-validator";
import { Types } from "mongoose";
import { nanoid } from "nanoid";

export enum UomType {
  KG = "kg",
  G = "g",
  L = "l",
  ML = "ml",
  PCS = "pcs",
}

export class CreateProductDto {
  @IsString()
  @IsOptional()
  productId?: string = nanoid();

  @ApiProperty({
    description: "The name of the product",
    required: true,
    example: "Organic Brown Rice",
  })
  @IsString()
  productName: string;

  @ApiProperty({
    description: "The SKU code of the product",
    required: true,
    example: "BR-ORG-1KG",
  })
  @IsString()
  skuCode: string;

  @ApiProperty({
    description: "The description of the product",
    required: true,
    example: "Premium quality organic brown rice, rich in fiber and nutrients",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "The HSN code of the product",
    required: true,
    example: "1006.30",
  })
  @IsString()
  hsnCode: string;

  @ApiProperty({
    description: "The picture URL of the product",
    required: false,
    example: "https://example.com/images/brown-rice.jpg",
  })
  @IsUrl()
  @IsOptional()
  pictureUrl?: string;

  @ApiProperty({
    description: "Whether the product is active",
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "The MRP of the product",
    required: true,
    example: 299.99,
  })
  @IsNumber()
  @Min(0)
  mrp: number;

  @ApiProperty({
    description: "The minimum price of the product",
    required: true,
    example: 249.99,
  })
  @IsNumber()
  @Min(0)
  minimumPrice: number;

  @ApiProperty({
    description: "The GST percentage of the product",
    required: true,
    example: 18,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  gstPercentage: number;

  @ApiProperty({
    description: "The units per case of the product",
    required: true,
    example: 12,
  })
  @IsNumber()
  @Min(1)
  unitsPerCase: number;

  @ApiProperty({
    description: "The packaging of the product",
    required: true,
    example: "Plastic Bag",
  })
  @IsString()
  packaging: string;

  @ApiProperty({
    description: "The brand ID of the product",
    required: true,
    example: "507f1f77bcf86cd799439011",
  })
  @IsString()
  brandId: string;

  @ApiProperty({
    description: "The unit of the product",
    required: true,
    example: "1 kg",
  })
  @IsString()
  unit: string;

  @ApiProperty({
    description: "The UOM of the product",
    required: true,
    example: UomType.KG,
    enum: UomType,
  })
  @IsEnum(UomType)
  uom: UomType;

  @ApiProperty({
    description: "The capacity of the product",
    required: true,
    example: 1,
  })
  @IsNumber()
  @Min(0)
  capacity: number;

  @ApiProperty({
    description: "The category ID of the product",
    required: true,
    example: "507f1f77bcf86cd799439011",
  })
  @IsString()
  @IsOptional()
  categoryId: string;

  @ApiProperty({
    description: "The sub-category ID of the product",
    required: true,
    example: "507f1f77bcf86cd799439011",
  })
  @IsString()
  @IsOptional()
  subCategoryId: string;

  @ApiProperty({
    description: "The warehouses of the product",
    required: false,
    example: ["WH001", "WH002"],
    type: [String],
  })
  @IsOptional()
  @IsArray({})
  warehouses: { warehouseId: Types.ObjectId }[];
}
