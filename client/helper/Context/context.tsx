import { createContext } from "react";
import IAuthor from "../../types/IAuthor";
import IMember from "../../types/IMember";

type IContext = {
    authors: IAuthor[],
    setAuthors: (authors: IAuthor[]) => void,
    members: IMember[],
    setMembers: (members: IMember[]) => void;
};
const GlobalContext = createContext<IContext>({
    authors: [],
    setAuthors: () => { },
    members: [],
    setMembers: () => { }
});
export default GlobalContext;