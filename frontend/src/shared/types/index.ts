import type {SVGProps} from "react";

export type ISODateTimeString = string;

export interface BaseSelectOption {
    value: number;
    label: string;
}

export interface BaseIconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}