import { ITask } from "./ITask"
import { IWorker } from "./IWorker"
import XHRWorker from "./XHRWorker"
import DownloadTask from "./DownloadTask"
import Factory from "./Factory"

export function create(recruitment: number){
  let workers: IWorker<any>[] = []
  for (let i = 0; i < recruitment; i++){
    workers.push(new XHRWorker())
  }

  const factory = new Factory(workers)

  return (urls: string[]) => {
    urls.forEach(url => {
      if (!/^\s*$/.test(url)){
        factory.enqueue(new DownloadTask(url))
      }
    })
  }
}
