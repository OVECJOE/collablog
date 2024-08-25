import { Alert, Text } from "@mantine/core";
import { IconInfoCircle, IconPasswordUser, IconUserCancel } from "@tabler/icons-react";

type FeedbackProps = {
    message: string;
    type: 'success' | 'error' | string;
};

const getAlertColor = (type: 'success' | 'error' | string) => {
    switch (type) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        default:
            return 'purple';
    }
}

const getAlertIcon = (type: 'success' | 'error' | string) => {
    switch (type) {
        case 'success':
            return <IconPasswordUser />;
        case 'error':
            return <IconUserCancel />;
        default:
            return <IconInfoCircle />;
    }
}

export default function Feedback({ message, type }: FeedbackProps) {
    return (
        <Alert
            my="md"
            className="font-light"
            variant="light"
            title={<Text size="sm" className="font-light" ff="text">{message}</Text>}
            color={getAlertColor(type)}
            icon={getAlertIcon(type)}
        />
    )
}