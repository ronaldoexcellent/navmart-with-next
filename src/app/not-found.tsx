import Link from "next/link"

export default function NotFound() {
    return (
        <main className="text-center">
            <h2 className="text-3xl text-green-600 font-semibold"> Error 404 </h2>
            <p> Page Not Found. </p>
            <p> Go back to <Link href="/dashboard"> Dashboard </Link> </p>
        </main>
    )
}