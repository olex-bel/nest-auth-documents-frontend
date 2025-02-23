
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";

interface BaseItem {
    id: string | number;
    [key: string]: string | number;
}

type HeaderItem<T extends BaseItem> = {
    prop: keyof T;
    title: string;
};

type TablePaginationProps<T extends BaseItem> = {
    items: T[];
    headers: HeaderItem<T>[];
    coursor?: string;
};

export default function TablePagination<T extends BaseItem>({ items, headers, coursor }: TablePaginationProps<T>) {
    return (
        <div>
            <div className="w-4/5 mx-auto grid grid-cols-[auto_1fr] gap-2">
                {headers.map((header) => (
                    <Fragment key={header.title}>
                        <div>{header.title}</div>
                    </Fragment>
                ))}

                {
                    items.map((item) => (
                        <Fragment key={item.id}>
                            {headers.map((header) => (
                                <div>{item[header.prop]}</div>
                            ))}
                        </Fragment>
                    ))
                }
            </div>

            {
                coursor? 
                    <Link to={`/?cursor=${coursor}`}>Next page</Link>
                    : 
                    null
            }
        </div>
    )
}