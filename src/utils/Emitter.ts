import { noop } from "lodash-es";
import { Dispose } from "./Dispose";

function pull<T>(list: T[], value: T) {
  const index = list.indexOf(value);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

function replace<T>(list: T[], lastValue: T, nextValue: T) {
  const index = list.indexOf(lastValue);
  if (index !== -1) {
    list[index] = nextValue;
  }
}

export const enum EmitResult {
  NONE,
  UNSUBSCRIBE,
}

type _EmitCallback<TArgs extends any[]> = (...args: TArgs) => void | EmitResult;

export interface EmitterReadonly<TArgs extends any[]> {
  subscribe(callback: (...args: TArgs) => void): Dispose;
}

export class Emitter<TArgs extends any[] = []> {
  private callbacks: _EmitCallback<TArgs>[] = [];
  private nextCallbacks: _EmitCallback<TArgs>[] | null = null;
  private isEmitting = false;

  public subscribe(callback: (...args: TArgs) => void) {
    this.addCallback(callback);
    return () => {
      this.removeCallback(callback);
    };
  }

  public _emit(...args: TArgs) {
    if (this.isEmitting) {
      throw new Error("Can't emit when already emitting");
    }

    this.isEmitting = true;
    callbackLoop: for (let i = 0; i < this.callbacks.length; i++) {
      let result;
      try {
        result = this.callbacks[i].apply(null, args);
      } catch (e) {
        console.error(e);
        continue callbackLoop;
      }

      switch (result ?? EmitResult.NONE) {
        case EmitResult.NONE:
          break;

        case EmitResult.UNSUBSCRIBE:
          this.getNextCallbacks()[i] = noop;
          break;
      }
    }

    this.isEmitting = false;
    if (this.nextCallbacks != null) {
      this.callbacks = this.nextCallbacks;
      this.nextCallbacks = null;
    }
  }

  public clear() {
    if (this.isEmitting) {
      throw new Error("cannot clear() while emitting");
    }

    this.callbacks = [];
  }

  public readonly() {
    return this as EmitterReadonly<TArgs>;
  }

  private addCallback(callback: () => void) {
    if (this.isEmitting) {
      this.getNextCallbacks().push(callback);
    } else {
      this.callbacks.push(callback);
    }
  }

  private removeCallback(callback: () => void) {
    if (this.isEmitting) {
      replace(this.callbacks, callback, noop);
      pull(this.getNextCallbacks(), callback);
    } else {
      pull(this.callbacks, callback);
    }
  }

  private getNextCallbacks() {
    if (this.nextCallbacks == null) {
      this.nextCallbacks = [...this.callbacks];
    }

    return this.nextCallbacks;
  }
}
