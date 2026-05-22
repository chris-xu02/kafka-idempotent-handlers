export type DomainEvent = {
  eventId: string;
  type: "booking.confirmed" | "payout.requested";
  payload: Record<string, unknown>;
};

export type HandlerResult = {
  status: "applied" | "duplicate";
  eventId: string;
};