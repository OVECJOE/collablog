import { Box, Button, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form"
import { z } from "zod"
import axios, { type AxiosError } from "axios";
import { useState } from "react";
import { Feedback } from "@/components";

const schema = z.object({
    photo: z.string().optional(),
    username: z.string()
        .min(4, { message: 'Username should be at least 4 characters' })
        .max(16, { message: 'Username should not exceed 16 characters' })
        .refine(
            value => /^[a-zA-Z0-9_-]+$/.test(value),
            { message: 'Username should only contain letters, numbers, and underscores/hyphens' }
        ),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string()
        .min(8, { message: 'Password should be at least 8 characters' })
        .refine(value => !/\s/.test(value), { message: 'Password should not contain spaces' })
        .refine(value => /\d/.test(value), { message: 'Password should contain at least one number' })
        .refine(value => /[A-Z]/.test(value), { message: 'Password should contain at least one uppercase letter' })
        .refine(value => /[a-z]/.test(value), { message: 'Password should contain at least one lowercase letter' }),
    confirmPassword: z.string()
}).refine(
    data => data.password === data.confirmPassword,
    { message: 'Passwords do not match', path: ['confirmPassword'] }
);

type RegisterFormValues = z.infer<typeof schema>;

export default function RegisterForm() {
    const [feedback, setFeedback] = useState({ message: '', type: 'info' });
    const form = useForm<RegisterFormValues>({
        validate: zodResolver(schema), 
        initialValues: { photo: '', username: '', email: '', password: '', confirmPassword: '' }
    });
    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values)
            if (response.status === 201) {
                setFeedback({ message: response.data.message, type: 'success' })
            } else {
                setFeedback({ message: response.data.message, type: 'error' })
            }
        } catch (e) {
            const { code, response } = e as AxiosError
            const { data } = response as { data: { error?: string, photo?: string, username?: string, email?: string, password?: string } }
            setFeedback({ message: `${code}: ${Object.values(data).join('\n')}`, type: 'error' })
        }
    }

    return (
        <Box my="xl">
            <Box mb="md">
                <Text size="xl" ff="heading">Create an account</Text>
                <Text size="sm" className="font-extralight" c="purple">
                    Sign up for a new account to begin your journey
                </Text>
            </Box>
            {feedback.message && <Feedback {...feedback} />}
            <form className="border border-purple-100 rounded-md p-4" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="What should we call you?"
                    placeholder="Avoid using your real name for privacy"
                    type="text"
                    withAsterisk
                    required
                    {...form.getInputProps('username')}
                />
                <TextInput
                    label="Enter your email"
                    placeholder="lovetoseeyou@provider.suffix"
                    type="email"
                    withAsterisk
                    required
                    mt="md"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    label="Enter your password"
                    placeholder="********"
                    type="password"
                    withAsterisk
                    required
                    mt="md"
                    {...form.getInputProps('password')}
                />
                <TextInput
                    label="Confirm your password"
                    placeholder="Must match the password above"
                    type="password"
                    withAsterisk
                    required
                    mt="md"
                    {...form.getInputProps('confirmPassword')}
                />
                <TextInput
                    label="Enter link to photo"
                    placeholder="Provide a link to your to-be profile picture"
                    type="url"
                    mt="md"
                />
                <Button type="submit" variant="filled" color="purple" size="lg" fullWidth mt="lg">
                    Register
                </Button>
            </form>
        </Box>
    )
}