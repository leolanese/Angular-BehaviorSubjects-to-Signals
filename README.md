# Practical guidance: from BehaviourSubject to Signal using Angular

## Summary

- Purpose: Shows how Angular 17’s signal() API can substitute RxJS BehaviorSubject for simple state handling.

- Key points
BehaviorSubject drawbacks: manual .next(), explicit subscriptions, risk of leaks.
signal() advantages: push-based reactive primitives built into Angular; no subscriptions; template-friendly change detection.

## Working example

I added two small, focused examples to illustrate the move from a BehaviourSubject-based pattern to the new Angular 17 signal style:
- BehaviorCounterComponent – a classic counter that stores its value in a BehaviorSubject, updates via .next() and exposes count$ for the template’s async pipe.

- SignalCounterComponent – the same idea re-implemented with signal(0), computed() for a derived value, and update() for state changes.

> Both are declared as standalone components, use OnPush change detection and are routed under
/behavior and /signal respectively. The default route now redirects to the BehaviourSubject version, so switching between the two is just a URL change.

## Practical guidance

🟩 Keep Observables for anything that inherently stream-like: HTTP polling, websockets, router events, drag / scroll streams

🟩 Use signals for `latest value` state living inside a component or a shallow service.

🟩 Hybrid trick: wrap an Observable in toSignal() (Angular 17+) when a template needs it, but keep the Observable for RxJS operators

🟩 Service API conventions
- Private writable signal private user = signal<User | null>(null)
- Public readonly accessor getUser = this.user.asReadonly();
- Mutator methods named setUser, clearUser, updateUser(fn) – mirror the mutating API of signals.

🟩 Keep state in a "store" service.
```js
Before: BehaviorSubject<User | null> + user$.
After: signal<User | null>(null).
```
🟩 Components never touch RxJS operators or subscribe manually.
- They read with the async pipe (old way) or just call the signal as a function (new way).
- They update by calling a setter on the service (setUser, clearUser)

🟩 Tooling safety-nets:
- ESLint rule suggestion: flag new BehaviorSubject() unless file path matches /providers|http, like:
`Zero-code solution` = @typescript-eslint/no-restricted-syntax
![Zero-code solution](https://eslint.org/docs/latest/rules/no-restricted-syntax)

- Husky pre-commit hook: `grep -R "new BehaviorSubject" src/ | exit 1` just to stop accidental additions

🟩 Performance / memory notes
- Signals are synchronous; avoid giant computations in computed() offload heavy work to WebWorkers or RxJS if needed
- Still mark components changeDetection: 'OnPush' – signals don’t change that advice

🟩 Run unit tests – you may need tick() instead of flushing observables



