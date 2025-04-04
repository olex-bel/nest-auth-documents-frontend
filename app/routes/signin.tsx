import { redirect, useFetcher, Link } from "react-router";
import type { Route } from "./+types/signin";
import InputField from "~/components/common/InputField";
import ErrorMessage from "~/components/ErrorMessage";
import { UnauthorizedError } from "~/services/documents/errors";
import Authenticator from "~/services/authenticator";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login to Document Editor" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const authenticator = Authenticator.getInstance();
    const formData = await request.formData();
    const email = await formData.get("email") as string;
    const password = await formData.get("password") as string;

    try {
        await authenticator.authenticate(email, password);
        return redirect("/");
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return { errorMessage: error.message }
        } else {
            return {
                errorMessage: "An error occurred during login. Please try again."
            }
        }
    }
}

export default function SignIn() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state !== "idle";
    const errorMessage = fetcher.data?.errorMessage;

    return (
        <section className="p-6 bg-slate-100 rounded">
            <h1 className="text-xl font-semibold text-center mb-2">Welcome back!</h1>
            <section className="auth-form">
                <fetcher.Form method="post" className="space-y-8">
                    <InputField label="Email" type="email" name="email" required />
                    <InputField label="Password" type="password" name="password" required autoComplete="current-password" />

                    <div className="flex flex-col gap-4">
                        <button type="submit" className="bg-sky-500 rounded py-2 text-slate-50 hover:bg-sky-400" disabled={isSubmitting}>
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>
                    </div>

                    {
                        errorMessage && <div className="mt-0.5 text-center">
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        </div>
                    }
                </fetcher.Form>
                <section className="flex justify-center mt-4">
                    <Link to="/register" className="text-sky-500 hover:underline text-sm">Don't have an account? Sign Up</Link>
                </section>
            </section>
        </section>
    );
}
