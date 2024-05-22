import { createContext } from "react";
import IAuthor from "../../types/IAuthor";

type IContext = {
    authors: IAuthor[],
    setAuthors: (authors: IAuthor[]) => void,
};
const GlobalContext = createContext<IContext>({
    authors: [],
    setAuthors: () => { }
});
export default GlobalContext;