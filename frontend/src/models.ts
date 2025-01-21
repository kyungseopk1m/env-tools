export enum TextType {
    COMMENT = 0,
    ENV = 1
}

export interface EnvVariable {
    type: TextType;
    key?: string;
    value: string;
}

export interface EnvHistory {
    filePath: string;
    lastOpened: Date;
    description: string;
}