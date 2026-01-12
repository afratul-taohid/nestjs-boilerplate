export interface IBaseController<Model, CreateDTO, UpdateDTO> {
  findAll(): Promise<Model[]>;
  create(data: CreateDTO): Promise<Model>;
  update(id: string, data: UpdateDTO): Promise<Model>;
  findOne(id: string): Promise<Model>;
  archive(id: string): Promise<Model>;
  unarchive(id: string): Promise<Model>;
  delete(id: string): Promise<void>;
}
