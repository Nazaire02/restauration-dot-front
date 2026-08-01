export function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export const statusLabels = {
  en_attente: "En attente",
  en_cours: "En préparation",
  servie: "Servie",
} as const;

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return count > 1 ? plural : singular;
}