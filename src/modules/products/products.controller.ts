import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponse } from './interfaces/paginated-response.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Product>> {
    return this.productsService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @Get(':productId')
  async findOne(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.findOne(productId);
  }

  @ApiOperation({ summary: 'Update a product' })
  @Patch(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(productId, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete(':productId')
  async remove(@Param('productId') productId: string): Promise<void> {
    return this.productsService.remove(productId);
  }

  @ApiOperation({ summary: 'Update warehouses for a product' })
  @Patch(':productId/warehouses')
  async updateWarehouses(
    @Param('productId') productId: string,
    @Body() updateWarehousesDto: { warehouses: { warehouseId: Types.ObjectId }[] },
  ): Promise<Product> {
    return this.productsService.updateWarehouses(productId, updateWarehousesDto);
  }
}
