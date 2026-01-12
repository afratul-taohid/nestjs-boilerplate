export interface IBaseService<Model, CreateDTO, UpdateDTO> {
  findAll(): Promise<Model[]>;
  findOne(id: string): Promise<Model>;
  create(data: CreateDTO, userId?: string): Promise<Model>;
  update(id: string, data: UpdateDTO, userId?: string): Promise<Model>;
  updateStatus(id: string, archived: boolean, userId?: string): Promise<Model>;
  delete(id: string): Promise<void>;
  // clear(): Promise<void>;
}
