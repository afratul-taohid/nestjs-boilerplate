import { Body, Delete, Get, Param, Patch, Post, Put, Query, Type, UsePipes } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AbstractValidationPipe, ValidateUUIDPipe } from './pipes';
import { IBaseController } from './interfaces/base-controller.interface';
import { IBaseService } from './interfaces/base-service.interface';

export function BaseController<Model, CreateDTO, UpdateDTO>(
  createDto: Type<CreateDTO>,
  updateDto: Type<UpdateDTO>
): Type<IBaseController<Model, CreateDTO, UpdateDTO>> {
  const createPipe = new AbstractValidationPipe({ whitelist: true, transform: true }, { body: createDto });
  const updatePipe = new AbstractValidationPipe({ whitelist: true, transform: true }, { body: updateDto });

  class GenericsController implements IBaseController<Model, CreateDTO, UpdateDTO> {
    constructor(private readonly service: IBaseService<Model, CreateDTO, UpdateDTO>) { }

    @Get()
    async findAll(): Promise<Model[]> {
      return this.service.findAll();
    }

    @Get('find/:id')
    @ApiQuery({
      name: 'id',
      type: 'string',
      allowEmptyValue: false,
      description: 'used to find an object inside our database',
      required: true
    })
    async findOne(@Param('id') id: string): Promise<Model> {
      return this.service.findOne(id);
    }

    @Post()
    // @UsePipes(createPipe)
    @ApiBody({ type: createDto, required: true, description: 'used to create an object inside our database' })
    @ApiResponse({ description: 'returns the created entity' })
    async create(@Body() data: CreateDTO): Promise<Model> {
      return this.service.create(data);
    }

    @Put(':id')
    @UsePipes(updatePipe)
    @ApiBody({ type: updateDto })
    @ApiQuery({
      name: 'id',
      type: 'string',
      allowEmptyValue: false,
      description: 'used to update an object inside our database',
      required: true
    })
    async update(@Param('id', new ValidateUUIDPipe()) id: string, @Body() dto: UpdateDTO): Promise<Model> {
      return this.service.update(id, dto);
    }

    @Patch('archive/:id')
    @ApiQuery({
      name: 'id',
      type: 'string',
      allowEmptyValue: false,
      description: 'used to archive an object inside our database',
      required: true
    })
    async archive(@Param('id', new ValidateUUIDPipe()) id: string): Promise<Model> {
      return this.service.updateStatus(id, true);
    }

    @Patch('unarchive/:id')
    @ApiQuery({
      name: 'id',
      type: 'string',
      allowEmptyValue: false,
      description: 'used to unarchive an object inside our database',
      required: true
    })
    async unarchive(@Param('id', new ValidateUUIDPipe()) id: string): Promise<Model> {
      return this.service.updateStatus(id, false);
    }

    @Delete(':id')
    @ApiQuery({
      name: 'id',
      type: 'string',
      allowEmptyValue: false,
      description: 'used to delete an object inside our database',
      required: true
    })
    async delete(@Param('id', new ValidateUUIDPipe()) id: string): Promise<void> {
      return this.service.delete(id);
    }

    // @Delete()
    // @ApiQuery({
    //   description: 'This api clears the collections'
    // })
    // async clear(): Promise<void> {
    //   return this.service.clear();
    // }

    // @Get('search')
    // @ApiBody({ type: [String], description: 'This api returns results after querying from the database' })
    // async search(@Body() query: QueryDto<T>) {
    //   return this.service.search(query);
    // }
  }
  return GenericsController;
}
