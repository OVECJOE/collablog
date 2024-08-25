import { Logo } from "@/assets/images";
import { Box, Button, Card, Divider, List, ListItem, Stack, Text } from "@mantine/core";

export default function NotFound() {
    return (
        <Box className="h-screen" py="xl">
            <Logo size="xl" className="border-dashed border border-purple-400 mx-auto" />
            <Box mt="xl">
                <Text size="xl" ff="heading" className="text-center" fz="h1">
                    Something went wrong
                </Text>
                <Stack align="center" justify="center">
                    <Card shadow="md" padding="lg" mt="md" className="w-full max-w-96 border border-dashed bg-purple-100 border-purple-900">
                        <Text ff="heading" fz="h5">Suggestions</Text>
                        <List mt={10} ff="text" fz="xs" icon="-" className="space-y-2">
                            <ListItem className="text-xs font-light">Refresh the page</ListItem>
                            <ListItem className="text-xs font-light">Check your internet connection</ListItem>
                            <ListItem className="text-xs font-light">Try again later</ListItem>
                        </List>
                    </Card>
                    <Divider orientation="vertical" my={10} variant="dotted" />
                    <Button component="a" href="/" variant="filled" color="purple">Go Home</Button>
                </Stack>
            </Box>
        </Box>
    )
}