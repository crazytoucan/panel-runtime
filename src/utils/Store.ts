import update, { Spec } from "immutability-helper";
import { Emitter } from "./Emitter";

export class Store<TState> {
  private emitter = new Emitter<[TState]>();
  constructor(public state: TState) {}

  public update(spec: Spec<TState>) {
    const nextState = update(this.state, spec);
    if (nextState !== this.state) {
      this.state = nextState;
      this.emitter._emit(nextState);
    }
  }

  public subscribe(callback: (state: TState) => void) {
    return this.emitter.subscribe(callback);
  }
}
