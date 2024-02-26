"use client"
import * as React from "react"
import {
    AlertCircle,
    Archive,
    ArchiveX,
    Folder,
    Home,
    MessageSquarePlus,
    Bookmark,
    Settings,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
} from "lucide-react"

import {AccountSwitcher} from "@/components/account-switcher"
import {MailDisplay} from "@/components/mail-display"
import {MailList} from "@/components/mail-list"
import {Nav} from "@/components/nav"
import {Mail} from "@/app/data"
import {useMail} from "@/app/use-mail"
import {cn} from "@/lib/utils"
import {Separator} from "@/registry/new-york/ui/separator"
import {Input} from "@/registry/new-york/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/registry/new-york/ui/tabs"
import {TooltipProvider} from "@/registry/new-york/ui/tooltip"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/registry/new-york/ui/resizable"

interface MailProps {
    accounts: {
        label: string
        email: string
        icon: React.ReactNode
    }[]
    mails: Mail[]
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

export function Mail({
                         accounts,
                         mails,
                         defaultLayout = [265, 440, 655],
                         defaultCollapsed = false,
                         navCollapsedSize,
                     }: MailProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
    const [mail] = useMail()

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={(collapsed: boolean | ((prevState: boolean) => boolean)) => {
                        setIsCollapsed(collapsed)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            collapsed
                        )}`
                    }}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <Separator/>
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "All Posts",
                                label: "128",
                                icon: Home,
                                variant: "default",
                            },
                            {
                                title: "My Posts",
                                label: "9",
                                icon: Folder,
                                variant: "ghost",
                            },
                            {
                                title: "Create Post",
                                label: "",
                                icon: MessageSquarePlus,
                                variant: "ghost",
                            },
                            {
                                title: "Bookmarks",
                                label: "23",
                                icon: Bookmark,
                                variant: "ghost",
                            },
                            {
                                title: "Settings",
                                label: "",
                                icon: Settings,
                                variant: "ghost",
                            },
                            // {
                            //     title: "Archive",
                            //     label: "",
                            //     icon: Archive,
                            //     variant: "ghost",
                            // },
                        ]}
                    />
                    <Separator/>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                    <Tabs defaultValue="all">
                        <Tabs className="ml-auto" />
                        <Separator/>
                        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input placeholder="Search" className="pl-8"/>
                                </div>
                            </form>
                        </div>
                        <TabsContent value="all" className="m-0">
                            <MailList items={mails}/>
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <MailDisplay
                        mail={mails.find((item) => item.id === mail.selected) || null}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}
