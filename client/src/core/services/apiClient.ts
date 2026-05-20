const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export type ErrorType<TError> = TError & { statusCode: number; };

let refreshPromise: Promise<boolean> | null = null;

const tryRefresh = (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const throwError = async (response: Response): Promise<never> => {
  let errorData: { message: string; statusCode: number; };
  try {
    errorData = await response.json();
  } catch {
    errorData = {
      message: `HTTP ${response.status}: ${response.statusText}`,
      statusCode: response.status,
    };
  }
  throw Object.assign(new Error(errorData.message), {
    statusCode: errorData.statusCode ?? response.status,
  });
};

export const apiClient = async <T extends { data: unknown; status: number; headers: Headers; }>(url: string, options?: RequestInit, isRetry = false): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    },
  });

  if (!response.ok) {
    if (response.status === 401 && !isRetry) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        return apiClient(url, options, true);
      }
      document.cookie = 'is_authenticated=; Max-Age=0; path=/';
    }
    await throwError(response);
  }

  const data = response.status === 204 ? undefined : await response.json();

  return { data, status: response.status, headers: response.headers } as T;
};

