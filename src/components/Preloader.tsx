"use client";
import { RingLoader } from "react-spinners";

export default function Preloader() {
    return (
        <div className="flex items-center  justify-center h-screen">
            <RingLoader loading={true} speedMultiplier={3} size={100} color="#2563EB" />
        </div>
    );
}
