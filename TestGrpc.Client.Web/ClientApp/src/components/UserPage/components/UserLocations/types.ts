export interface UserLocationProps {
    name: string;
    index: number;
    deleteFn: (index: number) => void;
}

export interface UserLocationsProps {
    maxLocations: number;
}
