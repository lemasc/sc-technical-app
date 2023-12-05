import { getCsrfToken } from "@/utils/auth/csrfToken";
import type { OAuthConfig } from "@auth/core/providers";

export async function SignInButton({
  provider,
  callbackUrl = "/photo",
}: {
  provider: OAuthConfig<any>;
  callbackUrl?: string;
}) {
  const { csrfToken } = await getCsrfToken();
  return (
    <form method="post" action={`/api/auth/signin/${provider.id}`}>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <button
        type="submit"
        title={`Sign in with ${provider.name}`}
        className="bg-red-600 font-medium transition-colors hover:bg-red-700 text-white rounded w-full px-6 py-3"
      >
        Sign in with {provider.name}
      </button>
    </form>
  );
}
