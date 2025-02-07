import { ArrowLeft, User } from "lucide-react";
import { ReactNode } from "react";


interface HeaderProps {
    texto: string,
    icon?: ReactNode,
    user?: string
}

export function Header({ texto, icon, user }: HeaderProps) {
    return (
        <header className="">
            <div className="flex justify-between">
                <div className="flex flex-1 items-center gap-60">
                    {icon &&
                        <button>
                            <ArrowLeft size={48} strokeWidth={1.5} />
                        </button>
                    }
                    <h1 className="font-bold text-3xl">{texto}</h1>
                </div>
                <div className="flex ">
                    <User />
                    <h1>{user}</h1>
                </div>
            </div>
        </header>
    )
}