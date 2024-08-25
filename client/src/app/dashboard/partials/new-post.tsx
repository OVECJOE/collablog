import { Box, Button, Checkbox, Flex, MultiSelect, Text, Textarea, TextInput } from "@mantine/core";
import type { User } from "../types";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const schema = z.object({
    title: z.string().max(256, { message: 'Title is too long' }),
    content: z.string().max(10000, { message: 'Content is too long' }),
    collaborators: z.array(z.string()),
    is_published: z.boolean()
})

type NewPostFormValues = z.infer<typeof schema>

const useCollaborators = () => {
    const { user } = useOutletContext() as { user: User }
    const [collaborators, setCollaborators] = useState<{
        label: string
        value: string
    }[]>([])

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const getCollaborators = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users?page=1`, {
                        headers: { Authorization: token }
                    })

                    setCollaborators(
                        (data as User[]).filter(collaborator => collaborator.id !== user.id).map(collaborator => ({
                            label: collaborator.username,
                            value: collaborator.id
                        }))
                    )
                }
            } catch {
                setCollaborators([])
            }
        }

        getCollaborators()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return collaborators
}

export default function CreateNewPost() {
    const form = useForm<NewPostFormValues>({
        validate: zodResolver(schema),
        initialValues: { title: '', content: '', collaborators: [], is_published: false }
    })

    const [loading, setLoading] = useState(false)
    const toBeCollaborators = useCollaborators()

    const handleSubmit = (values: NewPostFormValues) => {
        setLoading(true)
        console.log(values)
        setLoading(false)
    }

    return (
        <Box className="space-y-5" my="lg">
            <Button size="sm" ff="text" fw={300} fz="xs" color="purple" variant="outline" component="a" href="/dashboard">
                <IconArrowLeft size={16} />
                <span className="pl-2">Back to posts</span>
            </Button>
            <Box>
                <Box>
                    <Text size="md" fw={700}>Create a new post</Text>
                    <Text size="sm" c="gray" ff="text" fw={200}>
                        <strong>Tip:</strong> You can use Markdown to format your post. {" "}
                        <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer noopener" className="text-purple-600 underline">
                            Learn more
                        </a>
                    </Text>
                </Box>
                <form className="space-y-3 my-3" onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        id="title"
                        label="Title"
                        placeholder="Enter a title for your post"
                        required
                        />
                    <Textarea
                        id="content"
                        label="Content"
                        placeholder="Write your post here..."
                        required
                        autosize
                        fw={300}
                        minRows={10}
                        autoCorrect="on"
                        autoComplete="on"
                    />
                    <Checkbox id="is_published" label="Publish post now" />
                    <MultiSelect
                        id="collaborators"
                        label="Collaborators"
                        placeholder="Select collaborators"
                        required
                        data={toBeCollaborators}
                        searchable
                        clearable
                        limit={20}
                        multiple
                        maxValues={5}
                    />
                    <Flex justify="flex-end">
                        <Button type="submit" color="purple" variant="filled">
                            {loading ? 'Creating...' : 'Create post'}
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    )
}