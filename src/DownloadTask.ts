import { ITask, TASK_STATUS } from "./ITask"
import { IWorker } from "./IWorker"
import IframeWorker from "./IframeWorker"
import XHRWorker from "./XHRWorker"

export default class DownloadTask implements ITask<string>{
  private _status: TASK_STATUS = TASK_STATUS.PENDING
  private _payload: string
  private _createdAt: Date
  private _updatedAt?: Date

  constructor(payload: string){
    this._payload = payload
    this._createdAt = new Date()
  }

  getPayload(){
    return this._payload
  }

  getStatus(){
    return this._status
  }

  isCandidateWorker(worker: IWorker<any>){
    if ("undefined" == typeof Blob){
      // for IE9
      return worker instanceof IframeWorker
    }
    else{
      // for IE10+, Chrome
      return worker instanceof XHRWorker
    }
  }

  run(worker: IWorker<string>, callback?: (error: any | undefined)=>void){
    worker.execute(this, (error: any | undefined) => {
      this._status = undefined == error ? TASK_STATUS.FULFILL : TASK_STATUS.REJECT
      this._updatedAt = new Date()
      if (undefined != callback){
        callback(error)
      }
    })
  }

  getCreatedAt(){
    return this._createdAt
  }

  getUpdatedAt(){
    return this._updatedAt
  }
}
