import Link from "next/link";



export default function AuthPageLayout(
    { children } : { children: React.ReactNode }
){
    return(
        <html lang="en">
            <body>
                { children }
                <div className="text-center text-md my-10">
                    <Link href={"https://www.linkedin.com/in/romuald-oluwatobi"}
                    target="_blank">
                        Tokena 2024 by <span className="underline"> Oluwatobi</span>
                    </Link>
                </div>
            </body>
        </html>
    )
}