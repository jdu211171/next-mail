import addDays from "date-fns/addDays"
import addHours from "date-fns/addHours"
import format from "date-fns/format"
import nextSaturday from "date-fns/nextSaturday"
import {
    Archive,
    ArchiveX, Bookmark,
    Clock,
    Forward, Heart,
    MoreVertical,
    Reply,
    ReplyAll,
    Trash2,
} from "lucide-react"

import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/registry/default/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/registry/new-york/ui/avatar"
import {Button} from "@/registry/new-york/ui/button"
import {Calendar} from "@/registry/new-york/ui/calendar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import {Label} from "@/registry/new-york/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import {Separator} from "@/registry/new-york/ui/separator"
import {Switch} from "@/registry/new-york/ui/switch"
import {Textarea} from "@/registry/new-york/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"
import {Mail} from "@/app/data"
import {Pencil2Icon} from "@radix-ui/react-icons";

interface MailDisplayProps {
    mail: Mail | null
}

export function MailDisplay({mail}: MailDisplayProps) {
    const today = new Date()

    return (

        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!mail}>
                                <Pencil2Icon className="h-4 w-4"/>
                                <span className="sr-only">Edit Post</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit this Post</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!mail}>
                                <Trash2 className="h-4 w-4"/>
                                <span className="sr-only">Move to trash</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to trash</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!mail}>
                                <Bookmark className="h-4 w-4"/>
                                <span className="sr-only">Save in the bookmarks</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Save in the bookmarks</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!mail}>
                                <Heart className="h-4 w-4"/>
                                <span className="sr-only">Like this post</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Save in the bookmarks</TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <Separator/>
            {mail ? (
                <div className="flex flex-1 flex-col">
                    <div className="flex items-start p-4">
                        <div className="flex items-start gap-4 text-sm">
                            <div className="font-semibold">{mail.name}</div>
                        </div>
                        {mail.date && (
                            <div className="ml-auto text-xs text-muted-foreground">
                                {format(new Date(mail.date), "PPpp")}
                            </div>
                        )}
                    </div>
                    <div className="flex whitespace-pre-wrap p-4 text-sm">
                        {mail.text}
                    </div>
                    <Separator className="mt-auto"/>
                    <div className="p-4 mt-auto">
                        <form>
                            <div className="grid gap-4">
                                <Textarea
                                    className="p-4"
                                    placeholder={`Comment to this post...`}
                                />
                                <div className="flex items-center">
                                    <Button
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                        className="ml-auto"
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    No message selected
                </div>
            )}
        </div>
    )
}
