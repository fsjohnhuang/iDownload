import { IWorker } from "./IWorker"

export enum TASK_STATUS{
  PENDING,
  FULFILL,
  REJECT
}

export interface ITask<T>{
  getPayload(): T
  getStatus(): TASK_STATUS
  isCandidateWorker(worker: IWorker<any>): boolean
  run(worker: IWorker<T>, callback?: (error?: any)=>void): void
  getCreatedAt(): Date
  getUpdatedAt(): Date | undefined
}
