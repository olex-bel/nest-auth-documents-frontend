import { useState, useRef } from "react";
import { Form, useSearchParams } from "react-router";
import { IoClose, IoSearch } from "react-icons/io5";
import Button from "./Button";
import Input from "./Input";

export default function SearchForm() {
    let [searchParams] = useSearchParams();
    const [emptyQuery, setEmptyQuery] = useState(searchParams.get("query") === "");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmptyQuery(e.target.value === "");
    };
    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
            setEmptyQuery(true);
        }
    }

    return (
        <Form className="flex gap-2">
            <div className="relative">
                <Input 
                    ref={inputRef} 
                    type="text" 
                    aria-label="Search" 
                    placeholder="Search..." 
                    name="query" 
                    className="pr-12" 
                    onChange={handleChange}
                    defaultValue={searchParams.get("query") || ""}
                />
                <Button 
                    aria-label="Clear search"
                    className={`absolute right-1 top-1/2 p-2 -translate-y-1/2 ${emptyQuery ? "hidden" : ""}`}
                    onClick={handleClear}
                >
                    <IoClose />
                </Button>
            </div>
            <Button type="submit" aria-label="Search">
                <IoSearch />
            </Button>
        </Form>
    );
}