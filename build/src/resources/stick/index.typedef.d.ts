export interface IEvent {
    type: string;
    callback: () => void;
    condition?: () => boolean;
    f?: () => boolean;
    active?: boolean;
}
export interface IStick {
    x: number;
    y: number;
    pending: boolean;
    onPending: null | (() => void);
    lock: boolean;
}
