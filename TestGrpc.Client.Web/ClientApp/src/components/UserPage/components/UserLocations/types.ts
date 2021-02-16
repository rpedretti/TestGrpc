export interface UserLocationProps {
    /** 
     * Field Name 
     */
    name: string;

    /** 
     * Field index
     */
    index: number;

    /**
     *  Delete function
     */
    deleteFn: (index: number) => void;
}
