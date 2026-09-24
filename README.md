# kafka-idempotent-handlers

Reference **idempotent consumer** pattern for booking / payout style events (at-least-once delivery, business result happens once).

Inspired by payment orchestration work where Kafka retries must not double-apply money movement.

## Ideas encoded here

1. **Processed event ID** recorded before side effects are considered final (in production: transactional outbox or `INSERT … ON CONFLICT`).
2. **Redelivery** returns `duplicate` without calling downstream effect again.
3. **Small surface** — swap `IdempotencyStore` for Postgres / Redis.

## Run tests

```bash
npm install
npm test
```

## Related

- Portfolio case study: *Booking & Payment Infrastructure*
- [Christopher Xu](https://github.com/chris-xu02) · [Portfolio](https://christopher-three.vercel.app)