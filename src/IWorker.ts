import { ITask } from "./ITask"

export enum WORKER_STATUS{
  IDLE,
  PENDING
}
export interface IWorker<T>{
  getStatus(): WORKER_STATUS
  execute(task: ITask<T>, callback: (error: any | undefined)=>void): void
  dispose(): void
}
