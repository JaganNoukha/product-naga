import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponse } from './interfaces/paginated-response.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Product>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.productModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.productModel.countDocuments().exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ productId }).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async update(productId: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate(
        { productId },
        { $set: updateProductDto },
        { new: true }
      )
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return updatedProduct;
  }

  async remove(productId: string): Promise<void> {
    const result = await this.productModel.deleteOne({ productId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }

  async updateWarehouses(productId: string, updateWarehousesDto: { warehouses: { warehouseId: Types.ObjectId }[] }): Promise<Product> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate(
        { productId },
        { $set: { warehouses: updateWarehousesDto.warehouses } },
        { new: true }
      )
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return updatedProduct;
  }
}
