import { z } from "zod";
export const LoginSchema = z.object({
    username: z.string({required_error: "Username is required"})
        .min(1, "Username is required")
        .min(3, "Username must be more than 3 characters")
        .max(32, "Username must be less than 32 characters"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const SignUpSchema = z.object({
    username: z.string({ required_error: "Username is required" })
        .min(1, "Username is required")
        .min(3, "Username must be more than 3 characters")
        .max(32, "Username must be less than 32 characters"),
    email: z.string({ required_error: "Email is required" })
        .email("Email is not valid")
        .min(1, "Email is required")
        .min(3, "Email must be more than 3 characters")
        .max(32, "Email must be less than 32 characters"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string({ required_error: "Confirm password is required" })
        .min(1, "Confirm password is required")
        .min(8, "Confirm password must be more than 8 characters")
        .max(32, "Confirm password must be less than 32 characters"),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);

export type SignUpSchemaType = z.infer<typeof SignUpSchema>


export const SubscriptionSchema = z.object({
    plan_id: z.number({ required_error: "Plan is required" })
        .min(1, "Plan is required")
        .min(3, "Plan must be more than 3 characters")
        .max(32, "Plan must be less than 32 characters"),
    start_date: z.string({ required_error: "Start date is required" })
        .min(1, "Start date is required")
        .min(3, "Start date must be more than 3 characters")
        .max(32, "Start date must be less than 32 characters"),
    end_date: z.string({ required_error: "End date is required" })
        .min(1, "End date is required")
        .min(3, "End date must be more than 3 characters")
        .max(32, "End date must be less than 32 characters"),
    status: z.string({ required_error: "Status is required" })
        .min(1, "Status is required")
        .min(3, "Status must be more than 3 characters")
        .max(32, "Status must be less than 32 characters"),
})

export type SubscriptionSchemaType = z.infer<typeof SubscriptionSchema>

export const BusinessSchema = z.object({
    name: z.string().min(1, "Required"),
    businessType: z.string().min(1, "Required"),
})

export type BusinessSchemaType = z.infer<typeof BusinessSchema>