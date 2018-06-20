import { IWorker, WORKER_STATUS } from "./IWorker"
import { ITask } from "./ITask"

export default class XHRWorker implements IWorker<string | undefined>{
  private _status: WORKER_STATUS = WORKER_STATUS.IDLE
  private _inst: XMLHttpRequest
  private _anchor: HTMLAnchorElement | undefined

  constructor(){
    this._inst = new XMLHttpRequest()
  }

  getStatus(){
    return this._status
  }

  execute(task: ITask<string>, callback?: (error: any | undefined)=>void){
    this._status = WORKER_STATUS.PENDING

    const url: string = task.getPayload()
    this._inst.open("GET", url)
    this._inst.responseType = "blob"
    this._inst.onload = _ => {
      let error = undefined
      if (200 == this._inst.status){
        try{
          const fileName = <string>url.split("/").pop()
          if (undefined != navigator.msSaveOrOpenBlob){
            // for IE10+
            navigator.msSaveOrOpenBlob(this._inst.response, fileName)
          }
          else{
            // for Chrome
            const blobURL = URL.createObjectURL(this._inst.response)
            this._anchor = this._anchor || document.createElement("a")
            this._anchor.href = blobURL
            this._anchor.setAttribute("download", fileName)
            this._anchor.click()
            setTimeout(() => {
              URL.revokeObjectURL(blobURL)
            }, 0)
          }
        }
        catch(e){
          error = e
        }
      }
      else{
        error = this._inst.status
      }

      this.dispose()
      if (undefined != callback){
        callback(error)
      }
    }
    this._inst.send()
  }

  dispose(){
    this._status = WORKER_STATUS.IDLE
  }
}
