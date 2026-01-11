export interface IBaseService<T, CreateDto, UpdateDto> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(dto: CreateDto, userId?: string): Promise<T>;
  update(id: string, dto: UpdateDto, userId?: string): Promise<T>;
  updateStatus(id: string, archived: boolean, userId?: string): Promise<T>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
  // search(query: any): Promise<T[]>;
}
