import Link from "next/link"

export default function NotFound() {
    return (
        <main className="text-center w-screen bg-red-700 grid items-center h-screen">
            <h2 className="text-3xl text-green-600 font-semibold"> Error 404 </h2>
            <p className="font-semibold"> Page Not Found. </p>
            <p className="italic"> Go back to <Link className="text-bold" href="/dashboard"> Dashboard </Link> </p>
        </main>
    )
}