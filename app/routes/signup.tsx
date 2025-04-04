
import { useFetcher, Link, redirect } from "react-router";
import InputField from "~/components/common/InputField";
import ErrorMessage from "~/components/ErrorMessage";
import { register } from "~/services/documents/auth";
import { UserAlreadyExistsError } from "~/services/documents/errors";
import type { Route } from "./+types/signup";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Create a new account." },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const email = await formData.get("email") as string;
    const password = await formData.get("password") as string;

    try {
        await register(email, password);
        return redirect("/");
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return { errorMessage: error.message };
        } 

        return {
            errorMessage: "An error occurred during registration. Please try again."
        }
    }
}

export default function SignUp() {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state !== "idle";
    const errorMessage = fetcher.data?.errorMessage;
    
    return (
        <section className="p-6 bg-slate-100 rounded">
            <h1 className="text-xl font-semibold text-center mb-2">Create a new account</h1>
            <section className="auth-form">
                <fetcher.Form method="post" className="space-y-8" autoComplete="off">
                    <InputField label="Email" type="email" name="email" required />
                    <InputField label="Password" type="password" name="password" autoComplete="new-password" required />
                    {
                        errorMessage && <div className="mt-0.5 text-center">
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        </div>
                    }
                    <div className="flex flex-col gap-4">
                        <button type="submit" className="bg-sky-500 rounded py-2 text-slate-50 hover:bg-sky-400" disabled={isSubmitting}>
                            {isSubmitting? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </fetcher.Form>
            </section>
            <section className="flex justify-center mt-4">
                <Link to="/login" className="text-sky-500 hover:underline text-sm">Already have an account? Sign In</Link>
            </section>
        </section>
    );
}