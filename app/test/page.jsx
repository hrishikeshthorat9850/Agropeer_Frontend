"use client";
import { Button } from "@mui/material";
export default function Test(){
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const handleClick = async()=>{
        const res = await fetch("https://gwjpmypuqmmoqcjyufln.functions.supabase.co/fetch_market_prices", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ trigger: "manual" }),
        });
        console.log("Response is :",res.json());
    }
    return(
        <button 
            onClick={handleClick}
            className="bg-red-500 text-white inline-block mt-5"
        >Click
        </button>
    )
}