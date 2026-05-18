const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export type ErrorType<TError> = TError & { statusCode: number; };

export const apiClient = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    },
  });

  if (!response.ok) {
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
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
};

