export interface EnvVariable {
    key: string;
    value: string;
} 

export interface EnvHistory {
    filePath: string;
    lastOpened: Date;
    description: string;
}