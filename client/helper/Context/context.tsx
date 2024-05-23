import { createContext } from "react";
import IAuthor from "../../types/IAuthor";
import IMember from "../../types/IMember";

type IContext = {
    authors: IAuthor[],
    setAuthors: (authors: IAuthor[]) => void,
    members: IMember[],
    setMembers: (members: IMember[]) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};
const GlobalContext = createContext<IContext>({
    authors: [],
    setAuthors: () => { },
    members: [],
    setMembers: () => { },
    setIsLoggedIn: () => { }
});
export default GlobalContext;