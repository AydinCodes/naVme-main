import { cn } from "@/lib/utils";
import "@/styles/loading.scss"
interface LoadingProps {
    className?: string
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
    return (
        <div className={cn("lds-roller", className)}><div ></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
};

export default Loading;