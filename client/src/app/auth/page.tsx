import { Logo } from "@/assets/images";
import { Box, Stack, Tabs } from "@mantine/core";
import { useState } from "react";
import { NavLink, useNavigate, useOutlet, Navigate } from "react-router-dom";

export default function Page() {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const [authType, setAuthType] = useState<"login" | "register">(
        location.pathname.endsWith("register") ? "register" : "login"
    );

    const handleTabChange = (value: string | null) => {
        if (value === null) return;

        setAuthType(value as "login" | "register");
        navigate(`/auth/${value}`);
    };

    return (
        <Box h='100vh' px='md' py="xl">
            <Logo size="xl" className="border-dashed border border-purple-400 mx-auto" />
            <Stack maw='700px' mx='auto' mt="xl">
                <Tabs color="purple" defaultValue={authType} onChange={handleTabChange}>
                    <Tabs.List>
                        <Tabs.Tab value="login">
                            <NavLink to="/auth/login">Login</NavLink>
                        </Tabs.Tab>
                        <Tabs.Tab value="register">
                            <NavLink to="/auth/register">Register</NavLink>
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value={authType}>
                        {outlet || <Navigate to="/auth/login" replace />}
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Box>
    );
}