import { cn } from "@/lib/utils";
import "@/styles/loading.scss"
interface LoadingProps {
    className?: string
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
    return (
        <div className={cn("lds-roller", className)}><div ></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
};


export const CenterPageLoading: React.FC = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <Loading />
      </div>
    );
  };