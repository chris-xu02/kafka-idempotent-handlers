import type { DomainEvent, HandlerResult } from "./types.js";
import { IdempotencyStore } from "./idempotencyStore.js";

export type Effect = (event: DomainEvent) => Promise<void>;

export async function handleOnce(
  event: DomainEvent,
  store: IdempotencyStore,
  effect: Effect,
): Promise<HandlerResult> {
  if (store.has(event.eventId)) {
    return { status: "duplicate", eventId: event.eventId };
  }

  await effect(event);
  store.mark(event.eventId);

  return { status: "applied", eventId: event.eventId };
}