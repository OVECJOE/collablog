import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Feedback } from "@/components";
import { Box, Button, Stack, Text } from "@mantine/core";
import { Logo } from "@/assets/images";

export default function AccountVerification() {
    const search = useSearchParams()[0];
    const [isVerified, setIsVerified] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: 'info' });

    const verifyAccount = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/auth/verify-account`, { token: search.get('token') });
            if (response.status === 200) {
                setFeedback({ message: 'Account verified successfully. Redirecting you to the login page...', type: 'success' });
                setTimeout(() => setIsVerified(true), 2000);
            } else {
                setFeedback({ message: response.data.message, type: 'error' });
            }
        } catch {
            setFeedback({ message: 'An error occurred while verifying your account. Please try again.', type: 'error' });
        }
    }

    return (
        <Box my="xl" className="space-y-5">
            <Logo size="xl" className="border-dashed border border-purple-400 mx-auto" />
            <Stack mt="xl" align="center" justify="center">
                <Text size="xl" ff="heading" fz="h1" className="text-center text-purple-900">Account Verification</Text>
                {feedback.type === 'success' ? <Feedback {...feedback} /> : (
                    <>
                        <Text size="sm" className="text-center font-light" fz="sm" ff="text">
                            Please bear with us while we verify your account. This process should only take a few seconds.
                            <br />
                            Click the button below to proceed.
                        </Text>
                        <Box mt="md">
                            <Button onClick={verifyAccount} variant="outline" color="purple" size="md">Verify Account</Button>
                        </Box>
                        {feedback.message && <Feedback {...feedback} />}
                    </>
                )}
            </Stack>
            {isVerified && <Navigate to="/auth/login" replace />}
        </Box>
    )
}