type Attempt = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, Attempt>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || now >= existing.resetAt) {
    attempts.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      allowed: true,
      remaining: MAX_ATTEMPTS - 1,
    };
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - existing.count,
  };
}

export function clearLoginRateLimit(key: string) {
  attempts.delete(key);
}