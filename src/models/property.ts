import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase {
    City!: string;
    RTM!: number | null;
    Id!: number;
    SellRent!: string | null;
    Name!: string;
    PType!: string;
    BHK!: number | null;
    FType!: string;
    Price!: number | null;
    BuiltArea!: number | null;
    CarpetArea!: number;
    Address!: string;
    Landmark!:string;
    FloorNo!: string;
    TotalFloor!: string;
    AOP!: string;
    Mainentrance!: string;
    Security!: string;
    GatedCommunity!: number;
    Maintenance!: string;
    Description!: string;
    PostedOn!: string;
    PostedBy!: number;
}
