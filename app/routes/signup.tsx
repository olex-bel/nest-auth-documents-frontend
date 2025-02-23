
import { Form } from "react-router";
import InputField from "~/components/common/InputField";

export default function SignUp() {
    const errors = {};
    let actionData = null;
    let transition = {};
    
    return (
        <section className="flex-center size-full max-sm:px-6">
            <section className="auth-form">
                {/* <Form method="post" className="space-y-8">
                    <div className="flex gap-4">
                        <InputField label="First Name" name="firstName" required error={errors.firstName} />
                        <InputField label="Last Name" name="lastName" required error={errors.lastName} />
                    </div>
                    <InputField label="Address" name="address1" required error={errors.address1} />
                    <InputField label="City" name="city" required error={errors.city} />
                    <div className="flex gap-4">
                        <InputField label="State" name="state" required error={errors.state} />
                        <InputField label="Postal Code" name="postalCode" required error={errors.postalCode} />
                    </div>
                    <div className="flex gap-4 justify-between">
                        <InputField label="Date of Birth" type="date" name="dateOfBirth" required error={errors.dateOfBirth} />
                        <InputField label="SSN" name="ssn" required error={errors.ssn} />
                    </div>
                    <InputField label="Email" type="email" name="email" required error={errors.email} />
                    <InputField label="Password" type="password" name="password" required error={errors.password} />
                    {
                        actionData && "errorMessage" in actionData ?
                            (<em className="text-red-600">{actionData["errorMessage"]}</em>)
                            :
                            null
                    }
                    <div className="flex flex-col gap-4">
                        <button type="submit" className="form-btn" disabled={transition.state == "submitting"}>Sign Up</button>
                    </div>
                </Form> */}
            </section>
        </section>
    );
}