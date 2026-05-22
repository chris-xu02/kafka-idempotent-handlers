/** In-memory processed-key store — swap for PostgreSQL / Redis in production. */
export class IdempotencyStore {
  private readonly applied = new Set<string>();

  has(eventId: string): boolean {
    return this.applied.has(eventId);
  }

  mark(eventId: string): void {
    this.applied.add(eventId);
  }
}