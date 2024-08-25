import { useForm, zodResolver } from "@mantine/form"
import { z } from "zod"
import { Button, TextInput, Box, Text } from "@mantine/core"
import axios, { type AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Feedback } from "@/components";

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Password should be at least 8 characters' })
    .refine(value => !/\s/.test(value), { message: 'Password should not contain spaces' })
    .refine(value => /\d/.test(value), { message: 'Password should contain at least one number' })
    .refine(value => /[A-Z]/.test(value), { message: 'Password should contain at least one uppercase letter' })
    .refine(value => /[a-z]/.test(value), { message: 'Password should contain at least one lowercase letter' }),
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
    const [feedback, setFeedback] = useState({ message: '', type: 'info' });
    const navigate = useNavigate();
    
    const form = useForm<LoginFormValues>({ validate: zodResolver(schema), initialValues: { email: '', password: '' } });
    const handleSubmit = async (values: LoginFormValues) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values)

            if (response.status === 200) {
                setFeedback({ message: 'Login successful; redirecting you to your dashboard...', type: 'success' })
                // set token recieved in response to local storage
                localStorage.setItem('token', response.data.token)
                setTimeout(() => navigate('/dashboard', { replace: true }), 2000)
            } else {
                setFeedback({ message: response?.data.message, type: 'error' })
            }
        } catch (e) {
            const { response } = e as AxiosError
            let message: string;

            if (response) {
                const { data } = response as { data?: { error?: string, email?: string, password?: string } }
                message = data?.error || data?.email || data?.password || 'An error occurred while logging you in. Please try again.'
            } else {
                message = 'Could not connect to the server. Please check your internet connection and try again.'
            }

            setFeedback({ message, type: 'error' })
        }
    }

    return (
        <Box my="xl">
            <Box mb="md">
                <Text size="xl" ff="heading">Welcome back!</Text>
                <Text size="sm" className="font-extralight" c="purple">Login to your account to continue</Text>
            </Box>
            {feedback.message && <Feedback {...feedback} />}
            <form onSubmit={form.onSubmit(handleSubmit)} className="border border-purple-100 rounded-md p-4">
                <TextInput
                    label="Enter your email"
                    placeholder="your@email.com"
                    type="email"
                    withAsterisk
                    required
                    {...form.getInputProps('email')}
                />
                <TextInput
                    label="Enter your password"
                    placeholder="********"
                    type="password"
                    withAsterisk
                    required
                    {...form.getInputProps('password')}
                    mt="md"
                />
                <Button type="submit" variant="filled" color="purple" size="lg" fullWidth mt="lg">
                    Login
                </Button>
            </form>
        </Box>
    )
}