import { StateType } from "./context";
declare const actions: {
    state: {
        set(state: StateType): void;
    };
    project: {
        load: () => void;
        init: (name: string) => void;
    };
    compiler: {
        init: () => void;
    };
    server: {
        init: () => void;
    };
};
export default actions;
