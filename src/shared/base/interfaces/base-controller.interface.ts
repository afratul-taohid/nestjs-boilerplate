export interface IBaseController<T extends { id: string }, createDto, updateDto> {
  findAll(): Promise<T[]>;
  create(entity: createDto): Promise<T>;
  update(id: string, entity: updateDto): Promise<T>;
  findOne(id: string): Promise<T>;
  archive(id: string): Promise<T>;
  unarchive(id: string): Promise<T>;
  delete(id: string): Promise<void>;
  // clear(): Promise<void>;
}
