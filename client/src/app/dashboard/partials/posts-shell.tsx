import { Box, Table, Checkbox, Flex, rem, Select, Text, Badge, LoadingOverlay, Button, Group, Card } from "@mantine/core";
import type { Post, User } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";

type Filters = {
    ownership: string | null
    page: number
    limit: number
    search?: string
}

const usePosts = (filters: Filters) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPosts = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/posts?coauthored=1`, {
                        headers: { Authorization: token },
                        params: { ...filters, ownership: filters.ownership?.toLowerCase() }
                    })

                    setPosts(data)
                    setLoading(false)
                }
            } catch {
                setLoading(false)
            }
        }

        getPosts()
    }, [filters])

    return { posts, loading }
}

export default function PostsShell({ user }: { user?: User }) {
    const [filters, setFilters] = useState<Filters>({
        ownership: null,
        page: 1,
        limit: 20
    })

    const { posts, loading } = usePosts(filters)

    return (
        <Box className="space-y-10">
            <Box my="xl">
                <Flex justify="space-between" align="center">
                    <Flex>
                        <Text size="md" fw={700}>
                            My {filters.ownership === 'Collaborator' ? 'Collaborations' : 'Posts'}
                        </Text>
                        <Badge color="purple" variant="filled" ml={5} pos="relative" top={-2}>
                            {posts.length}
                        </Badge>
                    </Flex>
                    <Select
                        placeholder="Ownership"
                        data={['Creator', 'Collaborator']}
                        value={filters.ownership}
                        style={{ width: rem(150) }}
                        onChange={(value) => setFilters({ ...filters, ownership: value })}
                    />
                </Flex>
            </Box>
            {posts.length === 0 ? (
                loading ? <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'md', blur: 2 }} /> :
                (
                    <Box my="md">
                        <Text variant="text" ff="text" c="gray" className="text-center">
                            <strong>Zero</strong> posts found. If there is a filter applied, try removing it.
                            Otherwise...
                        </Text>
                        <Group my="md" justify="center">
                            <Button variant="filled" color="purple" size="sm" component="a" href="/dashboard/new">
                                Create a new post
                            </Button>
                        </Group>
                    </Box>
                )
            ) : (
                <Table.ScrollContainer minWidth="100%" maw={700}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th />
                                {Object.keys(posts[0]).map((key) => (
                                    <Table.Th key={key}>{key}</Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {posts.map((post) => (
                                <Table.Tr key={post.id}>
                                    <Table.Td>
                                        <Checkbox />
                                    </Table.Td>
                                    {Object.values(post).filter(value => typeof value === 'string').map((value) => (
                                        <Table.Td key={value}>
                                            {value}
                                        </Table.Td>
                                    ))}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            )}
            {/* Add a bright colored section to notify any user on this page to hire me */}
            <Card mb="lg" shadow="xs" py="xl" radius="md" style={{ background: 'linear-gradient(90deg, #FF0080 0%, #7928CA 100%)' }}>
                <Text className="text-center" size="lg" fw={700} style={{ color: 'white' }}>
                    Hi {user?.username}, I'm available for hire!
                    <br />
                    Let's build something amazing together.
                </Text>
                <Group mt="xl" justify="center">
                    <Button variant="filled" color="purple" size="lg" component="a" href="https://linkedin.com/in/victorohachor">
                        Contact me
                    </Button>
                </Group>
            </Card>
        </Box>
    )
}