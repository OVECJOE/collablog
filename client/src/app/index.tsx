import { Logo } from "@/assets/images";
import { Box, Button, Stack, Text } from "@mantine/core";

export { default as NotFound } from "./not-found";
export default function HomePage() {
    return (
        <Box w="100vw" h="100vh" py="lg" px="md">
            <Stack align="center" justify="center" className="h-full">
                <Logo size="xl" className="border-dashed border border-purple-400" />
                <Text fw={300} size="md" c="dark" mt="xs" className="text-center md:w-10/12">
                    Welcome to an innovative blogging platform designed to foster teamwork and collective creativity.
                    Unlike traditional blogging sites, <strong>CollabBlog</strong> requires a minimum of two authors
                    for every post, ensuring diverse perspectives and richer content.
                </Text>
                <Button component="a" href="/auth" variant="outline" color="purple" size="xl" radius="md" mt="xl">
                    Get started
                </Button>
            </Stack>
        </Box>
    )
}