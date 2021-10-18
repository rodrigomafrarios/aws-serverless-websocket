export interface DeleteVisitorRepositoryParams {
  clientId: string
  ip: string
}

export interface DeleteVisitorRepository {
  delete: (deleteVisitorParams: DeleteVisitorRepositoryParams) => Promise<boolean>
}
