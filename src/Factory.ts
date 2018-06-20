import { ITask } from "./ITask"
import { IWorker, WORKER_STATUS } from "./IWorker"

type Maybe<T> = T | undefined

function find<T>(xs: T[], pred: (x: T)=>boolean): Maybe<T>{
  let found: Maybe<T> = undefined
  for (let i = 0, l = xs.length; !found && i < l; i++){
    found = pred(xs[i]) ? xs[i] : found
  }

  return found
}

function remove<T>(xs: T[], x: T): T[]{
  let ys: T[] = []
  for (let i = 0, l = xs.length; i < l; ++i){
    if (x != xs[i]){
      ys.push(xs[i])
    }
  }

  return ys
}

export default class Factory{
  private _tasks: ITask<any>[] = []
  private _workers: IWorker<any>[]
  private _loopDescriptor: number | undefined

  constructor(workers: IWorker<any>[]){
    this._workers = workers
  }

  private _loop() {
    let idleWorkers = this._workers.filter(worker => WORKER_STATUS.IDLE == worker.getStatus())
    let nextloopTasks: ITask<any>[] = []
    while (this._tasks.length > 0
           && idleWorkers.length > 0){
      const task = this.dequeue()
      if (undefined != task){
        const worker = find(idleWorkers, task.isCandidateWorker)
        if (undefined == worker){
          // no available worker, so enqueqe again.
          nextloopTasks.push(task)
        }
        else{
          idleWorkers = remove(idleWorkers, worker)
          task.run(worker)
        }
      }
    }

    if (nextloopTasks.length > 0 || this._tasks.length > 0){
      this._tasks = this._tasks.concat(nextloopTasks)
      this._loopDescriptor = setTimeout(this._loop.bind(this), 800)
    }
  }

  enqueue(task: ITask<any>): void{
    this._tasks.push(task)

    if (undefined != this._loopDescriptor){
      clearTimeout(this._loopDescriptor)
    }
    this._loopDescriptor = setTimeout(this._loop.bind(this), 0)
  }

  dequeue(): Maybe<ITask<any>>{
    return this._tasks.shift()
  }
}
