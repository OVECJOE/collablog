import clsx from "clsx"

type LogoProps = {
    darkMode?: boolean
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
}

export default function Logo({ className, darkMode = false, size = 'md' }: LogoProps) {
    return (
        <img
            src="/logo.png"
            alt="Collablog Logo"
            className={clsx("h-12", {
                "filter invert": darkMode,
                "w-8 h-8": size === "sm",
                "w-12 h-12": size === "md",
                "w-16 h-16": size === "lg",
                "w-24 h-24": size === "xl"
            }, className)}
        />
    )
}