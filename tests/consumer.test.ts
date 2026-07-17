import { describe, expect, it, vi } from "vitest";
import { handleOnce } from "../src/consumer.js";
import { IdempotencyStore } from "../src/idempotencyStore.js";

describe("handleOnce", () => {
  it("applies the effect only on first delivery", async () => {
    const store = new IdempotencyStore();
    const effect = vi.fn(async () => undefined);
    const event = {
      eventId: "evt-1",
      type: "payout.requested" as const,
      payload: { bookingId: "b-9" },
    };

    const first = await handleOnce(event, store, effect);
    const second = await handleOnce(event, store, effect);

    expect(first.status).toBe("applied");
    expect(second.status).toBe("duplicate");
    expect(effect).toHaveBeenCalledTimes(1);
  });
});